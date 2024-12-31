

const IpAddress = (sequelize, DataTypes) => {
    const IpAddress = sequelize.define("IpAddress", {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{ tableName: "ip_addresses",});

    return IpAddress;
}

export default IpAddress