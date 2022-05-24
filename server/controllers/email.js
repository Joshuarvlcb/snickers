require("dotenv");
const nodeMailer = require("nodemailer");

const sendEmail = async (req, res) => {
  /*
    create transporter
    get email from req.body

    options = {
        from :'joshuarvlcb@gmail.com',
        to:email,
        subject:'sneakers reciept',
        text:'you bought shoes from sneaker.com'
    }
    sendMail pass in options
    
    */
  try {
    //?? what is SMPT
    const { email } = req.body;
    console.log(process.env.USER, process.env.PASSWORD);
    const transporter = nodeMailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.USER,
        password: process.env.PASSWORD,
      },
    });
    const options = {
      from: "joshuarvlcb@gmail.com",
      to: email,
      subject: "sneakerz reciept",
      text: "thank you for buying shoes from snaekerz",
    };
    transporter.sendMail(options, (err, info) => {
      if (err) throw err;
      return res.status(200).json(info);
    });
  } catch (err) {
    console.log(err, "error in email controller");
    return res.status(500).send("error in email controller");
  }
};

module.exports = { sendEmail };
