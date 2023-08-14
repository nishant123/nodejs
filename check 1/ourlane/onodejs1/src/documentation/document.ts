/**
 * @api {post} user/v1/auth/create create account 
 * @apiDescription create account for the users
 * @apiVersion 1.0.0
 * @apiName create account
 * @apiGroup User service
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 *
 * @apiParam  {String}    email              (Required)
 * @apiParam  {String}    fullName           (Required)
 * @apiParam  {String}    mobileNumber       (Required)
 * @apiParam  {String}    role               (Required)
 * @apiParam  {String}    countryCode        (Required)
 * 
 * @apiSuccess (OK 200) {Number}    code         200=OK
 * @apiSuccess (OK 200) {Boolean}   status       true for success and false for failure
 * @apiSuccess (OK 200) {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}  result       result object
 * @apiSuccess (OK 200) {String}    appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (email is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response:
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "requestId": "288ff4af-272e-4ccb-b657-c76558de3e1b",
        "mobileNumber": 7259916919,
        "countryCode": "+91"
    }
}
*/
/**
 * @api {post} user/v1/auth/login login to account 
 * @apiDescription login to account from the users
 * @apiVersion 1.0.0
 * @apiName Login account
 * @apiGroup User service
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 *
 * @apiParam  {String}    email              email (Required for Admin)
 * @apiParam  {String}    password           password (Required for admin)
 * @apiParam  {String}    mobileNumber           mobileNumber (Required for customer and driver)
 * @apiParam  {String}    countryCode           countryCode (Required for customer and driver)
 * 
 * @apiSuccess (OK 200) {Number}    code         200=OK
 * @apiSuccess (OK 200) {Boolean}   status       true for success and false for failure
 * @apiSuccess (OK 200) {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}  result       result object
 * @apiSuccess (OK 200) {String}    appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (email is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response:
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTg1ODYzNTMsInV1aWQiOiJmYTJjMjg1NC0zNjhmLTQyNTgtOTg5MC1kYmExNWIxYjkwNGIiLCJsb2dpbklkIjoic2FudG9zaC5rdW1hckBibG9ja2dlbWluaS5jb20iLCJyb2xlIjoiRFJJVkVSIiwiaWQiOjIsIm9yZ2FuaXphdGlvbklkIjpudWxsLCJGdWxsTmFtZSI6IlNhbnRob3NoIEt1bWFyIiwiaWF0IjoxNjE1OTU4MzUzfQ.yPd3nEwZwXQ2n-bnfnNL3ofvC76KbYUVJSaRmjNScak",
        "userDetails": {
            "id": "fa2c2854-368f-4258-9890-dba15b1b904b",
            "email": "santosh.kumar@blockgemini.com",
            "role": "DRIVER",
            "FullName": "Santhosh Kumar"
        }
    }
}
*/
/**
 * @api {get} user/v1/user/getDriver GET GET ALL DRIVER NAME
 * @apiDescription Get Driver after successful login
 * @apiVersion 1.0.0
 * @apiName get address
 * @apiGroup Car
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (email is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response:
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "driverId": 4
        },
        {
            "driverId": 3
        },
        {
            "driverId": 2
        }
    ]
}
*/



/**
 * @api {post} user/v1/auth/checkAccount Check Account
 * @apiDescription Check user Account
 * @apiVersion 1.0.0
 * @apiName Check Account
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam  {String}     email               User's email (Required)
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "message": 'FAILED',
    "responseCode": 'FAILED',
    "message": "INTERNAL_SERVER_ERROR"
  }
 * @apiSuccessExample {json} Success-Response:
 {
  "responseCode": "SUCCESS",
  "message": "success",
  "result": {
    "email": "ankit@yopmail.com",
    "isUserExist": true,
    "isPasswordSet": true,
    "isBlocked": false,
    "fullName": "Ankit Chavhan",
    "role": "SUPER_ADMIN"
  }
}
 */

