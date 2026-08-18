const nodemailer = require('nodemailer');



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
    from: `"Romila Mukul" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegisterEmail( userEmail , name )
{
    const subject = "Welcome to Our Bank System" ;
    const text = `Me , Founder Pratik Lachwani Welcome and greet ${name} , \n\nThank you for using our Bank.We are Excited to have you on board!!\n\n\nBest Regards\n\nPratik Lachwani` ;
    const html = `<p>Me , Founder Pratik Lachwani Welcome and greet ${name}</p> ,<p> <br><br>Thank you for using our Bank.We are Excited to have you on board!!</p><p><br>Best Regards</p><br><p>Pratik Lachwani</p>`;
    await sendEmail(userEmail , subject , text , html) ;
}

module.exports = {
    sendRegisterEmail
};