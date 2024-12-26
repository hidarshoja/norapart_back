

const TotalPrice = (sequelize, DataTypes) => {
    const TotalPrice = sequelize.define("TotalPrice", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        
        address_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'addresses', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        total_price: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{ tableName: "total_prices",});

    return TotalPrice;
}

export default TotalPrice