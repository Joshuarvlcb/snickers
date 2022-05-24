const router = require("express").Router();
const { sendEmail } = require("../controllers/email");
router.route("/").post(sendEmail);

module.exports = router;
