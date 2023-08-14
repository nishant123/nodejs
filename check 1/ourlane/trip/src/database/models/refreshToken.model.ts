
import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import User from './users.model';

class RefreshToken extends Model {
  public id: number;
}

RefreshToken.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  token: {
    type: DataTypes.TEXT
  },
  accessToken: {
    type: DataTypes.TEXT
  }
}, {
  modelName: 'refreshToken',
  tableName: 'refreshToken',
  sequelize,
  timestamps: true
});

RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export default RefreshToken;
