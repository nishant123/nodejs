import db from '..';

const { CustomerModel } = db;
const serviceName = '[CustomerDBService]';

export default class CustomerDBService {
  // CREATE ADDRESS
  static createCustomer(data: {
    uuid: string,
    locationName: string;
    addressLatitude: string;
    addressLongitude: string;
    userId: number;
  }) {
    return CustomerModel.create(data);
  }

}