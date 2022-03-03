const mongoose = require("mongoose");
const populate = require("./populate");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("connect to the DB");
    });
  } catch (err) {
    console.log("could not connect to the db", err);
  }
};

module.exports = connect;
