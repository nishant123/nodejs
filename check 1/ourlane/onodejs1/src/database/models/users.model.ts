import {
  Model, DataTypes
} from 'sequelize';
import { toDefaultValue } from 'sequelize/types/lib/utils';
import sequelize from '../connection';

import ApplicationRoles from './applicationRoles.model';
import Organizations from './organizations.model';
import Trip from './trip.model';

class Users extends Model {
  public id: number;
  // public name: string;
  // public preferredName: string | null;

  // // timestamps!
  // // public readonly createdAt!: Date;
  // // public readonly updatedAt!: Date;

  public static associations: {
    // projects: Association<User, Data>;
  };
}

Users.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true
  },
  fullName: {
    type: DataTypes.STRING(50)
  },
  countryCode: {
    type: DataTypes.STRING(20)
  },
  mobileNumber: {
    type: DataTypes.STRING(20),
    unique: true
  },
  loginId: {
    type: DataTypes.STRING(50),
    unique: true
  },
  lastLoginTime: {
    type: DataTypes.DATE
  },
  password: {
    type: DataTypes.STRING(100)
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isOtpVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  profileImage: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING(50),
  },
  language: {
    type: DataTypes.STRING(50),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  loginAttempts: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
  deviceType: {
    type: DataTypes.STRING
  },
  firebaseDeviceId: {
    type: DataTypes.STRING
  },
  /* HA-1782*/
  dashboardTheme: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
}, {
  modelName: 'users',
  tableName: 'users',
  sequelize,
  timestamps: true
});

Users.belongsTo(Organizations, {
  onDelete: 'CASCADE',
  foreignKey: 'organizationId',
  targetKey: 'organizationId',
  as: 'organizations'
});

Users.belongsTo(ApplicationRoles, {
  foreignKey: 'role',
  targetKey: 'roleName',
  as: 'application_roles'
});

Users.belongsTo(Users, {
  foreignKey: 'updatedBy',
  targetKey: 'loginId',
  as: 'updated_by'
});

Trip.belongsTo(Users, {
  foreignKey: 'driverId',
  targetKey: 'id',
  as: 'driver_details'
});

Users.hasMany(Trip, {
  onDelete: 'CASCADE',
  foreignKey: "driverId",
  sourceKey: 'id',
  as: 'driverData'
});

Users.hasMany(Trip, {
  onDelete: 'CASCADE',
  foreignKey: "customerId",
  sourceKey: 'id',
  as: 'customerData'
});

Trip.belongsTo(Users, {
  foreignKey: 'customerId',
  targetKey: 'id',
  as: 'customer_details'
});

export default Users;
