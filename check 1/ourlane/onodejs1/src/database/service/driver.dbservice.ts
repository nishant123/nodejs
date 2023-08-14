import db from '..';

const { DriverModel } = db;
const serviceName = '[DriverDBService]';

export default class DriverDBService {
  // CREATE ADDRESS
  static createDriver(data: {
    uuid: string,
    locationName: string;
    addressLatitude: string;
    addressLongitude: string;
    userId: number;
  }) {
    return DriverModel.create(data);
  }

}