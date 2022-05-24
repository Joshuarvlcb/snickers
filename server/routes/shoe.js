const express = require("express");
const router = express.Router();
const { getShoe, getShoes, popular, newest } = require("../controllers/shoe");

router.route("/").get(getShoes);
router.route("/popular").get(popular);
router.route("/newest").get(newest);
router.route("/:id").get(getShoe);

module.exports = router;
