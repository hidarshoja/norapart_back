import db from "../models/index.js";
import {addNewBlog} from "../services/blog.service.js";
import saveImageCategory from "../libs/category.upload.js";
import {generateSlug} from "../libs/slug.js";
import fs from "fs";

export const index = async(req, res) => {
    const {page=1 , limit=10, bests=false} = req.query;
    try{
        if(bests) {
            const blogs = await db.Blog.findAll({
                order:  [['views','desc']],
                limit:3
            })
            return res.status(200).json(blogs)
        }

        const blogs = await addNewBlog(db,page,limit)

        return res.status(200).json(blogs)
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const show = async (req, res) => {
    try{
        const blog= await db.Blog.findByPk(req.params.blog_id,{
            include: [
                {
                    model: db.BlogComment,
                    as: 'comments',
                    attributes: [
                        'username',
                        'body',
                        'status',
                        'updatedAt',
                    ],
                    include: [
                        {
                            model: db.BlogReplyComment,
                            as: 'replies',
                            attributes: [
                                'body',
                                'updatedAt',
                            ],
                        },
                    ],
                },
            ],
        });
        return res.status(200).json(blog)
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const create = async(req, res) => {
    const {name,body,image_url,category} = req.body
    let slug = await generateSlug(name);
    try {
        const image_link = await saveImageCategory(image_url, name, 'blogs');
        const blog = await db.Blog.create({
            name,
            image_url:image_link,
            category,
            body,
            slug
        })
        return res.status(201).json({message: 'سوال با موفقیت ایجاد شد',blog})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }

}

export const update = async(req, res) => {
    try{
        const {blog_id} = req.params;
        const blog = await db.Blog.findOne({
            where:{
                id: blog_id,
            }
        })

        if (!blog) {
            return res.status(404).json({message: 'بلاگ مورد نظر یافت نشد'})
        }

        if (!req.body.image_url){
            const {image_url, ...other} = req.body
            await blog.update(other)
            return  res.status(200).json({message: 'ویرایش با موفقیت انجام شد'})
        }

        const imagePath = `${process.cwd()}/storage${blog?.image_url}`
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', imagePath, err);
                } else {
                    console.log('Deleted file:', imagePath);
                }
            });
        } else {
            console.log('File not found:', imagePath);
        }

        const image_url = await saveImageCategory(req.body.image_url, req.body.name,'blogs');

        await blog.update({...req.body,image_url})

        return res.status(200).json({message: 'بلاگ با موفقیت ویرایش شد',blog})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const destroy = async(req, res) => {
    try{
        const {blog_id} = req.params;
        const blog = await db.Blog.findOne({
            where:{
                id: blog_id,
            }
        })

        if (!blog) {
            return res.status(404).json({message: 'بلاگ مورد نظر یافت نشد'})
        }

        const imagePath = `${process.cwd()}/storage${blog?.image_url}`
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', imagePath, err);
                } else {
                    console.log('Deleted file:', imagePath);
                }
            });
        } else {
            console.log('File not found:', imagePath);
        }

        await blog.destroy()

        return res.status(200).json({message: 'بلاگ با موفقیت حذف شد',blog})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const createViews = async(req, res) => {
    const {blog_id} = req.params;
    try {
        const blog = await db.Blog.findByPk(blog_id)

        if (!blog) {
            return res.status(404).json({message: 'بلاگ مورد نظر یافت نشد'})
        }
        await blog.update({
            views: Number(blog.views) + 1
        })
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}