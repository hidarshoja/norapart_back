const Question = (sequelize, DataTypes) => {
    const Question = sequelize.define("Question", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{ tableName: "questions",});

    return Question;
}

export default Question