import db from "../models/index.js";
import cloudinary from "../libs/cloudinary.js";
import saveImageCategory from "../libs/category.upload.js";

export const index = async (req, res) => {
    try {
        const categories = await db.Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const create = async (req, res) => {
    try {
        const image_url = await saveImageCategory(req.body.image_url, req.body.name);

        // let cloudinaryResponse = null;


        //     cloudinaryResponse = await cloudinary.uploader.upload(req.body.image_url, { folder: "products" });

        const category = await db.Category.create({
            name: req.body.name,
            image_url
        });


        res.status(201).json({ message: "دسته بندی با موفقیت ایجاد شد", category })
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}