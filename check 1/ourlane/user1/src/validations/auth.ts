import * as Joi from 'joi';

export default {
  checkAccount: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
    })
  },
  sendOtp: {
    body: Joi.object().keys({
      mobileNumber: Joi.string().required(),
      otpType:Joi.string().required()
    })
  },
  verifyOtp: {
    body: Joi.object().keys({
      mobileNumber: Joi.string()
        .required(),
      otp: Joi.string()
        .length(6)
        .required()
    })
  },
  setPassword: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      verificationCode: Joi.string().required()
    })
  },
  create: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      fullName: Joi.string().regex(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/).trim().optional().max(30),
      mobileNumber: Joi.number().optional(),
      password: Joi.string().optional(),
      confirmPassword: Joi.string().optional(),
      role:Joi.string().required(),
      // organizationId:Joi.string().optional(),
    })
  },
  login: {
    body: Joi.object().keys({
      mobileNumber: Joi.string().optional(),
      email: Joi.string()
      .email().optional(),
      password:Joi.string().optional(),
    })
  },
  changePassword: {
    body: Joi.object().keys({
      password: Joi.string().required(),
      oldPassword: Joi.string().required()
    })
  },
  verify2FA: {
    body: Joi.object().keys({
      requestId: Joi.string().required(),
      otp: Joi.string().length(6).required()
    })
  },
  forgetPassword: {
    body: Joi.object().keys({
      email: Joi.string().required()
    })
  },
  refreshToken: {
    query: Joi.object().keys({
      refreshToken: Joi.string().required()
    })
  },
  verifyEmail: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      verificationCode: Joi.string().required()
    })
  },
  reSendVerifyEmail: {
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
    })
  },
};
