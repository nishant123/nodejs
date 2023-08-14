import { Sequelize } from 'sequelize';
import sequelize from './connection';
import OrganizationModel from './models/organizations.model';
import RoleModel from './models/applicationRoles.model';
import UserModel from './models/users.model';
import ApiPolicyMapperModel from './models/policyApiMapper.model';
import RolePolicyMapperModel from './models/rolesPolicyMapper.model';
import RefreshModel from './models/refreshToken.model';
import CarModel from './models/car.model';
import SavedPlacesModel from './models/savedPlaces.model';
import DriverModel from './models/driver.model';
import CustomerModel from './models/customer.model';
import CustomerSendStatusModel from './models/customerSendStatus.model';
import TripModel from './models/trip.model';
import NotificationModel from './models/notification.model';
import Logs from './models/logs.model';
import EmailTemplatesModel from './models/emailTemplates.model';
import CarTypeModel from './models/carType.model';

const db = {
  sequelize,
  Sequelize,
  OrganizationModel,
  RoleModel,
  UserModel,
  ApiPolicyMapperModel,
  RolePolicyMapperModel,
  RefreshModel,
  CarModel,
  CarTypeModel,
  SavedPlacesModel,
  DriverModel,
  CustomerModel,
  CustomerSendStatusModel,
  TripModel,
  NotificationModel,
  Logs,
  EmailTemplatesModel
};

export default db;
