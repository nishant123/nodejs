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
  },
  INVALID_LOGIN_ID: {
    type: 'INVALID_LOGIN_ID',
    message: 'Invalid login id',
    code: 400,
    severity: severityCode.LOW
  },
  EMAIL_NOT_VERIFIED: {
    type: 'EMAIL_NOT_VERIFIED',
    message: 'Email Not Verified',
    code: 400,
    severity: severityCode.LOW
  },
  NO_USER_FOUND: {
    type: ' NO_USER_FOUND',
    message: 'No user found',
    code: 400,
    severity: severityCode.LOW
  },
  FILE_NOT_UPLOADED:{
    type: 'FILE_NOT_UPLOADED',
    message: 'file not uploaded',
    code: 400,
    severity: severityCode.LOW
  },
  NO_DRIVER_FOUND: {
    type: ' NO_DRIVER_FOUND',
    message: 'No driver found',
    code: 400,
    severity: severityCode.LOW
  },
  NO_CUSTOMER_FOUND: {
    type: ' NO_CUSTOMER_FOUND',
    message: 'No customer found',
    code: 400,
    severity: severityCode.LOW
  },
  NO_TRIP_FOUND: {
    type: ' NO_TRIP_FOUND',
    message: 'No trip found',
    code: 400,
    severity: severityCode.LOW
  },
  ONGOING_TRIPS_ONLY: {
    type: 'ONGOING_TRIPS_ONLY',
    message: 'onGoing trips only',
    code: 400,
    severity: severityCode.LOW
  },
  CAR_NOT_FOUND: {
    type: 'CAR_NOT_FOUND',
    message: 'Cat not found',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_CREDENTIALS: {
    type: 'INVALID_CREDENTIALS',
    message: 'email or password is incorrect',
    code: 400,
    severity: severityCode.LOW
  },
  OLD_PASSWORD_INCORRECT: {
    type: 'OLD_PASSWORD_INCORRECT',
    message: 'old password is incorrect',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_PASSWORD: {
    type: 'INVALID_PASSWORD',
    message: 'password is incorrect',
    code: 400,
    severity: severityCode.LOW
  },
  PASSWORD_NOT_MATCHED: {
    type: 'PASSWORD_NOT_MATCHED',
    message: 'password is not matched',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_OTP: {
    type: 'INVALID_OTP',
    message: 'Invalid OTP',
    code: 400,
    severity: severityCode.LOW
  },
  EXPIRED_OTP: {
    type: 'EXPIRED_OTP',
    message: 'OTP Expired',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_VERIFICATION_CODE: {
    type: 'INVALID_VERIFICATION_CODE',
    message: 'Invalid verification code',
    code: 400,
    severity: severityCode.LOW
  },
  EXPIRED_VERIFICATION_CODE: {
    type: 'EXPIRED_VERIFICATION_CODE',
    message: 'verification code expired',
    code: 400,
    severity: severityCode.LOW
  },
  PASSWORD_USED_IN_LAST_THREE: {
    type: 'PASSWORD_USED_IN_LAST_THREE',
    message: 'Password should not match with recent three',
    code: 400,
    severity: severityCode.LOW
  },
  ROLE_ALREADY_EXIST: {
    type: 'ROLE_ALREADY_EXIST',
    message: 'Role name is already exist for this organization',
    code: 400,
    severity: severityCode.LOW
  },
  EMAIL_LINK_VERIFIED: {
    type: 'EMAIL_LINK_VERIFIED',
    message: 'Email link already verified',
    code: 400,
    severity: severityCode.LOW
  },
  ORG_ALREADY_EXIST: {
    type: 'ORG_ALREADY_EXIST',
    message: 'Organization is name already exist',
    code: 400,
    severity: severityCode.LOW
  },
  USER_ALREADY_EXIST: {
    type: 'USER_ALREADY_EXIST',
    message: 'Email id is already exist',
    code: 400,
    severity: severityCode.LOW
  },
  USER_ACCOUNT_ALREADY_ACTIVATED: {
    type: 'USER_ACCOUNT_ALREADY_ACTIVATED',
    message: 'User account already activated',
    code: 400,
    severity: severityCode.LOW
  },
  EMPLOYEE_ID_ALREADY_EXIST: {
    type: 'EMPLOYEE_ID_ALREADY_EXIST',
    message: 'Employee id is already exist',
    code: 400,
    severity: severityCode.LOW
  },
  MOBILE_NUMBER_ALREADY_EXIST: {
    type: 'MOBILE_NUMBER_ALREADY_EXIST',
    message: 'Mobile Number is already exist',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_MOBILE_NUMBER: {
    type: 'INVALID_MOBILE_NUMBER',
    message: ' Invalid Mobile Number',
    code: 400,
    severity: severityCode.LOW
  },

  INVALID_ORGANIZATION: {
    type: 'INVALID_ORGANIZATION',
    message: 'Invalid organization',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_ROLE: {
    type: 'INVALID_ROLE',
    message: 'Invalid role',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_USER_ROLE: {
    type: 'INVALID_USER_ROLE',
    message: 'Invalid user role',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_DOB: {
    type: 'INVALID_DOB',
    message: 'Invalid DOB',
    code: 400,
    severity: severityCode.LOW
  },
  USER_ENROLLMENT_FAIL: {
    type: 'USER_ENROLLMENT_FAIL',
    message: 'User enrollment failed',
    code: 400,
    severity: severityCode.LOW
  },
  FILE_SYSTEM_ERROR: {
    type: 'FILE_SYSTEM_ERROR',
    message: 'Error in file system',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_REQUEST_ID: {
    type: 'INVALID_REQUEST_ID',
    message: 'Invalid request',
    code: 400,
    severity: severityCode.LOW
  },
  CONFIGURATION_NOT_FOUND: {
    type: 'CONFIGURATION_NOT_FOUND',
    message: 'configuration not found for creation of elements',
    code: 400,
    severity: severityCode.LOW
  },
  CANNOT_BLOCK_SUPER_ADMIN: {
    type: 'CANNOT_BLOCK_SUPER_ADMIN',
    message: 'cannot block super admin user',
    code: 400,
    severity: severityCode.LOW
  },
  USER_INACTIVE: {
    type: 'USER_INACTIVE',
    message: 'User is not active',
    code: 400,
    severity: severityCode.LOW
  },
  PROVIDE_LOGIN_INFORMATION: {
    type: 'PROVIDE_LOGIN_INFORMATION',
    message: 'provide login information',
    code: 400,
    severity: severityCode.LOW
  },
  USER_BLOCKED: {
    type: 'USER_BLOCKED',
    message: 'User is blocked',
    code: 400,
    severity: severityCode.LOW
  },
  MOBILE_VERIFICATION_INCOMPLETE: {
    type: 'MOBILE_VERIFICATION_INCOMPLETE',
    message: 'mobile verification inComplete',
    code: 400,
    severity: severityCode.LOW
  },
  MULTIPLE_WRONG_ATTEMPTS: {
    type: 'MULTIPLE_WRONG_ATTEMPTS',
    message: 'Your account is locked for 30 minutes for multiple invalid attempts',
    code: 400,
    severity: severityCode.LOW
  },
  ORG_NOT_EXISTS: {
    type: 'ORG_NOT_EXISTS',
    message: 'Organization Id does not exists',
    code: 400,
    severity: severityCode.LOW
  },
  FAILED_TO_UPDATE_EMAIL_VERIFIED: {
    type: 'FAILED_TO_UPDATE_EMAIL_VERIFIED',
    message: 'Failed to update email verified',
    code: 400,
    severity: severityCode.LOW
  },
  FAILED_TO_UPDATE_TRIP_STATUS: {
    type: ' FAILED_TO_UPDATE_TRIP_STATUS',
    message: 'Failed to update trip status',
    code: 400,
    severity: severityCode.LOW
  },
  FAILED_TO_UPDATE_PASSWORD: {
    type: 'FAILED_TO_UPDATE_PASSWORD',
    message: 'Failed to update password',
    code: 400,
    severity: severityCode.LOW
  },
  PASSWORD_SAME: {
    type: 'PASSWORD_SAME',
    message: 'Old and new password should not be same',
    code: 400,
    severity: severityCode.LOW
  },
  PASSWORD_NUM_ERROR: {
    type: 'PASSWORD_NUM_ERROR',
    message: 'password must containt number ',
    code: 400,
    severity: severityCode.LOW
  },
  PASSWORD_SPECIAL_ERROR: {
    type: 'PASSWORD_SPECIAL_ERROR',
    message: 'password must containt special characters ',
    code: 400,
    severity: severityCode.LOW
  },
  PASSWORD_SMALL_ERROR: {
    type: 'PASSWORD_SMALL_ERROR',
    message: 'password must containt upper(A-Z) & lower(a-z) case letters',
    code: 400,
    severity: severityCode.LOW
  },
  ADDRESS_ERROR: {
    type: 'ADDRESS_ERROR',
    message: 'Address is already exit',
    code: 400,
    severity: severityCode.LOW
  },
  ADDRESS_LOCATION_ERROR: {
    type: 'ADDRESS_LOCATION_ERROR',
    message: 'Location is already exit',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_DRIVER_ID: {
    type: 'INVALID_DRIVER_ID',
    message: 'Invalid driver id',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_LAT: {
    type: 'INVALID_LAT',
    message: 'invalid latitude',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_LONG: {
    type: 'INVALID_LONG',
    message: 'invalid longitude',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_PAGENUMBER: {
    type: 'INVALID_PAGENUMBER',
    message: 'invalid page number ',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_PERPAGE: {
    type: 'INVALID_PERPAGE',
    message: 'invalid per page number ',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_CARD: {
    type: 'INVALID_CARD',
    message: 'Card type is required',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_CARD_NO: {
    type: 'INVALID_CARD_NO',
    message: 'Card Number is required',
    code: 400,
    severity: severityCode.LOW
  },
  INVALIDE_UUID: {
    type: 'INVALIDE_UUID',
    message: 'Invalid uuid',
    code: 400,
    severity: severityCode.HIGH
  },
  INVALIDE_TRIP_STATUS: {
    type: 'INVALIDE_TRIP_STATUS',
    message: 'Please enter valid trip status',
    code: 400,
    severity: severityCode.HIGH
  },
  NOTIFICATION_NOT_FOUND: {
    type: 'NOTIFICATION_NOT_FOUND',
    message: 'Notification not found',
    code: 400,
    severity: severityCode.LOW
  },

  TOTAL_KMS_REQUIRED: {
    type: 'TOTAL_KMS_REQUIRED',
    message: 'totalKms is required',
    code: 400,
    severity: severityCode.LOW
  },
  TOTAL_TIME_REQUIRED: {
    type: 'TOTAL_TIME_REQUIRED',
    message: 'totalTimeInMinute is required',
    code: 400,
    severity: severityCode.LOW
  },
  INVALID_CARS: {
    type: 'INVALID_CARS',
    message: 'invalid cars',
    code: 400,
    severity: severityCode.LOW
  },
  INVALIDE_CARD_TYPE: {
    type: 'INVALIDE_CARD_TYPE',
    message: 'Please enter valid Card Type',
    code: 400,
    severity: severityCode.HIGH
  },
  INVALIDE_PAYMENT_TYPE: {
    type: 'INVALIDE_PAYMENT_TYPE',
    message: 'Please enter valid Payment Type',
    code: 400,
    severity: severityCode.HIGH
  },
  NO_DATA_FOUND: {
    type: 'NO_DATA_FOUND',
    message: 'no data',
    code: 200,
    severity: severityCode.LOW
  },
  REQUIRED_LAT: {
    type: 'REQUIRED_LAT',
    message: 'latitude value required',
    code: 200,
    severity: severityCode.LOW
  },
  REQUIRED_LONG: {
    type: 'REQUIRED_LONG',
    message: 'longitude value required',
    code: 200,
    severity: severityCode.LOW
  },
  LAT_FLOAT_TYPE: {
    type: 'LAT_FLOAT_TYPE',
    message: 'Only latitude float type numeric value allowed',
    code: 200,
    severity: severityCode.LOW
  },
  LONG_FLOAT_TYPE: {
    type: 'LONG_FLOAT_TYPE',
    message: 'Only longitude float type numeric value allowed',
    code: 200,
    severity: severityCode.LOW
  },
  PAST_TRIP_DATE: {
    type: 'PAST_TRIP_DATE',
    message: 'You can not create trip passed date and time',
    code: 200,
    severity: severityCode.LOW
  },
  ESTIMATE_AMOUNT_ERR: {
    type: 'ESTIMATE_AMOUNT_ERR',
    message: 'Payment amount less than or greater than estimated trip amount',
    code: 200,
    severity: severityCode.LOW
  },
  NEXT_TRIP_ERR: {
    type: 'NEXT_TRIP_ERR',
    message: 'Your previous trip not completed, cancelled and rejected. So you can not create next trip.',
    code: 200,
    severity: severityCode.LOW
  },
  MAX_TRIP_TEN: {
    type: 'MAX_TRIP_TEN',
    message: 'Customer can not create more than 10 trips a day.',
    code: 200,
    severity: severityCode.LOW
  }
};

export default {
  errorManager
};
