const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const routes = require("./routes")
const { errorHandler } = require("./middleware/error")
const { env } = require("./config/env")
const passport = require("./config/passport")
const { initModels } = require("./models")

async function main() {
  await initModels()

  const app = express()

  app.use(
    cors({
      origin: [env.frontendUrl],
      credentials: true,
    })
  )
  app.use(express.json())
  app.use(cookieParser())

  // session for passport handshake
  app.use(
    session({
      secret: "tmp_session_secret",
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use("/api/",routes)
  app.use(errorHandler)

  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}`)
  })
}

main().catch((e) => {
  console.error("Startup error", e)
  process.exit(1)
})
