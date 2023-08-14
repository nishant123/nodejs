import {
    Model, DataTypes
  } from 'sequelize';
  import sequelize from '../connection';
  
  class PasswordLogs extends Model {
    public id: number;
  }
  
  PasswordLogs.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    userId: {
      type: DataTypes.STRING(50)
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    modelName: 'passwordLogs',
    tableName: 'passwordLogs',
    sequelize,
    timestamps: true
  });
  
  export default PasswordLogs;
  