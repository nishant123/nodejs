import { vars } from './vars';

export const version = {
  v1: 'v1.0'
};

export const cache = {
  prefix: 'acl:',
  emailPrefix: 'emails:',
  config: 'config:',
  rolePolicyModule: 'role-policy-mapping:',
  apiPolicyModule: 'api-policy-mapping:',
  language: 'language',
  city: "city",
  paymentType: "paymentType",
  notification_socket: 'notification:',
  sms: 'sms'
};

export const topics = {
  LOGGING: vars.topics.LOGGING,
  ERROR_LOGGING: vars.topics.ERROR_LOGGING
};

export const otpType = {
  register: 'register',
  twoFA: '2FA'
};


export const roles = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUPPLIER_ADMIN: 'SUPPLIER_ADMIN',
  DRIVER: 'DRIVER',
  CUSTOMER :'CUSTOMER'
};

export const applicationStatuses = {
  carType: {
    mini: 'MINI',
    premier: 'PREMIER',
    suv: 'SUV',
    micro: 'MICRO'
  },
  paymentType: {
    cash: 'Cash',
    card: 'Card',
    wallet: 'Wallet'
  },
  cardType: {
    debit: 'Debit',
    credit: 'Credit',
    visa: 'Visa'
  },
  tripStatus: {
    scheduled: 'Scheduled',
    ongoing: 'Ongoing',
    completed: 'Completed',
    canceled: 'Cancelled',
    rejected: 'Rejected'
  },
  otp: {
    OTP_MESSAGE: 'Your otp verification 6 digit number is',
    COUNRTY_CODE: '+91',
    STATIC_OTP: 999999,
    TRIP_OTP_MESSAGE: 'Your otp verification 4 digit number is ' 
  },
  status: {
    active: 'Active',
    inactive: 'Inactive'
  },
  isOnlineStatus: {
    uassigned: 'Unassigned',
    unavailable: 'Unavailable',
    available: 'Available',
    driving: 'Driving'
  },
  shareMethods: {
    airdrop : 'Airdrop',
    email:'Email',
    message :'SMS',
    whatsApp:'WhatsApp'
  },
  tripScheduleStatus: {
    rightnow: 'Rightnow',
    scheduled: 'Scheduled',
    scheduledHourly: 'ScheduledHourly',
    rightNowHourly: 'RightnowHourly'
  },
  kilometer: {
    ten: 10,
    twentyFive: 25
  },
  AVOID_OVERLAPPING_MESSAGE: {
    overlapping: 'This car is already booked by another customer.'
  },
  maxTrip: {
    two: 2
  }
}

export const liveFeed = {
  BOOKED_TRIP: 'Booked a trip',
  MINUTES_AWAY: 'is 2 minutes away from the Customer location',
  CANCELLED_TRIP: 'Canceled the trip request',
  LOCATION_CHANGE: 'Changed their destination location',
  TRIP_ACCEPTED: 'Accepted the trip request',
  TRIP_REJECTED: 'Rejected the trip request',
  TRIP_COMPLETED: 'Completed the trip',
  LIVEFEEDS: 'liveFeed',
  NOTIFICATION: 'notification'
};

export const firebaseConfig = {
  FIREBASE_API_KEY: 'AAAASo_CGvg:APA91bH7e62CtTelw9IDnRDyKywIx_gLNTlgG-3t5QW6nac-dEBMFanTXn0FTEWZ7ArGbqigDhvnVAZ378x2i4zc3_YhACWVb5qQkHiuTIfo6rYcoRMEWrBOsUadxgegWTyIq37XP57E'
};

export const customerPushNotification = {
  TRIP_BOOKING: 'Your booking has been confirmed. Please wait for the driver’s arrival',
  NEARBY_DRIVER: 'Your ride is 2 minutes away. Meet the driver at your pick-up point',
  DRIVER_ARRIVAL: 'Your ride has arrived',
  TRIP_START: 'Your trip is started',
  TRIP_COMPLETED: 'Your trip has been completed',
  RATING_REVIEW: 'Please rate your last trip between 1 to 5 stars and write your comments',
  TRIP_REJECTED: 'Your trip request with trip ID [TRIPID] has been rejected by the driver. Please book another trip',
  TRIP_REJECTED_SCHEDULED: 'Your scheduled trip request with trip ID [TRIPID] has been rejected by the driver. Please book another trip',
  ONE_HOURS_BEFORE: 'Reminder! Your ride is scheduled at [TIME] (Time)',
  ONE_HOUR_BEFORE_MESSAGE: 'Reminder! Your have a trip in an hour'
}

export const driverPushNotification = {
  TRIP_BOOKING: 'Booking has been confirmed with the customer [NAME]. Please reach the pick-up location on time',
  TRIP_CANCELLED: 'The scheduled trip request with trip ID [TRIPID] has been canceled by the customer'
}

export const tripTypeNotification = {
  createdTrip: 'createdTrip',
  tripStarted: 'tripStarted',
  completedTrip: 'completedTrip',
  rejectedTrip: 'rejectedTrip',
  cancelledTrip: 'cancelledTrip',
  tripRate: 'tripRate'
}

