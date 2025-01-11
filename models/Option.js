

const Option = (sequelize, DataTypes) => {
    const Option = sequelize.define("Option", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("waiting", "awnsered"),
            allowNull: false,
            defaultValue: "waiting",
        }

    },{ tableName: "options",});

    return Option;
}

export default Option