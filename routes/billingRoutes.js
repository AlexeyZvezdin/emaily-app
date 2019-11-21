const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripepay", requireLogin, async (req, res, next) => {
    let amt = req.body.amount;
    let token = req.body.token.id;

    const charge = await stripe.charges.create({
      amount: amt * 100,
      currency: "usd",
      description: "Purchasing the Gold",
      source: token
    });

    req.user.credits += amt;
    const user = await req.user.save();

    res.send(user);
  });
};
