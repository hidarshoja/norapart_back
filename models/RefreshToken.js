const RefreshToken =(sequelize,DataTypes) => {
    const RefreshToken = sequelize.define("RefreshToken", {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
    },{ tableName: "refresh_tokens",});
  
    return RefreshToken;
  };

  export default RefreshToken;