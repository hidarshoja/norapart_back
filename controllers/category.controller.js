import db from "../models/index.js";
import saveImageCategory from "../libs/category.upload.js";
import path from "path";
import fs from 'fs'

// ! show all categories
export const index = async (req, res) => {
    try {
        const categories = await db.Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// ! show a category buy id
export const show = async(req,res) => {
  const {id} = req.params
    try{
      const category = await db.Category.findByPk(id)
        if (!category){
            return res.status(404).json({message : 'دسته بندی ای یافت نشد'})
        }
        return res.status(200).json(category)
    }catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'خطای سرور' });
    }
}

// ! create a category
export const create = async (req, res) => {
    try {
        const image_url = await saveImageCategory(req.body.image_url, req.body.name, 'categories');

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

// delete a product
export const destroy = async(req,res)=>{
    try{
        const {id} = req.params
        const category = await db.Category.findOne({
            where: {id},
        })

        if (!category){
            return res.status(404).json({message: 'محصولی یافت نشد'});
        }



            //const imagePath = path.resolve(process.cwd(), 'storage', category?.image_url); // Adjust this path if necessary
            const imagePath = `${process.cwd()}/storage${category?.image_url}`
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


        await db.Category.destroy({ where: { id: category.id } });

        return res.status(200).json({ message: 'محصول و تصاویر مربوطه با موفقیت حذف شدند' });

    }catch (e) {
        console.log(e)
    }
}

// edit a product
export const update = async(req,res)=>{
    const {id} = req.params
    const category = await db.Category.findOne({
        where: {id},
    })

    if (!category){
        return res.status(404).json({message: 'محصولی یافت نشد'});
    }

    if (!req.body.image_url){
        category.update({
            name: req.body.name
        })
        return  res.status(200).json({message: 'ویرایش با موفقیت انجام شد'})
    }

    const imagePath = `${process.cwd()}/storage${category?.image_url}`
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

    const image_url = await saveImageCategory(req.body.image_url, req.body.name,'categories');

     category.update({
        name: req.body.name,
        image_url
    });



   // const imagePath = path.resolve(process.cwd(), category?.image_url);

    return  res.status(200).json(imagePath)
}