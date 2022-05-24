// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodeMailer from "nodemailer";
import formidable from "formidable";
/*
make sendEmail request when we submit
check to see if all form data is there and
  if not return res.send('fill out all of the form')

send email to myself using nodemailer 
return res.send('success)

*/
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req, res) {
  switch (req.method) {
    case "POST": {
      res.status(203).json({});
      const form = formidable({});

      const formData = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(res.status(402).json(err));
          console.log(fields);

          resolve(fields);
        });
      });

      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: "joshuarvlcb@gmail.com",
          pass: "Gravvy12345",
        },
      });

      const options = {
        from: "joshuarvlcb@gmail.com",
        to: "joshuarvlcb@gmail.com",
        subject: `Email from portfolio ${formData.email}`,
        text: `first name: ${formData.firstName}, last name:${formData.lastName} phone : ${formData.phone} message: ${formData.message}`,
      };

      transporter.sendMail(options, (err, info) => {
        console.log(err, info);
        if (err) return res.status(405).json({ err });
        return res.status(200).json({ information: info.response });
      });
    }
  }
}
