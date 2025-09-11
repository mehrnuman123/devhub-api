const passport = require("passport")
const GitHubStrategy = require("passport-github2").Strategy
const { env } = require("./env")
const { User } = require("../models")
const { upsertGitHubUser } = require("../utils")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

passport.use(
  new GitHubStrategy(
    {
      clientID: env.github.clientId,
      clientSecret: env.github.clientSecret,
      callbackURL: env.github.callbackUrl,
      scope: ["user:email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        console.log(profile, "profile =====================");
        
        const user = await upsertGitHubUser(profile)
        return done(null, user)
      } catch (e) {
        return done(e, null)
      }
    }
  )
)

module.exports = passport
