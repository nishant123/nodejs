
import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class ApplicationMenu extends Model {
  public id: number;
}

ApplicationMenu.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  menuName: {
    type: DataTypes.STRING(100)
  },
  displayName: {
    type: DataTypes.STRING(100)
  },
  rootParent: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  modelName: 'applicationMenu',
  tableName: 'applicationMenu',
  sequelize,
  timestamps: true
});

export default ApplicationMenu;
