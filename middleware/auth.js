const jwt = require("jsonwebtoken")
const { env } = require("../config/env")

function requireAuth(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  try {
    const decoded = jwt.verify(token, env.jwt.secret)
    req.userId = decoded.sub
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

module.exports = { requireAuth }
