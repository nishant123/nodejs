import {
    Model, DataTypes
  } from 'sequelize';
  import sequelize from '../connection';
  import { applicationStatuses } from '../../config/constants';
  
  class CarType extends Model {
    public id: number;
    
  
    public static associations: {
      // projects: Association<User, Data>;
    };
  }
  
  CarType.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    carTypeName: {
        type: DataTypes.STRING,
      },
    bookingFee: {
      type: DataTypes.INTEGER
    },
    pricePerHour: {
      type: DataTypes.INTEGER
    },
    pricePerHourKM: {
      type: DataTypes.INTEGER
    },
    pricePerMin: {
        type: DataTypes.INTEGER
      },
    addDescription: {
        type: DataTypes.TEXT
      },
    status: {
      type: DataTypes.ENUM,
      defaultValue: 'Active',
      values: Object.values(applicationStatuses.status)
    },
    carImage: {
        type: DataTypes.STRING
      },
    car3dImage:{
      type: DataTypes.STRING
    }
  }, {
    modelName: 'cartype',
    tableName: 'cartype',
    sequelize,
    timestamps: true
  });
  
  
  export default CarType;
  
  