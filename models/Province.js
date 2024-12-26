

const Province = (sequelize, DataTypes) => {
    const Province = sequelize.define("Province", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
        statuse: {
            type: DataTypes.ENUM("published", "inactive"),
            allowNull: false,
            defaultValue: "published",
        }

    },{ tableName: "provinces",});

    return Province;
}

export default Province