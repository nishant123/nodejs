import db from '../index';

const { EmailTemplatesModel } = db;

export default class EmailTemplateDBService {
    static getAllEmailTemplates() {
        return EmailTemplatesModel.findAll({
            attributes: ['type', 'subject', 'htmlDescription', 'status'],
            raw: true,
            nest: true
        });
    }
}

