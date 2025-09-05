const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../config/db")

class User extends Model { }

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    githubId: { type: DataTypes.STRING, unique: true, allowNull: false },
    nodeId: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: false },
    displayName: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
    email: { type: DataTypes.STRING, allowNull: true },
    avatarUrl: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: "users" , }
)



module.exports = { User }
