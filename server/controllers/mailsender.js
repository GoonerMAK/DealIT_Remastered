const mailer= require('nodemailer')
const jwt = require('jsonwebtoken') 

module.exports = async (email) =>{
    try
    {
        const transporter = mailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            auth: {
                user: "zayed.hasan.14@gmail.com",
                pass:"bbbbccpqgkcporyk"
            }
        })
        const token= jwt.sign({email}, process.env.MAILSECRET, { expiresIn: '30m' })
        await transporter.sendMail({
            from: "zayed.hasan.14@gmail.com",
            to: email,
            subject:  'Email Verification',
            text:'Please, Click the following link to verify your email.',
            html:`http://localhost:4000/api/user/verify/${email}/${token}`
        }, function(error, info){
            if(error){
                throw error
            }
            console.log("email send succsesfully inner")
            console.log(info)
        })
        console.log("email send succsesfully")

    }catch(error)
    {
        console.log("email not sent!");
		console.log(error);
		return error;
    }
}

