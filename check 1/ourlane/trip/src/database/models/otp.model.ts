import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import Users from './users.model';

class Otp extends Model {
  public id: number;
}

Otp.init({
  otp: {
    type: DataTypes.INTEGER
  },
  type: {
    type: DataTypes.STRING(20)
  },
  requestId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  modelName: 'otp',
  tableName: 'otp',
  sequelize,
  timestamps: true
});


Otp.belongsTo(Users, {
  as: 'users_otp',
  onDelete: 'CASCADE',
  foreignKey: 'userId'
});

export default Otp;
