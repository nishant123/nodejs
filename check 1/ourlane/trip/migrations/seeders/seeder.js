const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');
const rawApis = require('./apis.json');
const rawPolicy = require('./policy.json');
const rawRoles = require('./roles.json');



const salt = process.env.SALT;

module.exports = {
  /*
  This function will seed all the required data in the OAuthClients table
 */
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    const apis = [];
    const polices = [];
    const roles = [];
    const policyAPIMapper = [];
    const rolesPolicyMapper = [];
  


   
    rawPolicy.forEach((obj) => {
      polices.push({
        policyName: obj.policyName,
        policyDescription: obj.policyDescription,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    queryInterface.bulkInsert('applicationPolicies', polices, {});

    rawApis.forEach((obj) => {
      apis.push({
        uuid: uuidv1(),
        apiId: obj.apiId,
        apiEndpoint: obj.apiEndpoint,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      obj.policyName.forEach((policy) => {
        policyAPIMapper.push({
          uuid: uuidv1(),
          policyName: policy,
          apiId: obj.apiId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });
    console.log("policy_api_mapper---->", policyAPIMapper)
    queryInterface.bulkInsert('applicationApis', apis, {});
    queryInterface.bulkInsert('policyApiMapper', policyAPIMapper, {});

    rawRoles.forEach((obj) => {
      const roleObj = {
        roleName: obj.roleName,
        roleDesc: obj.roleDesc,
        assignedPolicyCount: obj.policy.length,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      if (obj.organizationId) {
        roleObj.organizationId = obj.organizationId;
      }
      roles.push(roleObj);
      obj.policy.forEach((policy) => {
        rolesPolicyMapper.push({
          uuid: uuidv1(),
          policyName: policy,
          roleName: obj.roleName,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    });
    queryInterface.bulkInsert('applicationRoles', roles, {});
     return queryInterface.bulkInsert('rolesPolicyMapper', rolesPolicyMapper, {});


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
