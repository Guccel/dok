const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "doksenpai@outlook.com",
        pass: require('dotenv').config().parsed.EMAIL
    }
})

const options = {
    from: "doksenpai@outlook.com",
    to: "rapinnz@gmail.com",
    subject:"important!",
    text: "deez nuts"
}

transporter.sendMail(options, (err, info) => {
    if (err) {console.log(err); return}

    console.log(info.response);
})