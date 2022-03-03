const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization.split(" ");
  if (authorization[0] !== "Bearer")
    return res.status(403).send("invalid authorization");

  try {
    const token = authorization[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) return res.status(403).send("invalid token");

    req.user = payload.id;
    next();
  } catch (err) {
    console.log(err);
    console.log("error @ auth middleware");
  }
};

module.exports = auth;
