
import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';

class ManagePages extends Model {
  public id: number;
}

ManagePages.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  pageTitle: {
    type: DataTypes.STRING(100)
  },
  description: {
    type: DataTypes.STRING(400)
  },
  title: {
    type: DataTypes.STRING
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  modelName: 'managePages',
  tableName: 'managePages',
  sequelize,
  timestamps: true
});

export default ManagePages;
