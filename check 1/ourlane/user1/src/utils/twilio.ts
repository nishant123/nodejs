import { vars } from '../config/vars';

const { twiloCredentials } = vars;

const { accountSid, authToken, twilioNumber } = twiloCredentials;

const client = require('twilio')(accountSid, authToken); 

const sendSms = (body, to) => client.messages.create({
    body, 
    from: twilioNumber,       
    to
});

module.exports = sendSms;