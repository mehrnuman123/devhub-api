
const {Router} = require("express");
const { requireAuth } = require("../middleware/auth");
const { githubController } = require("../controllers/github.controller");

const router = Router();

router.get("/profile", requireAuth, githubController.userGitHubProfile)

module.exports  = router

