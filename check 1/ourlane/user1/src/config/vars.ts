/* eslint-disable eqeqeq */
import * as path from 'path';

/**
 *  import .env variables
 */

require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example')
});

export const vars = {
  serviceName: process.env.SERVICE_NAME,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  basePath: process.env.API_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiryTime: +process.env.JWT_EXPIRATION_MINUTES,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'combined',
  cache: {
    host: process.env.CACHE_HOST,
    port: process.env.CACHE_PORT,
    password: process.env.CACHE_PASSWORD
  },
  mysql: {
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
  },
  rabbitClient: process.env.RABBIT_CLIENT,
  otpValidity: process.env.OTP_EXPIRY,
  otpExpiry: +process.env.OTP_EXPIRY * 60 * 1000,
  emailExpiry: +process.env.EMAIL_EXPIRY * 60 * 1000,
  salt: process.env.SALT,
  refreshTokenTime: +process.env.REFRESH_TOKEN_MINUTES,
  limiter: {
    rateRequest: 200,
    rateTime: 1,
    loginRequest: 20,
    loginTime: 1
  },
  mailGunDetails: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    from: process.env.MAILGUN_MAIL_FROM,
    isMailGunRequired: process.env.IS_MAIL_GUN_REQUIRED == 'true'
  },
  twiloCredentials: {
    accountSid: process.env.ACCOUNTS_ID,
    authToken: process.env.AUTH_TOKEN,
    twilioNumber: process.env.TWILIO_NUMBER,
  },
  mailChimpCredentials: {
    server: process.env.SERVER,
    apiKey: process.env.API_KEY,
    audienceId: process.env.AUDIENCE_ID,
  },
  s3: {
    s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
    s3secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    s3BucketName: process.env.S3_BUCKET_NAME,
    signedUrlExpireSeconds: 5 * 60 * 1000 // 5 minute
  },
  localhost: process.env.LOCALHOST,
  conciergeHost : process.env.CONCIERGE_HOST, // HA-1782
  topics: {
    ERROR_LOGGING: process.env.ERROR_LOGGING,
    LOGGING: process.env.LOGGING
  },
  whitelistUrls: process.env.WHITELIST_URLS.split(','),
  userMicroService: process.env.USER,
  staticMicroService: process.env.STATIC,
  openfire: {
    url: `${process.env.OPENFIRE_URL}${process.env.CREATE_USER_API}`,
    secret: process.env.OPENFIRE_SECRET
  }
};

export default {
  vars
};
