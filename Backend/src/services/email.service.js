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

async function sendTransactionEmail(userEmail, name, amount, toAccount)
{
    const subject = "Transaction Successful - Bank System";

    const text = `Hi ${name},

Your transaction has been successfully completed.

Transaction Details:
Amount: ₹${amount}
Transferred To Account: ${toAccount}

If you did not perform this transaction, please contact the bank immediately.

Best Regards,
Pratik Lachwani
Founder`;

    const html = `
        <h2>Transaction Successful</h2>

        <p>Hi ${name},</p>

        <p>
            Your transaction has been successfully completed.
        </p>

        <h3>Transaction Details</h3>

        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Transferred To:</strong> ${toAccount}</p>

        <p>
            If you did not perform this transaction, please contact
            the bank immediately.
        </p>

        <br>

        <p>Best Regards,</p>
        <p><strong>Pratik Lachwani</strong></p>
        <p>Founder</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount)
{
    const subject = "Transaction Failed - Bank System";

    const text = `Hi ${name},

Your attempted transaction could not be completed.

Transaction Details:
Amount: ₹${amount}
Attempted Transfer To Account: ${toAccount}

Please check your account balance and transaction details and try again.

If you believe this was an error, please contact the bank.

Best Regards,
Pratik Lachwani
Founder`;

    const html = `
        <h2>Transaction Failed</h2>

        <p>Hi ${name},</p>

        <p>
            Unfortunately, your attempted transaction could not be completed.
        </p>

        <h3>Transaction Details</h3>

        <p><strong>Amount:</strong> ₹${amount}</p>
        <p><strong>Attempted Transfer To:</strong> ${toAccount}</p>

        <p>
            Please check your account balance and transaction details
            and try again.
        </p>

        <p>
            If you believe this was an error, please contact the bank.
        </p>

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
        <h2>New Login to Your Bank Account Hiiiiiii How are you</h2>
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