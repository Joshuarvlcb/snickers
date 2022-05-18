const router = require("express").Router();
const { search, getRidOfQuotes } = require("../controllers/search");

router.route("/").post(search).put(getRidOfQuotes);

module.exports = router;
