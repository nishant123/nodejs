import { Sequelize } from 'sequelize';
import sequelize from './connection';
import ApiModel from './models/applicationApis.model';
import MenuModel from './models/applicationMenu.model';
import PolicyModel from './models/applicationPolicies.model';
import LanguageModel from './models/language.model';
import CityModel from './models/cities.model';
import PaymentTypeModel from './models/paymentType.model'
import ApiPolicyMapperModel from './models/policyApiMapper.model';
import RolePolicyMapperModel from './models/rolesPolicyMapper.model';
import  EmailTemplatesModel  from './models/emailTemplates.model';
import ManagePages from './models/managePages.model';
import SmsModel from './models/sms.model';

const db = {
  sequelize,
  Sequelize,
  ApiModel,
  MenuModel,
  PolicyModel,
  LanguageModel,
  CityModel,
  PaymentTypeModel,
  ApiPolicyMapperModel,
  RolePolicyMapperModel,
  EmailTemplatesModel,
  ManagePages,
  SmsModel
};

export default db;
