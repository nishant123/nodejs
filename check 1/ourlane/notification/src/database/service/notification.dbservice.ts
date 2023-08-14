import db from '..';
import { BaseDbService } from './base.dbservice';
const { NotificationModel } = db;

import { Op, Sequelize, QueryTypes } from 'sequelize';

const serviceName = '[NotificationDBService]';

export default class NotificationDBService extends BaseDbService {


    // CREATE LIVE FEED
    static createlive(data: {
      name: string;
      message: string;
      type?: string;
      userId?: string;
      tripType?: string;
    }) {
        return NotificationModel.create(data);
    }

    static createNotification(data: {
      name  ?: string,
      message ?: string,
      userId ?: string,
      type  ?: string
    }) {
      return NotificationModel.create(data);
    }
  
  // GET LIVE FEED LIST IN ADMIN DASHBOARD 
      static liveFeed( options: {
        pageNumber ?: number,
        perPage ?: number,
        type ?: string
      }) {

        let {
           pageNumber, perPage,type
        } = options;
         
        if(!pageNumber){
          pageNumber = 1
        }

        if(!perPage){
          perPage = 10
        }

        if(!type)
        {
          type = 'liveFeed'
        }

        return NotificationModel.findAndCountAll({
          where: {
            type: type,
            isDeleted :false
          },
          order: [
            ['id', 'DESC'],
            ],
            nest: true,
            offset: +perPage * (+pageNumber - 1),
            limit: +perPage
        });
      }

      static async declineNotification(options: {
        uuid  ?: string
      }) {
        return NotificationModel.destroy(
          {
            where: options
          }
        );
      }

      static fetchByNotificationId(options: {
        uuid: string
      }) {
        return NotificationModel.findOne({
          where: options,
          raw: true,
          nest: true
        });
      }

     
    static async updateNotificationByUUID(options,uuid: { 
      uuid  : string }) {
      return NotificationModel.update(options, {
        where: uuid
      });
    }

    static async getuserNotification(userDetails, readStatus) {
      return NotificationModel.findAndCountAll({
        where: {
          type: null,
          userId: userDetails.id,
          isDeleted: false,
          isRead: readStatus
        },
        order: [
          ['id', 'DESC'],
        ],
        nest: true,
      });
    }

    static async updateUserNotification(options, userId: number) {
      return NotificationModel.update(options, {
        where: {
          userId: userId,
          isRead: 0
        }
      });
    }
      
   
}