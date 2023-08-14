import * as Joi from 'joi';

export default {
  createTrip: {
    body: Joi.object().keys({
      locationType: Joi.string().required(),
      startLocationName: Joi.string().required(),
      endLocationName: Joi.string(),
      startLat: Joi.number().required(),
      startLong: Joi.number().required(),
      endLat: Joi.number(),
      endLong: Joi.number(),
      paymentType: Joi.string().required(),
      paymentAmount: Joi.number().required(),
      driverId: Joi.number().required(),
      totalKms: Joi.number(),
      totalTimeInMinute: Joi.number(),
      dateTime: Joi.date().required(),
      bookedHours: Joi.number()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  updateTripStatus: {
    body: Joi.object().keys({
      uuid: Joi.string().required(),
      status: Joi.string().required(),
      totalKms: Joi.number().optional()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  completeTrip: {
    body: Joi.object().keys({
      uuid: Joi.string().required(),
      totalKms: Joi.number().optional(),
      driverId: Joi.number().required(),
      bookedHours: Joi.number().optional(),
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  customerReview: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  driverReview: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  tripList: {
    body: Joi.object().keys({
      pageNumber: Joi.number().required(),
      perPage: Joi.number().required(),
      tripStatus: Joi.string().required()

    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  shareCustomerStatus: {
    body: Joi.object().keys({
      tripId: Joi.string().required(),
      receiverId: Joi.string().required(),
      shareMethod: Joi.string().required(),
      message: Joi.string().required()

    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  }
  ,
  getDriverOverview: {
    query: Joi.object().keys({
      driverId: Joi.number().required(),
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  driverDayData: {
    query: Joi.object().keys({
      driverId: Joi.number().required(),
      startDate: Joi.date().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  }
  ,
  getCustomerOverview: {
    query: Joi.object().keys({
      customerId: Joi.number().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  customerDayData: {
    query: Joi.object().keys({
      customerId: Joi.number().required(),
      startDate: Joi.date().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  getCustomerTrips: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    }),
    body: Joi.object().keys({
      perPage: Joi.number().min(1).required(),
      pageNumber: Joi.number().min(1).required()
    })
  },
  changeLocation: {
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    }),
    body: Joi.object().keys({
      uuid: Joi.string().required(),
      endLat: Joi.number().required(),
      endLong: Joi.number().required(),
      endLocationName: Joi.string().required()
    })
  },
  avoidOverlapping: {
    body: Joi.object().keys({
      driverId: Joi.number().required(),
      dateTime: Joi.string().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  },
  updatePickUpTime: {
    body: Joi.object().keys({
      uuid: Joi.string().required()
    }),
    headers: Joi.object().keys({
      'x-access-token': Joi.string().required()
    })
  }
};
