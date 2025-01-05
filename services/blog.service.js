
export const addNewBlog = async (db,page,limit) => {
    const offset = (page - 1) * limit;
    const blogs = await db.Blog.findAll({
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [
            {
                model: db.BlogComment,
                as: 'comments',
                attributes: [
                    'username',
                    'body',
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
    return blogs;
}