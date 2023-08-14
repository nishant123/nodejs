
import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import Policies from './applicationPolicies.model';
import Apis from './applicationApis.model';

class PolicyApiMapper extends Model {
  public id: number;
}

PolicyApiMapper.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  }
}, {
  modelName: 'policyApiMapper',
  tableName: 'policyApiMapper',
  sequelize,
  timestamps: true
});

PolicyApiMapper.belongsTo(Apis, {
  as: 'application_apis',
  onDelete: 'CASCADE',
  foreignKey: 'apiId',
  targetKey: 'apiId'
});

PolicyApiMapper.belongsTo(Policies, {
  as: 'application_policies',
  onDelete: 'CASCADE',
  foreignKey: 'policyName',
  targetKey: 'policyName'
});

export default PolicyApiMapper;
