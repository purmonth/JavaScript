// require packages
var passport = require("passport"),
    FacebookStrategy = require("passport-facebook").Strategy

// passport configurations
const auth = require("./auth")
passport.use(new FacebookStrategy({
  clientID: auth.facebookAuth.clientID,
  clientSecret: auth.facebookAuth.clientSecret,
  callbackURL: auth.facebookAuth.callbackURL
}, (accessToken, refreshToken, profile, done) => {
  return done(NULL, profile)
}
)) 
passport.serializeUser((user, done) => {   // serialize user's data
    done(null, user)
})
passport.deserializeUser((id, done) => {   // deserialize user's data and put them in session
    done(null, id)
})

module.exports = passport   // export the module 
