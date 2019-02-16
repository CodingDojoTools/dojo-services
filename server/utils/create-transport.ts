import * as nodemailer from 'nodemailer';

const { DOJO_MAIL, DOJO_MAIL_PASSWORD } = process.env;

export function createTransport() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: DOJO_MAIL,
      pass: DOJO_MAIL_PASSWORD,
    },
  });
}
