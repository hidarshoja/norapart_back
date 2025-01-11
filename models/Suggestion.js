const Suggestion = (sequelize, DataTypes)=>{
    const Suggestion = sequelize.define("Suggestion", {
        id:{
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        expired_at:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    },{ tableName: "suggestions"})
    return Suggestion;
}

export default Suggestion;