import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "doksenpai@outlook.com",
        pass: require('dotenv').config().parsed.EMAIL
    }
})

export async function sendRegisterMail(email: string){
    const options = {
        from: "doksenpai@outlook.com",
        to: email,
        subject:"Dokatsu registration",
        html: "<h1>Welcome to dokatsu</h1> <br> Click here to verify your account!"
    }

    transporter.sendMail(options, (err, info) => {
        if (err) {console.log(err); return}
    })
}