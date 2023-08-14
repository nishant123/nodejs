import * as Joi from 'joi';

export default {
  createOrganization: {
    body: Joi.object().keys({
      organizationName: Joi.string().required(),
      organizationInfo: Joi.string().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  }
};
