const passport = require("passport")
const GitHubStrategy = require("passport-github2").Strategy
const { env } = require("./env")
const { User } = require("../models/user")

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
        const githubId = profile.id
        //const nodeId = profile.node_id
        const username = profile.username || ""
        const displayName = profile.displayName || ""
        const avatarUrl = profile.photos?.[0]?.value || ""
        const email = profile.emails?.[0]?.value || null
        console.log(profile, "================================ profile");
       
        

        const [user] = await User.findOrCreate({
          where: { githubId },
          defaults: { githubId, username, displayName, avatarUrl, email },
        })

        await user.update({ username, displayName, avatarUrl, email })

        return done(null, user)
      } catch (e) {
        return done(e, null)
      }
    }
  )
)

module.exports = passport
