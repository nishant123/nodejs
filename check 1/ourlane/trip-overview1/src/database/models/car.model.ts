import {
  Model, DataTypes
} from 'sequelize';
import sequelize from '../connection';
import Users from './users.model';
import { applicationStatuses } from '../../config/constants';
import Driver from './driver.model';

class Car extends Model {
  public id: number;

  public static associations: {
    // projects: Association<User, Data>;
  };
}

Car.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  carNumber: {
    type: DataTypes.STRING(50),
  },
  carModel: {
    type: DataTypes.STRING(50)
  },
  carCapacity: {
    type: DataTypes.STRING(50)
  },
  carFactor: {
    type: DataTypes.STRING(50)
  },
  carOdometer: {
    type: DataTypes.STRING(50)
  },
  driverName: {
    type: DataTypes.STRING(50)
  },
  driverId: {
    type: DataTypes.INTEGER
  },
  carImage: {
    type: DataTypes.STRING
  },
  bookingFees: {
    type: DataTypes.INTEGER
  },
  pricePerKilometer: {
    type: DataTypes.INTEGER
  },
  pricePerminute: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.ENUM,
    defaultValue: 'Active',
    values: Object.values(applicationStatuses.status)
  },
  addDescription: {
    type: DataTypes.TEXT
  },
  car3dImage:{
    type: DataTypes.STRING
  },
  carTypeId: {
    type: DataTypes.INTEGER
  },
}, {
  modelName: 'car',
  tableName: 'car',
  sequelize,
  timestamps: true
});


export default Car;

