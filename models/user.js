// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    github_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    node_id: DataTypes.STRING,
    profile_url: DataTypes.TEXT,
    html_url: DataTypes.TEXT,
    avatar_url: DataTypes.TEXT,
    twitter_username: DataTypes.STRING,
    name: DataTypes.STRING,
    company: DataTypes.STRING,
    bio: DataTypes.TEXT,
    location: DataTypes.TEXT,
    email: DataTypes.STRING,
    blog: DataTypes.TEXT,
    followers_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    following_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    repos_url: DataTypes.TEXT,
    public_repos_count: DataTypes.STRING,
    followers_url: DataTypes.TEXT,
    following_url: DataTypes.TEXT,
    github_updated_at: DataTypes.DATE,
    gists_url: DataTypes.TEXT,
    repos_url:DataTypes.TEXT,
    starred_url: DataTypes.TEXT,
    public_repos_count: DataTypes.STRING,
    github_created_at: DataTypes.DATE,
  }, {});

  User.associate = (models) => {
    User.hasOne(models.UserProfile, { foreignKey: "user_id", as: "profile" });
    User.belongsToMany(models.Technology, { through: models.UserTechnology, foreignKey: "user_id", as: "technologies" });
    User.hasMany(models.Connection, { foreignKey: "requester_id", as: "sentConnections" });
    User.hasMany(models.Connection, { foreignKey: "receiver_id", as: "receivedConnections" });
  };

  return User;
};
