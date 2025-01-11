const SuggestionList = (sequelize, DataTypes)=>{
    const SuggestionList = sequelize.define("SuggestionList", {
        id:{
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        suggestion_id:{
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'suggestions', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
        product_id:{
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'products', // Name of the table for Documents
                key: 'id', // Field in Documents to reference
            },
        },
    },{ tableName: "suggestion_list"})
    return SuggestionList;
}

export default SuggestionList;