const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');
const rawUsers = require('./user.json');

const salt = process.env.SALT;

module.exports = {
  /*
  This function will seed all the required data in the OAuthClients table
 */
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    const users = [];

    rawUsers.forEach((obj) => {
      users.push({
        uuid: uuidv1(),
        fullName: obj.fullName,
        mobileNumber: obj.mobileNumber,
        loginId: obj.loginId,
        isEmailVerified: obj.isEmailVerified,
        isActive: obj.isActive,
        isDeleted: obj.isDeleted,
        password: bcrypt.hashSync(obj.password, salt),
        role: obj.role,
        organizationId: obj.organizationId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    return queryInterface.bulkInsert( 'users', users,{});

  
  },

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
  }
};
