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


export const sendOtpWithNodemailer = async (to: string,sub: string,otp: number) => {
  console.log(to,sub,otp);
  
   transporter.sendMail({
    to,
    subject: sub,
    html: `<p>Your OTP: ${otp}`
   });

   console.log('Email send successfully');
   return {success: true}
   
}