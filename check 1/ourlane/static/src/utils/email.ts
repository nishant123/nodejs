import * as Mailgun from 'mailgun-js';
import { vars } from '../config/vars';

const emailTemplate = {};

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

export default class EmailSender {
    static send(data) {
        data.from = from;
        return new Promise((resolve) => {
            mailGun.messages().send(data, (err) => {
                if (err) {
                    return resolve(false);
                }
                return resolve(true);
            });
        });
    }
}
