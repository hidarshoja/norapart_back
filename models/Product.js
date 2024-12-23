

const Product = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price_with_off: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'categories', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        machine: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        material: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        buy_count: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
        },
        suggestion: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
            defaultValue: "inactive",
        },
        is_best: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
            defaultValue: "inactive",
        },
        statuse: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
            defaultValue: "active",
        }

    },{ tableName: "products",});

    return Product;
}

export default Product