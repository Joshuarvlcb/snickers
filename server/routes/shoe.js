const express = require("express");
const router = express.Router();
const { getShoe, getShoes, popular, newest } = require("../controllers/shoe");
router.route("/shoes").get(getShoes);
router.route("/shoes/popular").get(popular);
router.route("/shoes/newest").get(newest);
router.route("/shoes/:id").get(getShoe);

module.exports = router;
