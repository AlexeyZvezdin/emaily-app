const passport = require("passport");

module.exports = app => {
  app.get("/api/current_user", (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    // Logout is a function inside passport
    req.logout();
    res.redirect("/");
  });
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
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      // console.log(req.user, " USER");
      res.redirect("/surveys");
    }
  );

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

  app.get("/auth/vkontakte/callback", passport.authenticate("vkontakte"));

  // Github auth

  app.get("/auth/github", passport.authenticate("github"));

  app.get("/auth/github/callback", passport.authenticate("github"), function(
    req,
    res
  ) {
    // Successful authentication, redirect home.
    // res.send(req.session); // — Переправляет на json req.session object
    res.redirect("/");
  });
};
