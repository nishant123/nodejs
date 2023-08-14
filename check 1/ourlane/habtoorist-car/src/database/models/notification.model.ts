import {
    Model, DataTypes
  } from 'sequelize';
  import sequelize from '../connection';
  import Users from './users.model';
  
  class Notification extends Model {
    public id: number;
  }
  
  Notification.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    name: {
      type: DataTypes.STRING(100),
    },
    message: {
      type: DataTypes.TEXT
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
     status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    type: {
      type: DataTypes.STRING
    },
    tripType: {
      type: DataTypes.STRING
    }
  }, {
    modelName: 'notification',
    tableName: 'notification',
    sequelize,
    timestamps: true
  });
 
  Notification.belongsTo(Users, {
    onDelete: 'CASCADE',  
    foreignKey: 'userId',
    as: 'userDetails'
  });
  export default Notification;
  