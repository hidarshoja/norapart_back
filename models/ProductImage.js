const ProductImage = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define("ProductImage", {
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

        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
        statuse: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
            defaultValue: "active",
        }

    },{
        tableName: "product_images", // Explicit table name
        freezeTableName: true, // Prevent automatic pluralization
    });

    return ProductImage;
}

export default ProductImage