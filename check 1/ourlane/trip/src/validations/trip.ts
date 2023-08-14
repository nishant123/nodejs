import * as Joi from 'joi';

export default {
  createTrip: {
    body: Joi.object().keys({
      locationType: Joi.string().required(),
      startLocationName: Joi.string().required(),
      endLocationName: Joi.string().required(),
      startLat: Joi.number().required(),
      startLong: Joi.number().required(),
      endLat: Joi.number().required(),
      endLong: Joi.number().required(),
      paymentType: Joi.string().required(),
      paymentAmount: Joi.number().required(),
      driverId: Joi.number().required(),
      carId: Joi.number().required()
  }),
  headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
  })
  },
  updateTripStatus: {
    body: Joi.object().keys({
      uuid: Joi.string().required(),
      status:Joi.string().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  tripList: {
    body: Joi.object().keys({
      pageNumber: Joi.number().required(),
      perPage: Joi.number().required(),
      tripStatus:Joi.string().required()
  
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  shareCustomerStatus: {
    body: Joi.object().keys({
      tripId: Joi.string().required(),
      receiverId: Joi.string().required(),
      shareMethod:Joi.string().required(),
      message:Joi.string().required()
  
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },

  getDriverOverview: {
    query: Joi.object().keys({
      driverId: Joi.number().required()
    }),
    headers: Joi.object().keys({
        'x-access-token': Joi.string().required()
    })
  },
  getCustomerOverview: {
    query: Joi.object().keys({
      customerId: Joi.number().required()
    }),
    headers: Joi.object().keys({
        'x-access-token': Joi.string().required()
    })
  }

   
};
