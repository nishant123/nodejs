import { vars } from './vars';

export const version = {
  v1: 'v1.0'
};

export const cache = {
  prefix: 'acl:',
  config: 'config:',
  rolePolicyModule: 'role-policy-mapping:',
  apiPolicyModule: 'api-policy-mapping:',
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
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUPPLIER_ADMIN: 'SUPPLIER_ADMIN',
  ADMIN:'ADMIN',
  DRIVER: 'DRIVER',
  CUSTOMER:'CUSTOMER',
  CONCIERGE: 'CONCIERGE'
};

export const apiRoles = {
  ADMIN:'ADMIN',
  DRIVER: 'DRIVER',
  CUSTOMER:'CUSTOMER',
  CONCIERGE: 'CONCIERGE'
};

export const notificationMessages = {
  Registration : 'Congratulations, [USERNAME] account has been successfully created. Welcome to the OurLane',
  
};



export const applicationStatuses = {
  carType: {
    mini: 'MINI',
    premier: 'PREMIER',
    suv: 'SUV',
    micro: 'MICRO'
  },
  paymentType: {
    cash: 'CASH',
    card: 'CARD',
    wallet: 'WALLET'
  },
  cardType: {
    debit: 'DEBIT',
    credit: 'CREDIT',
    visa: 'VISA'
  },
  tripStatus: {
    scheduled: 'Scheduled',
    ongoing: 'Ongoing',
    completed: 'Completed',
    canceled: 'Cancelled',
    rejected: 'Rejected'
  },
  otp: {
    OTP_MESSAGE: ' is your verification Code(otp) for mobile number verification.PLEASE DO NOT SHARE',
    COUNRTY_CODE: '+91',
    STATIC_OTP: 999999
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
  }
}

export const firebaseConfig = {
  FIREBASE_API_KEY: ''

}

export const liveFeed = {
  NOTIFICATION: 'notification'
};
