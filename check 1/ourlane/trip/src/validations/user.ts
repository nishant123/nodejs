import * as Joi from 'joi';
import { join } from 'path';

export default {
  userList: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    }),
    body: Joi.object().keys({
      perPage: Joi.number().min(1).required(),
      pageNumber: Joi.number().min(1).required(),
      forWatchers: Joi.boolean().optional()
    })
  },
  updateUser: {
    body: Joi.object().keys({
      // uuid: Joi.string().uuid().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      contactInfo:Joi.string(),
      address:Joi.string()
      // isBlocked: Joi.boolean().required(),
      // role: Joi.string().required()
    })
  },
  deleteUser: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    }),
    body: Joi.object().keys({
      uuid: Joi.string().required(),
    })
  },
  approveUser: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    }),
    body: Joi.object().keys({
      uuid: Joi.string().required(),
    })
  },
  declineUser: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    }),
    body: Joi.object().keys({
      uuid: Joi.string().required(),
    })
  }
};
