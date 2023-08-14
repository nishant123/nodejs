import * as Mailgun from 'mailgun-js';
import { vars } from '../config/vars';
import emailTemplatesDBService from '../database/service/emailTemplates.dbservice'
import RedisCache from '../utils/cache';
import { cache } from '../config/constants';

const { emailPrefix } = cache;

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
 async function sendEmailTemplate(data, emailVariables, tripId = '') {
  // const methodName = '[sendEmailTemplate]';
  try {
    let html; 
    let filePath = '';
    if (data && data.filePath) {
      filePath = data.filePath;
    }
    const emaildata = await RedisCache.get(`${emailPrefix}`, data.type);
    let emailTempalte = JSON.parse(emaildata);
    if (!emailTempalte) {
      emailTempalte = await emailTemplatesDBService.getTemplateByType({ 'type':data.type})
    }
    const subject = emailTempalte.subject + tripId;
    html = emailTempalte.htmlDescription;
    Object.keys(emailVariables).forEach((variable) => {
      const replaceVariable = `[${variable}]`;
      html = html.split(replaceVariable).join(emailVariables[variable]);
    });
    const mailData = {
      from,
      to: data.email,
      subject,
      html,
      attachment: filePath
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
