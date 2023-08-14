import * as Mailgun from 'mailgun-js';
import { vars } from '../config/vars';
import emailTemplatesDBService from '../database/service/emailTemplates.dbservice'

// const emailService = require('./email');

const {
  apiKey, domain, from, isMailGunRequired
} = vars.mailGunDetails;


let mailGun = null;
if (isMailGunRequired) {
  mailGun = Mailgun({
    apiKey,
    domain
  });
}

/**
 * mapping value to temple and email_type specify the template
 * @param {*} emailVariable
 * @param {*} accountDetails
 */
 async function sendEmailTemplate(data, emailVariables) {
  // const methodName = '[sendEmailTemplate]';
  try {
    let html; 

    const emailTempalte = await emailTemplatesDBService.getTemplateByType({ 'type':data.type})
    const subject = emailTempalte.subject;
    html = emailTempalte.htmlDescription;
    Object.keys(emailVariables).forEach((variable) => {
      const replaceVariable = `[${variable}]`;
      html = html.split(replaceVariable).join(emailVariables[variable]);
    });

    const mailData = {
      from,
      to: data.email,
      subject,
      html
    };

    mailGun.messages().send(mailData, (err, body) => {
      if (err) {
        console.log(err);
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}


export default sendEmailTemplate;
