

const Payment = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
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
        address_id:{
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'addresses', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        authority:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        card_pan:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        ref_id:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        fee:{
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{ tableName: "payments"});

    return Payment;
}

export default Payment