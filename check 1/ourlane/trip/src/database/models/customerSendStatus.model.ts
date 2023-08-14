import {
  Model, DataTypes
} from 'sequelize';
import sequelize from '../connection';
import { applicationStatuses } from '../../config/constants';

class CustomerSendStatus extends Model {
  public id: number;
}

CustomerSendStatus.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  tripId: {
    type: DataTypes.STRING(50)
  },
  receiverId: {
    type: DataTypes.STRING(50)
  },
  shareMethod: {
    type: DataTypes.ENUM,
    values: Object.values(applicationStatuses.shareMethods)
  },
  message: {
    type: DataTypes.TEXT
  }
}, {
  modelName: 'customerSendStatus',
  tableName: 'customerSendStatus',
  sequelize,
  timestamps: true
});

export default CustomerSendStatus;

