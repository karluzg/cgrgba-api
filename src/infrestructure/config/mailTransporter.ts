import * as nodemailer from 'nodemailer';

const host="mail.nantoidigital.com"
const email="dev@nantoidigital.com"

 const transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false,
    auth: {
      user: email,
      pass: 'NANTOIDEV2023',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


  export const mailTransporter= {host:host,email:email, transporter: transporter};

