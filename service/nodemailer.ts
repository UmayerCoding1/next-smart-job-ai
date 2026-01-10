import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth:{
    user: process.env.NODEMAILER_USER!,
    pass: process.env.NODEMAILER_PASS!  
  }
});


export const sendEmailWithNodemailer = async (to: string,sub: string,emailContext: string) => {  
   transporter.sendMail({
    to,
    subject: sub,
    html: `<p>${emailContext}</p>`
   });

   console.log('Email send successfully');
   return {success: true}
   
}