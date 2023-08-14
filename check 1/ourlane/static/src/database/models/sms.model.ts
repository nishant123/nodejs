import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class SmsModel extends Model {
  public id: number;
  public type: string;
  public body: string;

}

SmsModel.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  type: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT,
  }
}, {
  modelName: 'sms',
  tableName: 'sms',
  sequelize,
  timestamps: true
});

export default SmsModel;