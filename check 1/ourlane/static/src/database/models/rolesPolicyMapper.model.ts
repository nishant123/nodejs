
import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class RolesPolicyMapper extends Model {
  public id: number;
}

RolesPolicyMapper.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  policyName: {
    type: DataTypes.STRING(100)
  },
  roleName: {
    type: DataTypes.STRING(50)
  }
}, {
  modelName: 'rolesPolicyMapper',
  tableName: 'rolesPolicyMapper',
  sequelize,
  timestamps: true
});

export default RolesPolicyMapper;
