import db from '../models/index.js'
import cloudinary from "../libs/cloudinary.js";
import { generateSlug } from '../libs/slug.js';
import saveImages from '../libs/product.upload.js';

export const index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const offset = (pageNumber - 1) * limitNumber;

        const products = await db.Product.findAndCountAll({
            limit: limitNumber,
            offset: offset,
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
                    attributes: ['id', 'image_url'],
                },
            ],
        });


        res.json({
            products: products.rows,
            totalCount: products.count,
            totalPages: Math.ceil(products.count / limitNumber),
            currentPage: pageNumber,
            limit: limitNumber,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

export const create = async (req, res) => {
    try {
        
        let slug = await generateSlug(req.body.name);
        const products = await db.Product.create({ ...req.body, slug });
console.log(req.body.images)
        await new Promise(resolve => setTimeout(resolve, 2000));
        const images = await saveImages(req.body.images, ' products');
        

        for (const image of images) {
            await db.ProductImage.create({
            product_id: products?.id,
            image_url: image,
        });
        }
        
        // let cloudinaryResponse = null;

        // for (const image of req.body.images) {
        //     cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });

        //     await db.ProductImage.create({
        //         product_id: products.id,
        //         image_url: cloudinaryResponse.secure_url,
        //     });
        // }

        // res.status(201).json({ message: "محصول با موفقیت ایجاد شد", products })
        res.status(201).json({ message: "محصول با موفقیت ایجاد شد",products })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// ! show product by slug
export const show = async (req, res) => {
    console.log(req.params.slug)
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
              ],
        });
        
        res.json(product);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}