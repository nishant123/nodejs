import * as Excel from 'exceljs';
import * as moment from 'moment';
import UserDBService from '../../database/service/user.dbservice';
import AuthDBService from '../../database/service/auth.dbservice'
import CustomError from '../../utils/error';
import { errorManager } from '../../config/errorManager';
import { vars } from '../../config/vars';
import {  roles,liveFeed } from '../../config/constants';
import ExcelService from '../../utils/excel';
import FileService from '../../utils/file';
import * as randomstring from 'randomstring';
import emailService from '../../utils/emailService';
import NotificationDBService from '../../database/service/notification.dbservice';
import * as fs from 'fs'
const {
  s3
} = vars;
const { localhost, conciergeHost, salt } = vars;
const serviceName = '[UserService]';

export default class UserService {
  static async getUserList(userDetails: string, body: {
    searchByName?: string
    roles?: any
    accountStatus?: any,
    lastUpdated?: any,
    accountCreated?: any,
    pageNumber: number,
    perPage: number,
    forWatchers: boolean,
    condition: object
  }) {
    const result = await UserDBService.getUserList(userDetails, body);
    const inActiveuser = await UserDBService.getInAciveCount({
      organizationId: "ourlane",
      isActive: false,
      isDeleted: true,
      roles:body.roles
    })
    const requestedUser = await UserDBService.getRequestedCount({
      organizationId: "ourlane",
      isActive: false,
      isDeleted: false,
      roles:body.roles
    })
    result['inActiveuser'] = inActiveuser.count;
    result['requestedUser'] = requestedUser.count;
    return result;
  }

  static async updateUser(userDetails, data, files) {
    try {
      let obj = {
        uuid: userDetails.uuid
      }
      const user = await UserDBService.fetchByUserId(obj);
      if (!user) {
        throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
      }
      const body = Object.assign({}, data);
      if (files) {
        for (const obj in files) {
          const { path, originalFilename } = files[obj];
          const imageData = fs.readFileSync(path);
          const ext = originalFilename.substr(originalFilename.lastIndexOf('.'));
          const newFilename = `HT_${Date.now() + randomstring.generate({ length: 8 })}${ext}`;
          const imageUrl = await FileService.uploadFiles(newFilename, imageData);
          if (imageUrl) {
            body[obj] = newFilename;
          }
          else {
            throw new CustomError({ serviceName, ...errorManager.FILE_NOT_UPLOADED });
          }
        }
      }
      const updateUser = UserDBService.updateUser(body, {
        uuid: user.uuid,
      });
      return updateUser;
    }
    catch (error) {
      throw error;
    }
  }

  static async downloadUserList(userDetails: string, body: {
    searchByName?: string
    roles?: any
    accountStatus?: any,
    lastUpdated?: any,
    accountCreated?: any,
  }): Promise<Excel.Workbook> {
    const result = await UserDBService.downloadUserList(userDetails, body);
    const headers: any[] = [
      {
        field: 'fullName', width: 30, name: 'Full Name'
      },
      {
        field: 'loginId', width: 40, name: 'Email'
      },
      {
        field: 'role', width: 30, name: 'User Role'
      },
      {
        field: 'status', width: 20, name: 'User Status'
      },
      {
        field: 'updatedAt', width: 20, name: 'Last Updated At '
      },
      {
        field: 'createdAt', width: 20, name: 'Created At'
      },
      {
        field: 'uuid', width: 70, name: 'User ID'
      }
    ];
    const data = result.map((r: any) => {
      const { isDeleted, isActive } = r;
      let status = 'Active';
      if (!isDeleted && !isActive) {
        status = 'Blocked';
      }
      else if (isDeleted) {
        status = 'Deleted';
      }
      return {
        fullName: `${r.firstName} ${r.lastName}` || '',
        loginId: r.loginId || '',
        role: r.role || '',
        status: status || '',
        updatedAt: moment(r.updatedAt).format('DD/MM/YYYY') || '',
        createdAt: moment(r.createdAt).format('DD/MM/YYYY') || '',
        uuid: r.uuid || ''
      };
    });
    return ExcelService.createExcel(headers, data, { sheetName: 'userList.xls' });
  }