/**
 * @api {post} user/v1/auth/sendOtp Send Otp
 * @apiDescription Send otp to the provide email id
 * @apiVersion 1.0.0
 * @apiName Send Otp
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam  {String}     mobileNumber               mobileNumber (Required)
 * @apiParam  {String}     otpType               otpType (Required)
 * @apiParam  {String}     countryCode               countryCode (Required)
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "BAD_REQUEST",
    "message": "Invalid login id"
  }
 * @apiSuccessExample {json} Success-Response:
  {
    "responseCode": "SUCCESS",
    "message": "success"
  }
 */

/**
 * @api {post} user/v1/auth/verifyOtp Verify Otp
 * @apiDescription Verify otp
 * @apiVersion 1.0.0
 * @apiName Verify Otp
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam  {String}     email               User's email (Required)
 * @apiParam  {String}     otp                 OTP (Required)
 * @apiParam  {String}     countryCode         countryCode (Required)
 * 
 * * * @apiParamExample {json} Request-Example
{
    "mobileNumber":"9015634171",
    "countryCode": "+91",
    "otp":"999999"
}
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "BAD_REQUEST",
    "message": "Invalid OTP"
  }
 * @apiSuccessExample {json} Success-Response:
  {
    "responseCode": "SUCCESS",
    "message": "success",
    "result": {
        "verificationCode": "SomeString"
    }
  }
 */

/**
 * @api {post} user/v1/auth/setPassword Set Password
 * @apiDescription Set password of the user
 * @apiVersion 1.0.0
 * @apiName Set Password
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam  {String}     email               User's email (Required)
 * @apiParam  {String}     password            123456 (Required)
 * @apiParam  {String}     verificationCode    verificationCode (Required)
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "EXPIRED_VERIFICATION_CODE",
    "message": "verification code expired"
  }
 * @apiSuccessExample {json} Success-Response:
  {
    "responseCode": "SUCCESS",
    "message": "success"
  }
 */

/**
 * @api {post} user/v1/auth/changePassword Change Password
 * @apiDescription Set password of the user
 * @apiVersion 1.0.0
 * @apiName Change Password
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam  {String}     password            123456 (Required)
 * @apiParam  {String}     oldPassword         1234567(Required)
 *
 * @apiHeader {String} x-access-token          JWT-TOKEN (Required)
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "INVALID_CREDENTIALS",
    "message": "email or password is incorrect"
  }
 * @apiSuccessExample {json} Success-Response:
  {
    "responseCode": "SUCCESS",
    "message": "success"
  }
 */

/**
 * @api {post} user/v1/auth/verify2fa Verify2Fa
 * @apiDescription verify two way authentication
 * @apiVersion 1.0.0
 * @apiName verify2fa
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam  {String}     requestId               Request ID (Required)
 * @apiParam  {String}     otp                     OTP (required)
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "BAD_REQUEST",
    "message": "Invalid login id"
  }
 * @apiSuccessExample {json} Success-Response:
  {
    "responseCode": "SUCCESS",
    "message": "success"
  }
 */

/**
 * @api {post} user/v1/auth/forgetPassword Forget Password
 * @apiDescription Allows to Reset password
 * @apiVersion 1.0.0
 * @apiName Forget Password
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam  {String}     email               Email ID (Required)
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "BAD_REQUEST",
    "message": "email is required"
  }
 * @apiSuccessExample {json} Success-Response:
  {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "verificationCode": "rh6qGCQK3hYgYlH6uDQxht6xEByhjxGWJrQ5HyzOnBVp9W4SQrxKL3dC4iZankwf"
    }
  }
 */

