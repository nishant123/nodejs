import { vars } from './vars';

export const version = {
  v1: 'v1.0'
};

export const cache = {
  prefix: 'acl:',
  config: 'config:',
  rolePolicyModule: 'role-policy-mapping:',
  apiPolicyModule: 'api-policy-mapping:',
  notification_socket: 'notification:',
  emailPrefix: 'emails:',
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
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUPPLIER_ADMIN: 'SUPPLIER_ADMIN',
  DRIVER: 'DRIVER',
  ADMIN: 'ADMIN'
};

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
    TRIP_OTP_MESSAGE: 'Your otp verification 4 digit number is' 
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
    scheduled: 'Scheduled'
  },
  kilometer: {
    ten: 10,
    twentyFive: 25
  },
  AVOID_OVERLAPPING_MESSAGE: {
    overlapping: 'This car is already booked by another customer.'
  },
  maxTrip: {
    ten: 10
  }
}


