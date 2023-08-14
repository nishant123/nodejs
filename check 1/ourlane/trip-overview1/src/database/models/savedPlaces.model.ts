import {
    Model, DataTypes
  } from 'sequelize';
  import sequelize from '../connection';
  import Users from './users.model';
  
  class SavedPlaces extends Model {
    public id: number;
  
    public static associations: {
      
    };
  }
  
  SavedPlaces.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    customerId: {
      type: DataTypes.STRING(150)
    },
    locationType: {
      type: DataTypes.STRING(50)
    },
    endLocationName: {
      type: DataTypes.STRING
    },
    endLat: {
      type: DataTypes.FLOAT
    },
    enLong: {
      type: DataTypes.FLOAT
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    modelName: 'savedPlaces',
    tableName: 'savedPlaces',
    sequelize,
    timestamps: true
  });
  export default SavedPlaces;
  
  