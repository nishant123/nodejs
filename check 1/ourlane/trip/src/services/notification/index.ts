import * as moment from 'moment';
import NotificationDBService from '../../database/service/notification.dbservice';
import CustomError from "../../utils/error";
import { errorManager } from "../../config/errorManager";


const serviceName = '[NotificationService]';

export default class NotificationService {
     // LIVE FEED IN ADMIN DASHBOARD
     static async liveFeed(query) {
      return NotificationDBService.liveFeed(query);
    }

    static async declineNotification(body) {
      const reqBody = { ...body };
      let obj = {
        uuid: reqBody.uuid
      }
      const notification = await NotificationDBService.fetchByNotificationId(obj);
      if (!notification) {
        throw new CustomError({ serviceName, ...errorManager.NOTIFICATION_NOT_FOUND });
      }
      const declineNotification = NotificationDBService.declineNotification({
        uuid: reqBody.uuid,
      });
      return declineNotification;
    }

    static async updateNotificationByUUID(body) {
      const reqBody = { ...body };
      let obj = {
        uuid: reqBody.uuid
      }
      const notification = await NotificationDBService.fetchByNotificationId(obj);
      if (!notification) {
        throw new CustomError({ serviceName, ...errorManager.NOTIFICATION_NOT_FOUND });
      }
     
      const customerstatus = await NotificationDBService.updateNotificationByUUID({ isRead : true }, obj);
      return customerstatus;
    }

    static async getuserNotification(userDetails, readStatus) {
      return NotificationDBService.getuserNotification(userDetails, readStatus);
    }

    static async deleteNotification(body) {
      const reqBody = { ...body };
      let obj = {
        uuid: reqBody.uuid
      }
      const notification = await NotificationDBService.fetchByNotificationId(obj);
      if (!notification) {
        throw new CustomError({ serviceName, ...errorManager.NOTIFICATION_NOT_FOUND });
      }
     
      const deletedstatus = await NotificationDBService.updateNotificationByUUID({ isDeleted : true }, obj);
      return deletedstatus;
    }

    static async updateUserNotification(userDetails) {
      return await NotificationDBService.updateUserNotification({ isRead : true }, userDetails.id);
    }
}