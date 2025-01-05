

const Contact = (sequelize, DataTypes) => {
    const Contact = sequelize.define("Contact", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("waiting", "awnsered"),
            allowNull: false,
            defaultValue: "waiting",
        }

    },{ tableName: "contacts",});

    return Contact;
}

export default Contact