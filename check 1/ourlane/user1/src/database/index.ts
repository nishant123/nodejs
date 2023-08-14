import { Sequelize } from 'sequelize';
import sequelize from './connection';
import OrganizationModel from './models/organizations.model';
import RoleModel from './models/applicationRoles.model';
import UserModel from './models/users.model';
import OtpModel from './models/otp.model';
import ApiModel from './models/applicationApis.model';
import PolicyModel from './models/applicationPolicies.model';
import ApiPolicyMapperModel from './models/policyApiMapper.model';
import RolePolicyMapperModel from './models/rolesPolicyMapper.model';
import PasswordLogsModel from './models/passwordLogs.model';
import RefreshModel from './models/refreshToken.model';
import TripModel from './models/trip.model';
import NotificationModel from './models/notification.model';
import VerificationModel from './models/verification.model';
import DriverModel from './models/driver.model';
import CustomerModel from './models/customer.model';
import EmailTemplatesModel from './models/emailTemplates.model';



const db = {
  sequelize,
  Sequelize,
  OrganizationModel,
  RoleModel,
  UserModel,
  OtpModel,
  ApiModel,
  PolicyModel,
  ApiPolicyMapperModel,
  RolePolicyMapperModel,
  PasswordLogsModel,
  RefreshModel,
  TripModel,
  NotificationModel,
  VerificationModel,
  DriverModel,
  CustomerModel,
  EmailTemplatesModel
};

export default db;
