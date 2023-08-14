import { vars } from './vars';

export const version = {
  v1: 'v1.0'
};

export const cache = {
  prefix: 'acl:',
  config: 'config:',
  rolePolicyModule: 'role-policy-mapping:',
  apiPolicyModule: 'api-policy-mapping:',
  notification_socket: 'notification:'
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


