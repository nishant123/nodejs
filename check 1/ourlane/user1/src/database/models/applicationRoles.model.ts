import { Model, DataTypes } from 'sequelize';
import sequelize from '../connection';
import Organizations from './organizations.model';

class ApplicationRoles extends Model {
  public id: number;
}

ApplicationRoles.init(
  {
    roleName: {
      type: DataTypes.STRING(50)
    },
    roleDesc: {
      type: DataTypes.STRING(100)
    },
    assignedUserCount: {
      type: DataTypes.STRING(10),
      defaultValue: '0'
    },
    assignedPolicyCount: {
      type: DataTypes.STRING(10),
      defaultValue: '0'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    modelName: 'applicationRoles',
    tableName: 'applicationRoles',
    sequelize,
    timestamps: true,
    indexes: [
      {
        fields: ['roleName']
      }
    ]
  }
);

ApplicationRoles.belongsTo(
  Organizations,
  {
    as: 'organizations',
    onDelete: 'CASCADE',
    foreignKey: 'organizationId',
    targetKey: 'organizationId'
  }
);

export default ApplicationRoles;
