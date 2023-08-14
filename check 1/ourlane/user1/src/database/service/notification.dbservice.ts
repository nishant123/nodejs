import db from '..';
import { BaseDbService } from './base.dbservice';
const { NotificationModel } = db;

const serviceName = '[NotificationDBService]';

export default class NotificationDBService extends BaseDbService {


    // CREATE LIVE FEED
    static createlive(data: {
      name: string;
      message: string
    }) {
        return NotificationModel.create(data);
    }

    static createNotification(data: {
      name  ?: string,
      message?: string,
      userId ?: string,
      type ?: string
    }) {
      return NotificationModel.create(data);
    }
  
  // GET LIVE FEED LIST IN ADMIN DASHBOARD 
      static liveFeed() {
        return NotificationModel.findAll({
          order: [
            ['id', 'DESC'],
            ],
            limit: 10,
          raw: true,
          nest: true
        });
      }
   
}