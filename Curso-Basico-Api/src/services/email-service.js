'use-strict';

var config = require('../config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgridKey);


exports.send = async (to, subject, body) => {
    const msg = {
        to: to,
        from: 'hello@intelligencesolutions.com.br',
        subject: subject,
        text: 'Testando SendMail/Email',
        html: body
    };
    sgMail.send(msg);
}