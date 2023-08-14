const uuidv1 = require('uuid/v1');
const bcrypt = require('bcryptjs');
const rawApis = require('./apis.json');
const rawPolicy = require('./policy.json');
const rawLanguages = require('./language.json');
const rawTemplates = require('./emailTemplates.json');
const rawManagePages = require('./managePages.json');
const rawCities = require('./cities.json');
const rawSms = require('./sms.json');

const salt = process.env.SALT;

module.exports = {
  /*
  This function will seed all the required data in the OAuthClients table
 */
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    const apis = [];
    const polices = [];
    const languages = [];
    const email = [];
    const policyAPIMapper = [];
    const emailTemplates = [];
    const managePages = [];
    const cities = [];
    const sms = [];

    rawLanguages.forEach((obj) => {
      languages.push({
        uuid: uuidv1(),
        language: obj.language,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    queryInterface.bulkInsert(
      'languages',
      languages,
      {}
    );

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
    queryInterface.bulkInsert('applicationApis', apis, {});
    queryInterface.bulkInsert('policyApiMapper', policyAPIMapper, {});

    rawTemplates.forEach((obj) => {
      emailTemplates.push({
        uuid: uuidv1(),
        type: obj.type,
        subject: obj.subject,
        htmlDescription: obj.htmlDescription,
        status: obj.status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    rawManagePages.forEach((obj) => {
      managePages.push({
        uuid: uuidv1(),
        pageTitle: obj.pageTitle,
        description: obj.description,
        isDeleted: 0,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    queryInterface.bulkInsert(
      'managePages',
      managePages,
      {}
    );
    rawCities.forEach((obj) => {
      cities.push({
        uuid: uuidv1(),
        name: obj.name,
        country: obj.country,
        countryCode: obj.countryCode,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    queryInterface.bulkInsert(
      'cities',
      cities,
      {}
    );
    rawSms.forEach((obj) => {
      sms.push({
        uuid: uuidv1(),
        type: obj.type,
        body: obj.body,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    queryInterface.bulkInsert(
      'sms',
      sms,
      {}
    );
    
    return queryInterface.bulkInsert('emailTemplates',emailTemplates,{});
   
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