/**
* @api {get} user/v1/auth/refreshAccessToken refresh token
* @apiDescription Global search car  after successful login
* @apiVersion 1.0.0
* @apiName refresh token
* @apiGroup user service
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token
* @apiParam  {String}     keyword      optional (query params)
* @apiParam  {String}     offset       optional (query params)
* @apiParam  {String}     limit        optional (query params)
* @apiSuccess (OK 200) {Number}     code         200=OK
* @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
* @apiSuccess (OK 200)  {String}    message      API Response message (Success)
* @apiSuccess (OK 200) {Object[]}   result       result object
* @apiSuccess (OK 200) {String}     appVersion   API version
* @apiError (Bad Request 400)   {Boolean}    status    false
* @apiError (Bad Request 400)   {String}     message   API Response message (email is required)
* @apiError (Bad Request 400)   {Number}     code      400=Bad Request
* @apiError (Bad Request 400)   {Object[]}   result    Blank Object
* @apiError (Internal Server Error 500)   {Boolean}   status    false
* @apiError (Internal Server Error 500)   {String}    message
* API Response message (Internal Server Error)
* @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
* @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
* @apiSuccessExample {json} Success-Response:
{
    "responseCode": "TOKEN_UNAUTHORIZED",
    "message": "unauthorized token",
    "code": 401
}
* @apiErrorExample {json} unauthorized error
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTg1OTE5NTMsInV1aWQiOiJmYTJjMjg1NC0zNjhmLTQyNTgtOTg5MC1kYmExNWIxYjkwNGIiLCJsb2dpbklkIjoic2FudG9zaC5rdW1hckBibG9ja2dlbWluaS5jb20iLCJyb2xlIjoiRFJJVkVSIiwiaWQiOjIsIm9yZ2FuaXphdGlvbklkIjpudWxsLCJGdWxsTmFtZSI6IlNhbnRob3NoIEt1bWFyIiwiaWF0IjoxNjE1OTYzOTUzfQ.CFSDSdIzLZBFWtviVignjFj4wqRZaPnJhigWma9jMfA",
            "email": "santosh.kumar@blockgemini.com",
            "userId": "fa2c2854-368f-4258-9890-dba15b1b904b",
            "fullName": "Santhosh Kumar",
            "mobileNumber": "7259916919",
            "creationDate": "2021-03-12T10:15:27.000Z",
            "lastLoginTime": "2021-03-12T10:15:27.000Z",
            "updationDate": "2021-03-17T06:52:33.000Z",
            "uuid": "fa2c2854-368f-4258-9890-dba15b1b904b",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTg1OTE5NTMsInV1aWQiOiJmYTJjMjg1NC0zNjhmLTQyNTgtOTg5MC1kYmExNWIxYjkwNGIiLCJsb2dpbklkIjoic2FudG9zaC5rdW1hckBibG9ja2dlbWluaS5jb20iLCJyb2xlIjoiRFJJVkVSIiwiaWQiOjIsIm9yZ2FuaXphdGlvbklkIjpudWxsLCJGdWxsTmFtZSI6IlNhbnRob3NoIEt1bWFyIiwiaWF0IjoxNjE1OTYzOTUzfQ.CFSDSdIzLZBFWtviVignjFj4wqRZaPnJhigWma9jMfA"
        }
    ]
}
 */


/**
 * @api {get} user/v1/role Get Role
 * @apiDescription Get a Role
 * @apiVersion 1.0.0
 * @apiName Get Role
 * @apiGroup Role
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} x-access-token JWT token
 *
 * @apiParam  {String}     roleName            Role Name (Required)
 * @apiParam  {String}     roleDesc            Role Desc (Required)
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
  /*comment
  {
 "responseCode": "SUCCESS",
 "message": "success",
 "result": [
  {
   "id": 3,
   "roleName": "CATEGORY_MANAGER",
   "roleDesc": "",
   "assignedUserCount": "0",
   "assignedPolicyCount": "2",
   "active": 1,
   "createdAt": "2020-03-25T09:22:56.000Z",
   "updatedAt": "2020-03-25T09:22:56.000Z",
   "organizationId": "caede1c5-9771-4e58-8eef-8805224d915e"
  },
  {
   "id": 1,
   "roleName": "SUPER_ADMIN",
   "roleDesc": "",
   "assignedUserCount": "0",
   "assignedPolicyCount": "3",
   "active": 1,
   "createdAt": "2020-03-25T09:22:56.000Z",
   "updatedAt": "2020-03-25T09:22:56.000Z",
   "organizationId": "caede1c5-9771-4e58-8eef-8805224d915e"
  }
 ]
} */

/**
 * @api {post} user/v1/role Create Role
 * @apiDescription Create a Role
 * @apiVersion 1.0.0
 * @apiName Create Role
 * @apiGroup Role
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} x-access-token JWT token
 *
 * @apiParam  {String}     roleName            Role Name (Required)
 * @apiParam  {String}     roleDesc            Role Desc (Required)
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "VALIDATION_ERROR",
    "message": "roleName is required"
  }
 * @apiSuccessExample {json} Success-Response:
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "result": {
        "active": true,
        "id": 2,
        "roleName": "r1",
        "roleDesc": "r1 info",
        "updatedAt": "2020-01-06T12:52:05.554Z",
        "createdAt": "2020-01-06T12:52:05.554Z"
    }
  }
 */





