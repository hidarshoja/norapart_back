

const Blog = (sequelize, DataTypes) => {
    const Blog = sequelize.define("Blog", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        views: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.ENUM("published", "inactive"),
            allowNull: false,
            defaultValue: "published",
        }

    },{ tableName: "blogs",});

    return Blog;
}

export default Blog