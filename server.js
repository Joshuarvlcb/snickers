const express = require("express");
require("dotenv").config();

const app = express();
const connectDB = require("./server/db/connect");
const port = process.env.PORT || 3000;
//next
const next = require("next");
const dev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();
//middleware
app.use([express.urlencoded({ extended: false }), express.json()]);
const authMiddleware = require("./server/middleware/auth");
//routes
const shoes = require("./server/routes/shoe");
const login = require("./server/routes/login");
const cart = require("./server/routes/cart");
app.use("/api/v1/auth", login);
app.use("/api/v1/cart", cart);
app.use("/api/v1", shoes);
connectDB();

//start server!!
nextApp.prepare().then(() => {
  app.all("*", (req, res) => handler(req, res));
  app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`listening to port ${port}`);
  });
});
