import * as nodemailer from 'nodemailer';
import { PlataformConfig } from './plataform';

const host=PlataformConfig.email.host
const email=PlataformConfig.email.email

 const transporter = nodemailer.createTransport({
    host: host,
    port: PlataformConfig.email.port,
    secure: false,
    auth: {
      user: email,
      pass: PlataformConfig.email.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


  export const mailTransporter= {host:host,email:email, transporter: transporter};

