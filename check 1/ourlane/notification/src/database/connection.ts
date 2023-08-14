import { Sequelize } from 'sequelize';
import { vars } from '../config/vars';

const { mysql } = vars;
const {
  database, username, password, host, port
} = mysql;

const sequelize = new Sequelize(database, username, password, {
  dialect: 'mysql',
  host,
  port,
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  omitNull: true,
  define: {
    underscored: false,
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  },

  logging: false,

  // similar for sync: you can define this to always force sync for models
  sync: {
    force: false
  },

  // pool configuration used to pool database connections
  pool: {
    max: 50,
    min: 1,
    idle: 40000,
    acquire: 40000
  }
});

// WARNING : Never do force true
sequelize.sync({
  force: false
});

export default sequelize;