/**
 * @api {post} user/v1/user/list List
 * @apiDescription List of users
 * @apiVersion 1.0.0
 * @apiName user List
 * @apiGroup User
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} x-access-token JWT token
 *
 * @apiParam  {String}     searchByName              search by name (Optional)
 * @apiParam  {String}     roles                     Roles (Optional)
 * @apiParam  {String}     accountStatus             Account Status (Optional)
 * @apiParam  {String}     lastUpdated               Last Updated (Optional)
 * @apiParam  {String}     accountCreated            Account Created (Optional)
 * @apiParam  {String}     pageNumber                Page Number (Required)
 * @apiParam  {String}     perPage                   Page Number (Required)
 *
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "BAD_REQUEST",
    "message": "Invalid login id"
  }
 * @apiSuccessExample {json} Success-Response:
  {
 "responseCode": "SUCCESS",
 "message": "success",
 "result": {
  "count": 1,
  "rows": [
   {
    "id": 1,
    "uuid": "36151c00-6e7a-11ea-af45-dd26c73c9def",
    "firstName": "Super",
    "lastName": "Admin",
    "loginId": "sakaar@blockgemini.com",
    "isActive": 1,
    "isBlocked": 0,
    "isDeleted": 0,
    "loginAttempts": 0,
    "createdAt": "2020-03-25T09:22:56.000Z",
    "updatedAt": "2020-03-27T12:06:37.000Z",
    "role": "SUPER_ADMIN"
   }
  ]
 }
}
 */

/**
* @api {post} user/v1/user/deleteUser Delete User
* @apiDescription Delete Users
* @apiVersion 1.0.0
* @apiName Delete User
* @apiGroup User
* @apiPermission public
*
* @apiHeader {String} Content-Type application/json
* @apiHeader {String} x-access-token JWT token
*
* @apiParam  {String}     uuid              find by uuid

*
*
* @apiSuccess (OK 200) {Number}     code         200=OK
* @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
* @apiSuccess (OK 200)  {String}    message      API Response message (Success)
* @apiSuccess (OK 200) {Object[]}   result       result object
* @apiSuccess (OK 200) {String}     appVersion   API version
* @apiError (Bad Request 400)   {Boolean}    status    false
* @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
* @apiError (Bad Request 400)   {Number}     code      400=Bad Request
* @apiError (Bad Request 400)   {Object[]}   result    Blank Object
* @apiError (Internal Server Error 500)   {Boolean}   status    false
* @apiError (Internal Server Error 500)   {String}    message
* API Response message (Internal Server Error)
* @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
* @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
* @apiErrorExample {json} List error
 {
   "responseCode": "BAD_REQUEST",
   "message": "Invalid login id"
 }
{
    "responseCode": " NO_USER_FOUND",
    "message": "No user found",
    "code": 400
}
{
    "responseCode": "USER_ACCOUNT_ALREADY_ACTIVATED",
    "message": "User account already activated",
    "code": 400
}
* @apiSuccessExample {json} Success-Response:
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        1
    ]
}
*/
/**
 * @api {post} user/v1/user/downloadList Download List
 * @apiDescription Download List
 * @apiVersion 1.0.0
 * @apiName Download List
 * @apiGroup User
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} x-access-token JWT token
 *
 * @apiParam  {String}     searchByName             Search By Name(Optional)
 * @apiParam  {String}     roles                    Roles (Optional)
 * @apiParam  {String}     accountStatus            Account Status (Optional)
 * @apiParam  {String}     lastUpdated              Last Updated (Optional)
 * @apiParam  {String}     accountCreated           Account Created (Optional)
 *
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (username is required)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiErrorExample {json} List error
  {
    "responseCode": "BAD_REQUEST",
    "message": "Invalid login id"
  }
 * @apiSuccessExample {json} Success-Response:
  {
    "responseCode": "SUCCESS",
    "message": "success"
  }
 */


