

const BlogReplyComment = (sequelize, DataTypes) => {
    const BlogReplyComment = sequelize.define("BlogReplyComment", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        comment_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'blog_comments', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        body:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("published", "inactive"),
            allowNull: false,
            defaultValue: "published",
        }

    },{ tableName: "blog_reply_comments",});

    return BlogReplyComment;
}

export default BlogReplyComment