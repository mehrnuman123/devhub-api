// models/technology.js
module.exports = (sequelize, DataTypes) => {
  const Technology = sequelize.define("Technology", {
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, {});

  Technology.associate = (models) => {
    Technology.belongsToMany(models.User, { through: models.UserTechnology, foreignKey: "technology_id", as: "users" });
  };

  return Technology;
};
