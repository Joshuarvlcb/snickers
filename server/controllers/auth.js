const UserModel = require("../models/User");
//model

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(404).send("you need a username password and email!");

    const newUser = await UserModel.create({ username, email, password });
    const token = await newUser.createJwt();
    return res.status(200).json({ user: newUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("error @ register");
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) return res.status(404).send("invalid credentials");

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send('"username or password incorrect"');
    const pw = await user.comparePasswords(password);
    if (!pw) return res.status(401).send("username or password incorrect");

    const token = await user.createJwt();

    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("error @ login");
  }
};
const getProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = { login, register, getProfile };
