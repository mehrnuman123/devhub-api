// models/userProfile.js
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define("UserProfile", {
    linkedin_url: DataTypes.TEXT,
    website: DataTypes.TEXT,
    location: DataTypes.STRING,
    years_of_experience: DataTypes.INTEGER,
    custom_bio: DataTypes.TEXT
  }, {});

  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  };

  return UserProfile;
};
