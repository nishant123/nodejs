import {
    Model, DataTypes
    } from 'sequelize';
    import sequelize from '../connection';
    import Users from './users.model';
    import { applicationStatuses } from '../../config/constants';
    
    class Driver extends Model {
    public id: number;
    
    public static associations: {
    // projects: Association<User, Data>;
    };
    }
    
    Driver.init({
    uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
    },
    locationName: {
    type: DataTypes.STRING(100)
    },
    addressLatitude: {
    type: DataTypes.FLOAT
    },
    addressLongitude: {
    type: DataTypes.FLOAT
    },
    isOnlineStatus: {
    type: DataTypes.ENUM,
    defaultValue: 'Unassigned',
    values: Object.values(applicationStatuses.isOnlineStatus)
    },
    status: {
    type: DataTypes.ENUM,
    defaultValue: 'Active',
    values: Object.values(applicationStatuses.status)
    },
    }, {
    modelName: 'driver',
    tableName: 'driver',
    sequelize,
    timestamps: true
    });
    Driver.belongsTo(Users, {
    as: 'driver_code',
    onDelete: 'CASCADE',
    foreignKey: 'userId'
    });
    export default Driver;