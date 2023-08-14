import { Sequelize } from 'sequelize';
import sequelize from './connection';
import NotificationModel from './models/notification.model';
import UserModel from './models/users.model';


const db = {
  sequelize,
  Sequelize,
  UserModel,
  NotificationModel
};

export default db;
