

const City = (sequelize, DataTypes) => {
    const City = sequelize.define("City", {
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
        province_id:{
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'provinces', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        statuse: {
            type: DataTypes.ENUM("published", "inactive"),
            allowNull: false,
            defaultValue: "published",
        }

    },{ tableName: "cities",});

    return City;
}

export default City