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
  DRIVER: 'DRIVER',
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
    pending: 'PENDING',
    started: 'STARTED',
    ongoing: 'ON-GOING',
    completed: 'COMPLETED',
    canceled: 'CANCELED',
    declined: 'DECLINED',
    approved: 'APPROVED'
  },
  otp: {
    CUSTOMER_OTP: '9999',
    DRIVER_OTP: '9999'
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
