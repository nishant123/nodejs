import {
    Model, DataTypes
  } from 'sequelize';
  import sequelize from '../connection';

  
  class EmailTemplates extends Model {
    public id: number;
  }
  
  EmailTemplates.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    type: {
      type: DataTypes.STRING(150),
    },
    subject: {
      type: DataTypes.STRING(150),
    },
    htmlDescription: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.BOOLEAN
    }
  }, {
    modelName: 'emailTemplates',
    tableName: 'emailTemplates',
    sequelize,
    underscored: false,
    timestamps: true
  });
 
 
  export default EmailTemplates;
  