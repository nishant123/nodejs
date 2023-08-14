const severityCode = {
  LOW: 'LOW',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  CRITICAL: 'CRITICAL'
};

export const errorManager = {
  TOO_MANY_REQUEST: {
    type: 'TOO_MANY_REQUEST',
    message: 'Too many request from this IP.',
    code: 429,
    severity: severityCode.HIGH
  },
  TOO_MANY_LOGIN_ATTEMPT: {
    type: 'TOO_MANY_LOGIN_ATTEMPT',
    message: 'Too many login attempts.',
    code: 429,
    severity: severityCode.HIGH
  },
  VALIDATION_ERROR: {
    type: 'VALIDATION_ERROR',
    message: 'validation error',
    code: 400,
    severity: severityCode.MEDIUM
  },
  NOT_FOUND: {
    type: 'NOT_FOUND',
    message: 'resource not found',
    code: 404,
    severity: severityCode.LOW
  },
  TOKEN_EXPIRED: {
    type: 'TOKEN_EXPIRED',
    message: 'token expired',
    code: 401,
    severity: severityCode.LOW
  },
  TOKEN_UNAUTHORIZED: {
    type: 'TOKEN_UNAUTHORIZED',
    message: 'unauthorized token',
    code: 401,
    severity: severityCode.LOW
  },
  NO_TOKEN: {
    type: 'NO_TOKEN',
    message: 'no token provided with the request',
    code: 401,
    severity: severityCode.LOW
  },
  ACCESS_DENIED: {
    type: 'ACCESS_DENIED',
    message: 'access has been denied',
    code: 400,
    severity: severityCode.LOW
  }
};

export default {
  errorManager
};
