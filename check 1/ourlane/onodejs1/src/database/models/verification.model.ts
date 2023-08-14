
import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import Users from './users.model';

class VerificationCode extends Model {
  public id: number;
}

VerificationCode.init({
  verificationCode: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  modelName: 'verificationCode',
  tableName: 'verificationCode',
  sequelize,
  timestamps: true
});

VerificationCode.belongsTo(Users, {
  as: 'users_code',
  onDelete: 'CASCADE',
  foreignKey: 'userId'
});

export default VerificationCode;
