// models/connection.js
module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define("Connection", {
    status: { type: DataTypes.STRING, defaultValue: "pending" }
  }, {});

  Connection.associate = (models) => {
    Connection.belongsTo(models.User, { foreignKey: "requester_id", as: "requester" });
    Connection.belongsTo(models.User, { foreignKey: "receiver_id", as: "receiver" });
  };

  return Connection;
};
