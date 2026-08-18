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
    from: `"Pratik Lachwani" <${process.env.EMAIL_USER}>`, // sender address
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

async function sendRegisterEmail(userEmail, name)
{
    const subject = "Welcome to Our Bank System";

    const text = `Hi ${name},

Welcome to our Bank System!

Your account has been successfully created. We are excited to have you on board.

Thank you for choosing our banking system.

Best Regards,
Pratik Lachwani
Founder`;

    const html = `
        <h2>Welcome to Our Bank System!</h2>
        <p>Hi ${name},</p>

        <p>
            Welcome to our Bank System! Your account has been
            successfully created.
        </p>

        <p>
            We are excited to have you on board and look forward
            to providing you with a secure and reliable banking experience.
        </p>

        <p>Thank you for choosing our bank.</p>

        <br>

        <p>Best Regards,</p>
        <p><strong>Pratik Lachwani</strong></p>
        <p>Founder</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}


async function sendLoginEmail(userEmail, name)
{
    const subject = "New Login to Your Bank Account";

    const text = `Hi ${name},
        You have successfully logged in to your Bank System account.
        If this login was made by you, no further action is required.
        If you did not perform this login, please secure your account immediately.
        Best Regards,
        Pratik Lachwani
        Founder`;

    const html = `
        <h2>New Login to Your Bank Account</h2>
        <p>Hi ${name},</p>
        <p>
            You have successfully logged in to your Bank System account.
        </p>
        <p>
            If this login was made by you, no further action is required.
        </p>
        <p>
            <strong>If you did not perform this login, please secure your
            account immediately.</strong>
        </p>
        <br>
        <p>Best Regards,</p>
        <p><strong>Pratik Lachwani</strong></p>
        <p>Founder</p>
    `;
    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegisterEmail,
    sendLoginEmail
};