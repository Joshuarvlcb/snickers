const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getShoe, getShoes } = require("../controllers/shoe");
router.get("/shoes", getShoes);
router.get("/shoes/:id", getShoe);

module.exports = router;
