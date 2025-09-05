const { Router } = require("express")
const { userController } = require("../controllers/user.controller")
const { requireAuth } = require("../middleware/auth")

const router = Router()

router.get("/", requireAuth, userController.list)

module.exports = router
