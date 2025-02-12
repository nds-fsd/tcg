const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, text) => {
  const msg = {
    to,
    from: {
      email: process.env.EMAIL,
      name: 'PixelQuest TCG',
    },
    subject,
    text,
  };
  sendgrid.send(msg);
};

module.exports = sendEmail;
