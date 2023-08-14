import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class Organization extends Model {
  public id: number;
}

Organization.init({
  organizationId: {
    type: DataTypes.STRING,
    unique: true
  },
  organizationName: {
    type: DataTypes.STRING(100),
    unique: true
  },
  organizationInfo: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  modelName: 'organizations',
  tableName: 'organizations',
  sequelize,
  timestamps: true
});

export default Organization;
