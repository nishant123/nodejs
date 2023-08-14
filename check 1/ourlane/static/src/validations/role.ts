import * as Joi from 'joi';

export default {
  createRole: {
    body: Joi.object().keys({
      roleName: Joi.string().required(),
      roleDesc: Joi.string().required(),
      organizationId: Joi.string().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  getRole: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  }
};
