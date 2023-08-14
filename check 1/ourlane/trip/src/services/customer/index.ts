import CustomerDBService from "../../database/service/customer.dbservice";
import CustomError from "../../utils/error";
import { errorManager } from "../../config/errorManager";
import { v4 as uuid_v4 } from "uuid";
import { applicationStatuses } from "../../config/constants";
import UserDBService from '../../database/service/user.dbservice';
import { roles } from '../../config/constants';


const serviceName = "[CustomerService]";

export default class CustomerService {
  
  static async updateCustomerLocation(option, userId) {
    const customer = await CustomerDBService.getCustomerById({
      userId: userId
    });
    if (!customer) {
      throw new CustomError({ serviceName, ...errorManager.NO_CUSTOMER_FOUND });
    }
    const param = {
      locationName: option.locationName,
      addressLatitude: option.addressLatitude,
      addressLongitude: option.addressLongitude
    };
    const customerstatus = await CustomerDBService.updateDriverStatus(param, userId);
    return customerstatus;
  }

  static async getUpdatedCustomerLocation(userId) {
    const customer = await CustomerDBService.getCustomerById({
      userId: userId
    });
    if (!customer) {
      throw new CustomError({ serviceName, ...errorManager.NO_CUSTOMER_FOUND });
    }
    return customer;
  }
  
}
