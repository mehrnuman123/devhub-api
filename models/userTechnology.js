// models/userTechnology.js
module.exports = (sequelize, DataTypes) => {
  const UserTechnology = sequelize.define("UserTechnology", {}, {});
  return UserTechnology;
};
