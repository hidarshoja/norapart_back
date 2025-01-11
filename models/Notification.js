const Notification = (sequelize, DataTypes)=>{
    const Notification = sequelize.define("Notification", {
        id:{
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        expired_at:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{ tableName: "notifications"})
    return Notification;
}

export default Notification;