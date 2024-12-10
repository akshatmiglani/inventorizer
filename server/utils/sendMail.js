const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config();


function sendInvoice(customerMail,businessData,fileUrl){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    const htmlContent=`
        <div style='font-family: Aerial, sans-serif; line-height:1.6; color: #333;'> 
            <h2 style='color: #333;'> Thank you for your purchase from ${businessData.businessName} </h2>
            <p> Find your electronic invoice from the link below: </p>
            <p>
                <a href="${fileUrl}" target="_blank" style="color: #1a73e8; text-decoration: none;">
                    <strong> Download Invoice </strong>
                </a>
            </p>

            <p>Best Regards</p>
            <p>${businessData.businessName}</p>
            <p>${businessData.email}</p>
        </div>
    `;

    
    let mailOptions = {
        from: 'akshat.miglani6573@gmail.com',
        to: customerMail,
        subject: `Reciept for your recent purchase from ${businessData.businessName}`,
        text: 'Thank you for your purchase! This mail contains electronic invoice via a pdf-link.',
        html: htmlContent,
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
    });


}

module.exports ={sendInvoice};


