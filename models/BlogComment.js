

const BlogComment = (sequelize, DataTypes) => {
    const BlogComment = sequelize.define("BlogComment", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        blog_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'blogs', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        username:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        body:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("published", "inactive"),
            allowNull: false,
            defaultValue: "inactive",
        }

    },{ tableName: "blog_comments",});

    return BlogComment;
}

export default BlogComment