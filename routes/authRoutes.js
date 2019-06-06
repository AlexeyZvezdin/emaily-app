const passport = require("passport");

module.exports = app => {
  // Google Auth
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

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  // VK Auth
  app.get(
    "/auth/vkontakte",
    passport.authenticate("vkontakte", {
      scope: ["status", "email", "friends"]
    }),
    function(req, res) {
      console.log(res, req);
      // The request will be redirected to vk.com for authentication, so
      // this function will not be called.
    }
  );

  app.get(
    "/auth/vkontakte/callback",
    passport.authenticate("vkontakte", { failureRedirect: "/lox" }),
    function(req, res) {
      // Successful authentication, redirect home.
      // res.redirect("/");
      // need to check this ->
      res.send(req.user);
    }
  );
};
