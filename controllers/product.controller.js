import db from '../models/index.js'
import { generateSlug } from '../libs/slug.js';
import saveImages from '../libs/product.upload.js';
import fs from 'fs'
import { Sequelize, Op } from "sequelize";


export const index = async (req, res) => {
    try {
        const { page = 1, limit = 10, all = false } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const queryOptions = {
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: db.Category,
                    as: 'categories',
                    attributes: ['id', 'name']
                },
                {
                    model: db.ProductImage,
                    as: 'images',
                    attributes: ['id', 'image_url']
                },
                {
                    model: db.ProductComment,
                    as: 'comments',
                    attributes: ['id', 'body', 'rate', 'createdAt'],
                    where: { status: 'published' },
                    required: false, // Allow products with no published comments
                    include: [
                        {
                            model: db.User,
                            as: 'user',
                            attributes: ['id', 'first_name', 'last_name']
                        }
                    ]
                }
            ],
        };


        if (!all) {
            queryOptions.limit = limitNumber;
            queryOptions.offset = (pageNumber - 1) * limitNumber;
        }

        const products = await db.Product.findAndCountAll(queryOptions);

        return res.json({
            products: products.rows,
            totalCount: products.count,
            totalPages: all ? 1 : Math.ceil(products.count / limitNumber),
            currentPage: all ? 1 : pageNumber,
            limit: all ? products.count : limitNumber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};


export const create = async (req, res) => {
    try {
        
        let slug = await generateSlug(req.body.name);
        const products = await db.Product.create({ ...req.body, slug });

        await new Promise(resolve => setTimeout(resolve, 2000));
        const images = await saveImages(req.body.images, ' products');
        

        for (const image of images) {
            await db.ProductImage.create({
            product_id: products?.id,
            image_url: image,
        });
        }

        res.status(201).json({ message: "محصول با موفقیت ایجاد شد",products })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// ! show product by slug
export const show = async (req, res) => {
    try {
        const product = await db.Product.findOne({
            where: { slug: req.params.slug }, 
            include: [
                {
                  model: db.Category,
                  as: 'categories', 
                  attributes: ['id', 'name']
                },
                {
                  model: db.ProductImage,
                  as: 'images', 
                  attributes: ['id', 'image_url'], 
                },
                {
                    model: db.ProductComment,
                    as: 'comments',
                    attributes: ['body','rate','status','createdAt'],
                    include:[{
                        model:db.User,
                        as:'user',
                        attributes: ['first_name','last_name']
                    }]
                },
              ],
        });

        const data = await db.ProductComment.findAll({
            where: { product_id:product.id }, // Filter by product_id
            attributes: [
                [Sequelize.fn("AVG", Sequelize.col("rate")), "average"], // Calculate average rating
                [Sequelize.fn("COUNT", Sequelize.col("id")), "totalCount"], // Total count of reviews
                [Sequelize.col("rate"), "rating"], // Group by rate
                [Sequelize.fn("COUNT", Sequelize.col("rate")), "count"], // Count for each rating
            ],
            group: ["rate"], // Group results by `rate`
            raw: true, // Return raw data
        });

        // Prepare response
        const totalCount = data.reduce((acc, cur) => acc + Number(cur.count), 0);

        // Calculate average
        const average = data.reduce(
            (acc, cur) => acc + Number(cur.rating) * Number(cur.count),
            0
        ) / totalCount;

        // Initialize counts for all ratings (1 to 5)
        const counts = [1, 2, 3, 4, 5].map((rating) => ({
            rating,
            count: data.find((d) => Number(d.rating) === rating)?.count || 0,
        }));

        // Prepare final review object
        const reviews = {
            average: parseFloat(average.toFixed(1)), // Rounded average rating to 1 decimal
            totalCount: parseInt(totalCount), // Total count of reviews
            counts,
        };

        
        return res.status(200).json({reviews,product});
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// delete a product
export const destroy = async(req,res)=>{
    try{
        const {slug} = req.params
        const product = await db.Product.findOne({
            where: {slug},
        })

        if (!product){
            return res.status(404).json({message: 'محصولی یافت نشد'});
        }
        const images = await db.ProductImage.findAll({where : {product_id:product.id}})

        // Delete each image file
        for (const image of images) {
            const imagePath = `${process.cwd()}/storage${image?.image_url}`// Adjust this path if necessary
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
        }
        await db.ProductImage.destroy({ where: { product_id: product.id } });

        await db.Product.destroy({ where: { id: product.id } });

        return res.status(200).json({ message: 'محصول و تصاویر مربوطه با موفقیت حذف شدند' });

    }catch (e) {
        console.log(e)
    }
}

// edit a product
export const update = async(req,res)=>{
    const {slug} = req.params
    const product = await db.Product.findOne({
        where: {slug},
    })

    if (!product){
        return res.status(404).json({message: 'محصولی یافت نشد'});
    }

    if (req.body.images.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const images = await saveImages(req.body.images, ' products');


        for (const image of images) {
            await db.ProductImage.create({
                product_id: product?.id,
                image_url: image,
            });
        }
    }


    product.update(req.body)

    return res.status(200).json({message: 'محصول با موفقیت ویرایش  شد'})

}

//! delete a image
export const destroyImage = async(req,res)=>{
    const {id} = req.params
    try{
        const image = await db.ProductImage.findOne({
            where:{
                id
            }
        })

        if (!image) {
            return res.status(404).json({message: 'عکسی یافت نشد'})
        }
        const imagePath = `${process.cwd()}/storage${image?.image_url}`// Adjust this path if necessary
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
        image.destroy()
        return res.status(200).json({message: 'عکسی با موفقیت پاک گردید'})

    }catch (e) {
        console.log(e)
    }
}