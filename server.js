require("dotenv").config();
const sslRedirect = require("heroku-ssl-redirect").default;
const express = require("express");
const http = require("http");
const app = express();
app.use(sslRedirect());

const connectDB = require("./server/db/connect");
const port = process.env.PORT || 3000;
//next
const next = require("next");
const dev = true;

const nextApp = next({ dev });
const handler = nextApp.getRequestHandler();
//middleware
app.use([express.urlencoded({ extended: false }), express.json()]);
const authMiddleware = require("./server/middleware/auth");
//routes
const shoes = require("./server/routes/shoe");
const login = require("./server/routes/login");
const cart = require("./server/routes/cart");
const search = require("./server/routes/search");
const payment = require("./server/routes/payment");
const email = require("./server/routes/email");
const wishlist = require("./server/routes/wishlist");
app.use("/api/v1/auth", login);
app.use("/api/v1/search", search);
app.use("/api/v1/email", email);
app.use("/api/v1/payment", payment);
app.use("/api/v1/cart", cart);
app.use("/api/v1/shoes", shoes);
app.use("/api/v1/wishlist", wishlist);
connectDB();

//start server!!

nextApp.prepare().then(() => {
  //what is app listen and app all
  app.all("*", (req, res) => handler(req, res));
  const server = http.createServer(app);
  server.listen(port, (err) => {
    if (err) return console.log(err, "foo");
    console.log(`listening to port ${port}`);
  });
});
