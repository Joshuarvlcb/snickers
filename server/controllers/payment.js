require("dotenv");

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
/*
I want to use stripe to just make payments

*/

const createCharge = async (req, res) => {
  try {
    const { token, price } = req.body;
    console.log(token);
    const charge = await stripe.charges.create({
      amount: +price,
      currency: "usd",
      description: "test payment for sneakers",
      source: token,
    });
    res.status(200).json(charge);
  } catch (err) {
    console.log(err, "error in payment controller");
    return res.status(500).send(err);
  }
};

module.exports = { createCharge };