  static async fetchByUserId(userDetails) {
    let obj = {
      uuid: userDetails.uuid
    }
    const user = await UserDBService.fetchByUserId(obj);
    if (user) {
      if (user.role === 'DRIVER') {
        const tripData = await UserDBService.getDriverRating(user.id);
        let averageRating = 0;
        let totalKms =0;
        let totalMinutesOnline =0 ;
        let completedTrips = 0;
        let allTrips = 0;
        tripData.rows.forEach(trip => {
          const driverData = trip.dataValues.driverData;
          let totalRatingGivenCustomers = 0;
          let totalRatings = 0;
          allTrips = driverData.length; 
          driverData.forEach(data => {
            if (data.status == "Completed") {
              completedTrips = completedTrips + 1;
              if (data.ratingDriver) {
                totalRatingGivenCustomers = totalRatingGivenCustomers + 1;
                totalRatings = totalRatings + parseInt(data.ratingDriver)
              }

              if(data.totalKms){
                totalKms = totalKms + parseInt(data.totalKms)
                }
  
              if(data.totalTimeInMinute){
                totalMinutesOnline = totalMinutesOnline + parseInt(data.totalTimeInMinute)
                  }  
      
            }
          });
          averageRating = totalRatings / totalRatingGivenCustomers;
        });
        user.avgDriverRating = averageRating;
        user.totalKms = totalKms;
        user.totalMinutesOnline = totalMinutesOnline;
        user.allTrips = allTrips; 
        user.completedTrips = completedTrips;

      }
      return user
    } else {
      throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
    }
  }

  static async deleteUser(userDetails, body) {
    const reqBody = { ...body };
    let obj = {
      uuid: reqBody.uuid
    }
    const user = await UserDBService.fetchByUserId(obj);
    if (user) {
      let body = {
        isActive: false,
        isDeleted: true,
        updatedBy: userDetails['loginId']
      }
      const updateUser = UserDBService.updateUser(body, {
        uuid: reqBody.uuid,
      });
    
      if(updateUser){
        const superAdmin =  await AuthDBService.getAdmin({"role":roles.SUPER_ADMIN })
     if(superAdmin.rows.length > 0){
      const data1 = { email: superAdmin.rows[0].loginId , type: 'WebAdminDeletion' };
      const emailVariables = {
        SUPER_ADMIN:superAdmin.rows[0].fullName,
        ADMIN : user.fullName,
        LOCALHOST: localhost
             };
      emailService(data1, emailVariables);
        }
      }
      return updateUser;
    } else {
      throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
    }
  }

//ADMIN CAN DELETE MULTIPLE USER AT A TIME
  static async deletemultipleUser(userData) {
    if (userData.length  === 0) {
       throw new CustomError({ serviceName, ...errorManager.INVALID_USER });
    }
    for (let i = 0; i < userData.length; i++) {
      let objuser = {
        uuid: userData[i]
      }
      const result = await UserDBService.fetchByUserId(objuser);
      if (!result) {
         throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
      }
      await UserDBService.deleteUser(userData[i]);
    }
    return 'Users Deleted Successfully';
  }
  
  static async approveUser(userDetails, body) {
    const reqBody = { ...body };
    let obj = {
      uuid: reqBody.uuid
    }
    const user = await UserDBService.fetchByUserId(obj);
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
    }
    if (user.isActive) {
      throw new CustomError({ serviceName, ...errorManager.USER_ACCOUNT_ALREADY_ACTIVATED });
    }
      let updateObj = {
        isActive: true,
        updatedBy: userDetails['loginId']
      }

      const object = {
      name : 'addAdmin',
      message :  `Congratulations, ${user.fullName} account has been successfully created. Welcome to Ourlane!`,
      userId : userDetails['id'],
      type : liveFeed.NOTIFICATION
      }

       const [ updateUser, saveNotification] = await Promise.all([
        UserDBService.updateUser(updateObj, { uuid: reqBody.uuid }),
        NotificationDBService.createNotification(object)
      ]);
      const email = user['loginId'];
      let data,host;
      if(user.role == roles.CONCIERGE) {
        host = conciergeHost;
        data = { email, type: 'Concierge_request_approved' };
      } else {
        host = localhost;
        data = { email, type: 'adminAccessApproval' };
      }
    const link = `${host}/login`;
    const emailVariables = {
      USER_NAME: user['fullName'],
      LINK: link,
      LOCALHOST: host
    };
    emailService(data, emailVariables);
    return updateUser;
  }

  static async declineUser(body) {
    const reqBody = { ...body };
    let obj = {
      uuid: reqBody.uuid
    }
    const user = await UserDBService.fetchByUserId(obj);
    if (!user) {
      throw new CustomError({ serviceName, ...errorManager.NO_USER_FOUND });
    }
    const updateUser = UserDBService.declineUser({
      uuid: reqBody.uuid,
    });
   
    if(updateUser){
      let data1, host;
      if(user.role == roles.CONCIERGE) {
        host = conciergeHost;
        data1 = { email: user.loginId, type: 'Concierge_request_rejected' };
      } else {        
        host = localhost;
        data1 = { email: user.loginId, type: 'adminAccessRejection' };
      }    
    const emailVariables =  { ADMIN : user.fullName, LOCALHOST: host };
    emailService(data1, emailVariables);
    }
    return updateUser;
  }

 // GET ALL DRIVER
  static async getDriver() {
    return UserDBService.getDriver();
  }

   // GET ALL ADMIN
  static async getAdmin() {
    return UserDBService.getAdmin();
  }


}
