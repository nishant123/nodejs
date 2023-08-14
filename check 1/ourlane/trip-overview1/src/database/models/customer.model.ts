import {
    Model, DataTypes
} from 'sequelize';
import sequelize from '../connection';
import Users from './users.model';
import { applicationStatuses } from '../../config/constants';

class Customer extends Model {
    public id: number;

    public static associations: {
        // projects: Association<User, Data>;
    };
}

Customer.init({
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
    modelName: 'customer',
    tableName: 'customer',
    sequelize,
    timestamps: true
});
Customer.belongsTo(Users, {
    as: 'customerData',
    onDelete: 'CASCADE',
    foreignKey: 'userId'
});

export default Customer;
