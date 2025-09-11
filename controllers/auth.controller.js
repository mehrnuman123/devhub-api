const jwt = require("jsonwebtoken")
const { env } = require("../config/env")
const { User } = require("../models")

function setAuthCookie(res, userId) {
  const token = jwt.sign({ sub: userId }, env.jwt.secret, { expiresIn: env.jwt.expiresIn })
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.cookie.secure,
    domain: env.cookie.domain,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  })
}

const authController = {
  githubCallback: (req, res) => {
    const user = req.user 
    if (!user) return res.redirect("/auth/failure")

    setAuthCookie(res, user.id)
    return res.redirect(`${env.frontendUrl}/home`)
  },

  me: async (req, res) => {
  
    const user = await User.findByPk(req.userId, {
      attributes: {exclude : ["node_id", "github_id"]},
    })
    if (!user) return res.status(404).json({ message: "Not found" })
    res.json(user)
  },

  logout: (_req, res) => {
    res.clearCookie("token", { path: "/" })
    res.json({ message: "Logged out" })
  },
}

module.exports = { authController }
