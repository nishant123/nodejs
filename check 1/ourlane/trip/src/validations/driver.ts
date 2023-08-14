import * as Joi from 'joi';

export default {
  updateStatus: {
    body: Joi.object().keys({
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        status: Joi.string().required()
    }),
    headers: Joi.object().keys({
        'x-access-token': Joi.string().required()
    })
  },
  nearestCab: {
    body: Joi.object().keys({
      totalKms: Joi.number(),
      totalTimeInMinute: Joi.number(),
      dateTime: Joi.string().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  }
};
