const { User } = require("../models")

const userController = {
  list: async (_req, res) => {
    const users = await User.findAll({ attributes: ["id", "username", "name"] })
    res.json(users)
  }
}


module.exports = { userController }
