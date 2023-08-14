
import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class ApplicationApis extends Model {
  public id: number;
}

ApplicationApis.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  apiId: {
    type: DataTypes.STRING(50),
    unique: true
  },
  apiEndpoint: {
    type: DataTypes.STRING(100)
  }
}, {
  modelName: 'applicationApis',
  tableName: 'applicationApis',
  sequelize,
  timestamps: true
});

export default ApplicationApis;
