

const Order = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        product_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'products', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        total_price_id:{
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: 'total_prices', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        amount:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        ref_code:{
            type: DataTypes.STRING,
            allowNull: true,
        },

        statuse: {
            type: DataTypes.ENUM("published", "inactive"),
            allowNull: false,
            defaultValue: "published",
        }

    },{ tableName: "orders",});

    return Order;
}

export default Order