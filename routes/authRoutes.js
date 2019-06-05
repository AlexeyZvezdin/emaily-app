const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      // scope asking google what info to give us
      scope: ["profile", "email"]
    })
  );
  // This is the path in our application that users are redirected to after
  // they have authenticated with Google. The path is appended with the authorization
  // code for access. Made for security purpose to not allow change uri callback adress
  app.get("/auth/google/callback", passport.authenticate("google"));
};
