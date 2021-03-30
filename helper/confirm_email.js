const nodemailer = require('nodemailer')


let sendMessage = async function(email, login, link) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ukr.net',
        port: 465,
        secure: true,
        auth: {
            user: 'dvoichuck@ukr.net',
            pass: '9EX7lNUaMpi8fxwL',
        },
    })

    return await transporter.sendMail({
        from: 'usof.com <dvoichuck@ukr.net>',
        to: `${email}, ${email}`,
        subject: "Please confirm your Usof account",
        html: `Hello ${login},<br> Please Click on the link to verify your email.<br><a href=` + link + ">Click here to verify</a>"
    })
}

module.exports = sendMessage

