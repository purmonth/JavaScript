// require packages and model
var passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("../models/user.model")

// passport configurations
//passport.use(new LocalStrategy(User.authenticate()))
passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
