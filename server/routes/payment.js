const router = require("express").Router();
const { createCharge } = require("../controllers/payment");
router.route("/").post(createCharge);

module.exports = router;
