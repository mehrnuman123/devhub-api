const { Router } = require("express")
const passport = require("../config/passport")
const { authController } = require("../controllers/auth.controller")

const router = Router()

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }))

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/failure" }),
  authController.githubCallback
)

router.get("/failure", (_req, res) => res.status(401).json({ message: "GitHub login failed" }))

module.exports = router
