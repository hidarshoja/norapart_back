import db from "../models/index.js";

export const index = async(req, res) => {
    const {page=1 , limit=10} = req.query;
    const offset = (page - 1) * limit;
    try{
      const comments = await db.ProductComment.findAndCountAll({
                order:  [['createdAt','desc']],
                limit: parseInt(limit),
                offset: parseInt(offset),
            })
        return res.status(200).json({
            comments: comments.rows, // Fetched comments
            totalCount: comments.count, // Total number of comments
            totalPages: Math.ceil(comments.count / parseInt(limit)), // Total pages based on limit
            currentPage: parseInt(page), // Current page
            limit: parseInt(limit), // Items per page
        });

    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const create = async(req, res) => {
    try {
        const comments = await db.ProductComment.create(req.body)

        return res.status(201).json({message: 'کامنت با موفقیت ایجاد شد',comments})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }

}

export const update = async(req, res) => {
    try{
        const {comment_id} = req.params;
        const comment = await db.ProductComment.findByPk(comment_id)

        if (!comment) {
            return res.status(404).json({message: 'کامنت مورد نظر یافت نشد'})
        }

        await comment.update({status : comment?.status === 'published' ? 'inactive' : 'published'})

        return res.status(200).json({message: 'کامنت با موفقیت ویرایش شد',comment})
    }catch (e) {
        console.log(e)
        return res.status(500).json({error: e});
    }
}

export const destroy = async(req, res) => {
    try{
        const {comment_id} = req.params;
        const comment = await db.ProductComment.findByPk(comment_id)

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