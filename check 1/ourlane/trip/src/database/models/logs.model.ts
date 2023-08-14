import {
    Model, DataTypes
  } from 'sequelize';
  import sequelize from '../connection';
  import Users from './users.model';
  
  class Logs extends Model {
    public id: number;
  }
  
  Logs.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    eventName: {
      type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
     status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    modelName: 'logs',
    tableName: 'logs',
    sequelize,
    timestamps: true
  });
 
  Logs.belongsTo(Users, {
    onDelete: 'CASCADE',  
    foreignKey: 'userId',
    as: 'userDetails'
  });
  export default Logs;
  