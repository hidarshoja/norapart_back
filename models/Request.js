

const Request = (sequelize, DataTypes) => {
    const Request = sequelize.define("Request", {
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
        address_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'addresses', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cart_number:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        statuse: {
            type: DataTypes.ENUM("لغو","مرجوع شده"),
            allowNull: false,
            defaultValue: "لغو",
        }

    }, { tableName: "requests", });

    return Request;
}

export default Request