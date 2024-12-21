
const User = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.ENUM("admin", "user"),
            defaultValue: "user",
        },
        statuse: {
            type: DataTypes.ENUM("active", "inactive"),
            allowNull: false,
            defaultValue: "active",
        }

    });

    return User;
};

export default User;
