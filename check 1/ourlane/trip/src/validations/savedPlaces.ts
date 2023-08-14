import * as Joi from 'joi';

export default {
  createAddress: {
    body: Joi.object().keys({
        locationType: Joi.string().required(), 
        endLocationName: Joi.string().required(), 
        endLat: Joi.number().required(), 
        enLong: Joi.number().required(), 
    })
  }

  
};




