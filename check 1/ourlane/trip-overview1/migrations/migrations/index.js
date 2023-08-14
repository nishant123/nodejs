
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up(queryInterface, Sequelize) {
    return queryInterface.addConstraint('applicationRoles', ['organizationId', 'roleName'], {
      type: 'unique',
      name: 'organization_role_constraint'
    });
  },
  // eslint-disable-next-line no-unused-vars
  down(queryInterface, Sequelize) {

  }
};
