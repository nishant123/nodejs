import * as Joi from 'joi';

export default {
  createCar: {
    body: Joi.object().keys({
        carCapacity: Joi.string().required(), 
        carFactor: Joi.string().required(), 
        carModel: Joi.string().required(), 
        carNumber: Joi.string().required(), 
        carOdometer: Joi.string().required(), 
        addDescription: Joi.string().required(), 
        bookingFees: Joi.number().required(), 
        pricePerKilometer: Joi.number().required(), 
        pricePerminute: Joi.number().required(), 
    })
  },
  getCar: {
    query: Joi.object().keys({ 
      pageNumber: Joi.number().required(), 
      perPage: Joi.number().required(), 
    })
  }
 

  
};
