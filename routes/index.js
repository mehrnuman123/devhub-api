const { Router } = require("express")
const authRoutes = require("./auth.routes")
const userRoutes = require("./user.routes")
const githubRoutes =require("./github.routes") 

const { authController } = require("../controllers/auth.controller")
const { requireAuth } = require("../middleware/auth")
const { githubController } = require("../controllers/github.controller")

const router = Router()

router.use("/auth", authRoutes)
router.get("/me", requireAuth, authController.me)
router.post("/logout", authController.logout)
router.use("/users", userRoutes)
router.use("/github", githubRoutes)


module.exports = router
       