const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

<<<<<<< HEAD
const sendWelcomeEmail = (to, userName) => {
  const msg = {
    from: process.env.EMAIL,
    personalizations: [
      {
        to: [
          {
            email: to,
          },
        ],
        dynamic_template_data: {
          userName,
        },
      },
    ],
    template_id: 'd-88253b5135d245879f9cd3d23ead5191',
=======
const sendEmail = (to, subject, text) => {
  const msg = {
    to,
    from: {
      email: process.env.EMAIL,
      name: 'PixelQuest TCG',
    },
    subject,
    text,
>>>>>>> 4754522 (Add email sending features)
  };
  sendgrid.send(msg);
};

<<<<<<< HEAD
module.exports = sendWelcomeEmail;
=======
module.exports = sendEmail;
>>>>>>> 4754522 (Add email sending features)
