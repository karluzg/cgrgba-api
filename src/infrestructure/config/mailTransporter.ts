import * as nodemailer from 'nodemailer';

const host=""

 const transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false,
    auth: {
      user: 'your-username',
      pass: 'your-password',
    },
  });


  export default {host:host, transporter: transporter};

