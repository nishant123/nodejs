const path = require('path');
require('dotenv-safe').config({
    allowEmptyValues: true,
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example')
});

const mailGunDetails = {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    from: process.env.MAILGUN_MAIL_FROM,
    isMailGunRequired: process.env.IS_MAIL_GUN_REQUIRED == 'true',
    frontendHost: process.env.LOCALHOST,
    salt: process.env.SALT
}

module.exports = {
    mailGunDetails
}