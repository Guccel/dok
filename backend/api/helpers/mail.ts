import nodemailer from 'nodemailer'
import fs from 'fs'

const transporter = nodemailer.createTransport({
  service: "hotmail",
	auth: {
    user: "doksenpai@outlook.com",
    pass: require('dotenv').config().parsed.EMAIL
  }
})

export async function sendRegisterMail(email: string, session_id: string){
  fs.readFile("templates/register.html", "utf8", (err, html) => {
    if (err) throw err;

		const options = {
      from: "doksenpai@outlook.com",
      to: email,
      subject:"Dokatsu registration",
      html: html.replace(':session_id', session_id)
    }
    
    transporter.sendMail(options, (err, info) => {
      if (err) {console.log(err); return}
    })
  })
}