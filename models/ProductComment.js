

const ProductComment = (sequelize, DataTypes) => {
    const ProductComment = sequelize.define("ProductComment", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'products', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        user_id:{
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: 'users', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        body:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0',
        },
        status: {
            type: DataTypes.ENUM("published", "inactive"),
            allowNull: false,
            defaultValue: "inactive",
        }

    },{ tableName: "product_comments",});

    return ProductComment;
}

export default ProductComment