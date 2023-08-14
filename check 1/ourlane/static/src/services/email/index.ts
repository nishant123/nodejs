import EmailTemplateDBService from '../../database/service/emailTemplate.dbService';
import { cache } from '../../config/constants';
import { vars } from '../../config/vars';
import RedisCache from '../../utils/cache';
import EmailSender from '../../utils/email';

const { emailPrefix } = cache;
const { frontendHost } = vars;
const emailKey = 'emailList';

export default class EmailService {

    static async loadEmailTemplateToRedis(emailType = null) {
        if(!emailType) {
            return await this.addEmailTemplateInRedis();
        } else {
            const emailList = await EmailTemplateDBService.getAllEmailTemplates();
            let emailTemplate = null;
            emailList.forEach((email: any) => {
                const { type, ...rest } = email;
                if (emailType && type === emailType) {
                    emailTemplate = rest;
                }
                RedisCache.set(emailPrefix, type, JSON.stringify(rest));
            });
            return emailList;
        }
    }

    static async addEmailTemplateInRedis() {
        const list = await RedisCache.get(`${emailPrefix}`, emailKey);
        if (list && list.length) {
          return JSON.parse(list);
        } else {
            const emailList = await EmailTemplateDBService.getAllEmailTemplates();
            emailList.forEach((email: any) => {
                const { type, ...rest } = email;
                // RedisCache.set(emailPrefix, type, JSON.stringify(rest));
            });
            return emailList;
        }
    }
}
