import { Sequelize } from 'sequelize';
import sequelize from './connection';
import NotificationModel from './models/notification.model';
import UserModel from './models/users.model';
import CarModel from './models/car.model';
import CarTypeModel from './models/carType.model';
import DriverModel from './models/driver.model';
import EmailTemplatesModel from './models/emailTemplates.model';

const db = {
  sequelize,
  Sequelize,
  UserModel,
  NotificationModel,
  CarModel,
  CarTypeModel,
  DriverModel,
  EmailTemplatesModel
};

export default db;
