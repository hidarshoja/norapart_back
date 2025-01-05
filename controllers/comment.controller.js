import db from "../models/index.js";
import {addNewBlog} from "../services/blog.service.js";
import {generateSlug} from "../libs/slug.js";
import saveImageCategory from "../libs/category.upload.js";

export const index = async(req, res) => {
    const {page=1 , limit=10} = req.query;
    const offset = (page - 1) * limit;
    try{
            const blogs = await db.BlogComment.findAll({
                order:  [['views','desc']],
                limit: parseInt(limit),
                offset: parseInt(offset),
            })

        return res.status(200).json(blogs)
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const create = async(req, res) => {
    const {user_name,body,blog_id} = req.body
    try {
        const blog = await db.BlogComment.create({
            user_name,
            body,
            blog_id
        })
        return res.status(201).json({message: 'کامنت با موفقیت ایجاد شد',blog})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }

}

export const update = async(req, res) => {
    try{
        const {comment_id} = req.params;
        const comment = await db.BlogComment.findOne({
            where:{
                id: comment_id,
            }
        })

        if (!comment) {
            return res.status(404).json({message: 'بلاگ مورد نظر یافت نشد'})
        }

        await comment.update({
            status:req.body.status,
        })

        return res.status(200).json({message: 'کامنت با موفقیت منتشر شد',comment})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const destroy = async(req, res) => {
    try{
        const {comment_id} = req.params;
        const comment = await db.BlogComment.findOne({
            where:{
                id: comment_id,
            }
        })

        if (!comment) {
            return res.status(404).json({message: 'کامنت مورد نظر یافت نشد'})
        }

        await comment.destroy()

        return res.status(200).json({message: 'کامنت با موفقیت حذف شد',comment})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const reply = async(req, res) => {
    try{
        const {comment_id} = req.params;
        const comment = await db.BlogComment.findOne({
            where:{
                id: comment_id,
            }
        })

        if (!comment) {
            return res.status(404).json({message: 'کامنت مورد نظر یافت نشد'})
        }

        await db.BlogReplyComment.create({...req.body,comment_id})

        return res.status(200).json({message: 'جواب کامنت با موفقیت ثبت شد',comment})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}