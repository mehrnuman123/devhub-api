const { User } = require("../models/user")

const userController = {
  list: async (_req, res) => {
    const users = await User.findAll({ attributes: ["id", "username", "displayName"] })
    res.json(users)
  }
}


module.exports = { userController }
