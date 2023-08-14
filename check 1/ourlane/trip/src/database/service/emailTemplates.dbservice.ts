import db from '..';
const {
 EmailTemplatesModel
} = db;

export default class emailTemplatesDBService {
  static getTemplateByType(options: {
    type : string,
  }) { 
    try {
    return EmailTemplatesModel.findOne({
      where: options,
      raw: true,
      nest: true
    });
    }
    catch (e) {
        console.log(e);
    }
  }

}
