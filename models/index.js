const { sequelize } = require("../config/db")
const { User } = require("./user")

async function initModels() {
  await sequelize.authenticate()
  await sequelize.sync()
}

module.exports = { initModels, User }
