

const Address = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
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
        province_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'provinces', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        city_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'cities', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        postal_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        ref_code:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        statuse: {
            type: DataTypes.ENUM("ثبت","پرداخت","پرداخت ناموفق","درحال پردازش","لغو","ارسال شد"),
            allowNull: false,
            defaultValue: "ثبت",
        }

    }, { tableName: "addresses", });

    return Address;
}

export default Address