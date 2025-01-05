import db from "../models/index.js";

export const index = async(req, res) => {
    try{
        const questions = await db.Question.findAll()

        return res.status(200).json(questions)
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const create = async(req, res) => {
    try {
        const {name, description} = req.body;
        const question = await db.Question.create({
            name,
            description,
        })
        return res.status(201).json({message: 'سوال با موفقیت ایجاد شد',question})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }

}

export const update = async(req, res) => {
    try{
        const {question_id} = req.params;
        const question = await db.Question.findOne({
            where:{
                id: question_id,
            }
        })

        if (!question) {
            return res.status(404).json({message: 'سوال مورد نظر یافت نشد'})
        }

        await question.update(req.body)

        return res.status(200).json({message: 'سوال با موفقیت ویرایش شد',question})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const destroy = async(req, res) => {
    try{
        const {question_id} = req.params;
        const question = await db.Question.findOne({
            where:{
                id: question_id,
            }
        })

        if (!question) {
            return res.status(404).json({message: 'سوال مورد نظر یافت نشد'})
        }

        await question.destroy()

        return res.status(200).json({message: 'سوال با موفقیت حذف شد',question})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}