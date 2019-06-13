const passport = require("passport");
// strategies
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google strategy realization
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // callBackURL is where user is redirected when auth is complete
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    // Function triggered after user is redirected from authRoutes after
    // google send back to callbackURL with token
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have user
          done(null, existingUser);
        } else {
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
      console.log(profile.id);
    }
  )
);

// Vk strategy realization

passport.use(
  new VKontakteStrategy(
    {
      // main option and how it looks like after transformation by OAuth2Strategy func
      // authorizationURL: `https://oauth.vk.com/authorize?client_id=${
      //   keys.vkAppID
      // }&redirect_uri=http://localhost:5000/auth/vkontakte/callback&v=5.95`,
      clientID: `${keys.vkAppID}`, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
      clientSecret: `${keys.vkAppSecret}`,
      callbackURL: "/auth/vkontakte/callback",
      // profileFields: ["city", "bdate"],
      apiVersion: "5.95",
      proxy: true
    },
    function(accessToken, refreshToken, params, profile, done) {
      // console.log(params.email); // getting the email and it is may be undefined
      console.log(profile.id);
      User.findOne({ vkID: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have user
          done(null, existingUser);
        } else {
          new User({ vkID: profile.id }).save().then(user => done(null, user));
        }
      });
    }
  )
);

// Github strategy realization
passport.use(
  new GitHubStrategy(
    {
      clientID: keys.githubID,
      clientSecret: keys.githubSecretKey,
      callbackURL: "/auth/github/callback",
      proxy: true
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile.name);
      User.findOne({ githubID: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have user
          done(null, existingUser);
        } else {
          new User({ githubID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
