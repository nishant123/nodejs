const severityCode = {
  LOW: 'LOW',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  CRITICAL: 'CRITICAL'
};

export const errorManager = {
  NOTIFICATION_NOT_FOUND: {
    type: 'NOTIFICATION_NOT_FOUND',
    message: 'Notification not found',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_DRIVER_ID: {
    type: 'INVALID_DRIVER_ID',
    message: 'Invalid driver id',
    code: 400,
    severity: severityCode.LOW
  },
  TOO_MANY_LOGIN_ATTEMPT: {
    type: 'TOO_MANY_LOGIN_ATTEMPT',
    message: 'Too many login attempts.',
    code: 429,
    severity: severityCode.HIGH
  },
  TOO_MANY_REQUEST: {
    type: 'TOO_MANY_REQUEST',
    message: 'Too many request from this IP.',
    code: 429,
    severity: severityCode.HIGH
  },
  VALIDATION_ERROR: {
    type: 'VALIDATION_ERROR',
    message: 'validation error',
    code: 400,
    severity: severityCode.MEDIUM
  },
  ACCESS_DENIED: {
    type: 'ACCESS_DENIED',
    message: 'access has been denied',
    code: 400,
    severity: severityCode.LOW
  },
  NO_TOKEN: {
    type: 'NO_TOKEN',
    message: 'no token provided with the request',
    code: 401,
    severity: severityCode.LOW
  },
  TOKEN_UNAUTHORIZED: {
    type: 'TOKEN_UNAUTHORIZED',
    message: 'unauthorized token',
    code: 401,
    severity: severityCode.LOW
  },
  TOKEN_EXPIRED: {
    type: 'TOKEN_EXPIRED',
    message: 'token expired',
    code: 401,
    severity: severityCode.LOW
  }
};

export default {
  errorManager
};
