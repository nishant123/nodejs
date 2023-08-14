
import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class ApplicationPolicies extends Model {
  public id: number;
}

ApplicationPolicies.init({
  policyName: {
    type: DataTypes.STRING(100),
    unique: true
  },
  policyDescription: {
    type: DataTypes.TEXT
  }
}, {
  modelName: 'applicationPolicies',
  tableName: 'applicationPolicies',
  sequelize,
  timestamps: true
});

export default ApplicationPolicies;
