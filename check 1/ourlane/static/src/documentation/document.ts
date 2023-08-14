/**
* @api {get} static/v1/driver/cityList Get city list
* @apiDescription Get the list of all the cities
* @apiVersion 1.0.0
* @apiName getCityList
* @apiGroup Static Service
* @apiPermission public
* @apiExample {curl} Example usage:
* curl --location --request GET 'https://{server}:{port}/static/v1/driver/cityList \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI4MjE3MzUsInVzZXJJZCI6IjQwIiwicm9sZUlkIjoxLCJlbWFpbCI6ImhhcmlzaEBibG9ja2dlbWluaS5jb20iLCJpYXQiOjE2MDI4MTgxMzV9.xkIR9ud6H7rHeilz1xrJbPnGFuJjEFkqLgTLjWPHBe8' \
        --header 'Content-Type: application/json' \
   --data-raw ''
* @apiHeader {String} Content-Type application/json
* @apiHeader {String} x-access-token   jwt token
*
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
* @apiErrorExample {json} List error
{
   "responseCode": "NOT_FOUND",
   "message": "resource not found",
   "code": 404
}
* @apiSuccessExample {json} Success-Response:
{
   "responseCode": "SUCCESS",
   "message": "success",
   "code": 200,
   "result": [
       {
           "id": 1,
           "uuid": "f0c2df5f-e86e-4a3e-8a78-5ac215096a8b",
           "name": "Dubai"
       },
       {
           "id": 2,
           "uuid": "51297673-cc8d-47ff-b2ed-15137367ca27",
           "name": "Abu Dhabi"
       },
       {
           "id": 3,
           "uuid": "a00d7967-87a0-464a-8082-2997372a0abe",
           "name": "Sharjah"
       },
       {
           "id": 4,
           "uuid": "f5250ffa-92f5-487a-bc47-5ca99439a2cf",
           "name": "Ajman"
       },
       {
           "id": 5,
           "uuid": "0e0e7d43-de16-4480-9c08-2c16faf49a16",
           "name": "RAK City"
       },
       {
           "id": 6,
           "uuid": "c6627cb6-5927-4692-8f0d-e44455385620",
           "name": "Fujairah"
       },
       {
           "id": 7,
           "uuid": "8fab226d-ab01-4f40-a5f0-3d262f0fe7fb",
           "name": "Umm al-Quwain"
       }
   ]
}

*/

/**
* @api {get} static/v1/driver/languageList Get language list
* @apiDescription Get the list of all the languages
* @apiVersion 1.0.0
* @apiName getLanguageList
* @apiGroup Static Service
* @apiPermission public
* @apiExample {curl} Example usage:
* curl --location --request GET 'https://{server}:{port}/static/v1/driver/languageList \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI4MjE3MzUsInVzZXJJZCI6IjQwIiwicm9sZUlkIjoxLCJlbWFpbCI6ImhhcmlzaEBibG9ja2dlbWluaS5jb20iLCJpYXQiOjE2MDI4MTgxMzV9.xkIR9ud6H7rHeilz1xrJbPnGFuJjEFkqLgTLjWPHBe8' \
        --header 'Content-Type: application/json' \
   --data-raw ''
* @apiHeader {String} Content-Type application/json
* @apiHeader {String} x-access-token   jwt token
*
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
* @apiErrorExample {json} List error
{
   "responseCode": "NOT_FOUND",
   "message": "resource not found",
   "code": 404
}
* @apiSuccessExample {json} Success-Response:
{
   "responseCode": "SUCCESS",
   "message": "success",
   "code": 200,
   "result": [
       {
           "id": 1,
           "uuid": "30c5ea93-024f-42b5-85d5-dcb714e52eb5",
           "language": "Hindi(हिन्दी)"
       },
       {
           "id": 2,
           "uuid": "d712ee94-917a-4b19-a37c-6d135a98f87c",
           "language": "English"
       },
       {
           "id": 3,
           "uuid": "26685ca3-241c-458d-8cef-9318f3f63392",
           "language": "Arabic(العربية)"
       },
       {
           "id": 4,
           "uuid": "51297673-cc8d-47ff-b2ed-15137367ca27",
           "language": "Urdu (اردو)"
       }
   ]
}
*/

/**
 * @api {get} static/v1/email/loadEmailTemplates Load email templates to radis
 * @apiDescription Load Email Templates into radis
 * @apiVersion 1.0.0
 * @apiName LoadEmail
 * @apiGroup Static Service
 * @apiPermission public
 * @apiExample {curl} Example usage:
 * curl --location --request GET 'https://{server}:{port}/static/v1/email/loadEmailTemplates \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI4MjE3MzUsInVzZXJJZCI6IjQwIiwicm9sZUlkIjoxLCJlbWFpbCI6ImhhcmlzaEBibG9ja2dlbWluaS5jb20iLCJpYXQiOjE2MDI4MTgxMzV9.xkIR9ud6H7rHeilz1xrJbPnGFuJjEFkqLgTLjWPHBe8' \
        --header 'Content-Type: application/json' \
   --data-raw ''
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} x-access-token JWT token
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
    "responseCode": "NOT_FOUND",
    "message": "resource not found",
    "code": 404
}
* @apiSuccessExample {json} Success-Response:
  {
 "responseCode": "SUCCESS",
 "message": "success",
 "result": []
} */



/**
 * @api {post} static/v1/email/sendEmail Send Email
 * @apiDescription Send Email
 * @apiVersion 1.0.0
 * @apiName Send Email
 * @apiGroup Static Service
 * @apiPermission public
 * @apiExample {curl} Example usage:
 * curl --location --request POST 'https://{server}:{port}/static/v1/email/sendEmail \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI4MjE3MzUsInVzZXJJZCI6IjQwIiwicm9sZUlkIjoxLCJlbWFpbCI6ImhhcmlzaEBibG9ja2dlbWluaS5jb20iLCJpYXQiOjE2MDI4MTgxMzV9.xkIR9ud6H7rHeilz1xrJbPnGFuJjEFkqLgTLjWPHBe8' \
        --header 'Content-Type: application/json' \
   --data-raw '{

      "email": "akhilesh@blockgemini.com",
      "type":"OTP",
      "variable":{
      "[NAME]": "Akhil",
      "[OTP_VALUE]": "123456"
      }

}'
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} x-access-token JWT token
 *
 * @apiParam  {String}     email           Email of user (Required)
 * @apiParam  {String}     type            Type of Email (Required)
 * @apiParam  {object}     variable        variables of Email Template (Required)
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
    "responseCode": "NOT_FOUND",
    "message": "resource not found",
    "code": 404
}
 * @apiSuccessExample {json} Success-Response:
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": true
}
 */

/**
* @api {get} static/v1/paymentType/getPaymentType Get payment type list
* @apiDescription Get the list of payment List
* @apiVersion 1.0.0
* @apiName getPaymentTypeList
* @apiGroup Static Service
* @apiPermission public
* @apiExample {curl} Example usage:
* curl --location --request GET 'https://{server}:{port}/static/v1/paymentType/getPaymentType \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI4MjE3MzUsInVzZXJJZCI6IjQwIiwicm9sZUlkIjoxLCJlbWFpbCI6ImhhcmlzaEBibG9ja2dlbWluaS5jb20iLCJpYXQiOjE2MDI4MTgxMzV9.xkIR9ud6H7rHeilz1xrJbPnGFuJjEFkqLgTLjWPHBe8' \
        --header 'Content-Type: application/json' \
   --data-raw ''
* @apiHeader {String} Content-Type application/json
* @apiHeader {String} x-access-token   jwt token
*
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
* @apiErrorExample {json} List error
{
   "responseCode": "NOT_FOUND",
   "message": "resource not found",
   "code": 404
}
* @apiSuccessExample {json} Success-Response:
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "id": 1,
            "uuid": "9e534adf-f1aa-4026-ada1-97677114a7cd",
            "name": "CASH",
            "status": null,
            "createdAt": "2021-02-19T13:43:37.000Z",
            "updatedAt": "2021-02-19T13:43:40.000Z"
        },
        {
            "id": 2,
            "uuid": "0afa37c0-7382-4f38-a4cd-97d3c0efba26",
            "name": "CARD",
            "status": null,
            "createdAt": "2021-02-19T13:43:53.000Z",
            "updatedAt": "2021-02-19T13:43:55.000Z"
        },
        {
            "id": 3,
            "uuid": "18c8f70f-842a-463e-b0bf-c5ad9f086227",
            "name": "WALLET",
            "status": null,
            "createdAt": "2021-02-19T13:44:08.000Z",
            "updatedAt": "2021-02-19T13:44:10.000Z"
        }
    ]
}
*/
/**
 * @api {post} static/v1/managePages/getManagePage get static page data
 * @apiDescription get static page data
 * @apiVersion 1.0.0
 * @apiName Static page data
 * @apiGroup Static Service
 * @apiPermission public
 * @apiExample {curl} Example usage:
 * curl --location --request POST 'https://{server}:{port}/static/v1/managePages/getManagePage \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI4MjE3MzUsInVzZXJJZCI6IjQwIiwicm9sZUlkIjoxLCJlbWFpbCI6ImhhcmlzaEBibG9ja2dlbWluaS5jb20iLCJpYXQiOjE2MDI4MTgxMzV9.xkIR9ud6H7rHeilz1xrJbPnGFuJjEFkqLgTLjWPHBe8' \
        --header 'Content-Type: application/json' \
   --data-raw '{
	    "title": "PRIVACY_POLICY"
      }

}'
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} x-access-token JWT token
 *
 * @apiParam  {String}     title           Title of static page data (Required)
 * @apiParam  {String}     type            Type of Email (Required)
 * @apiParam  {object}     variable        variables of Email Template (Required)
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
 
 * @apiSuccessExample {json} Success-Response:
 {
        "responseCode": "SUCCESS",
        "message": "success",
        "code": 200,
        "result": {
            "id": 2,
            "uuid": "d418bab4-9396-11eb-a8e0-e15068760717",
            "pageTitle": "PRIVACY_POLICY",
            "description": "some text for privacy policy here",
            "isDeleted": 0,
            "status": 1,
            "createdAt": "2021-04-02T09:35:57.000Z",
            "updatedAt": "2021-04-02T09:35:57.000Z"
        }
    }
 */

/**
* @api {get} static/v1/driver/sms Get SMS list
* @apiDescription Get the list of all the SMS
* @apiVersion 1.0.0
* @apiName getSMS
* @apiGroup Static Service
* @apiPermission public
* @apiExample {curl} Example usage:
* curl --location --request GET 'https://{server}:{port}/static/v1/driver/sms \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI4MjE3MzUsInVzZXJJZCI6IjQwIiwicm9sZUlkIjoxLCJlbWFpbCI6ImhhcmlzaEBibG9ja2dlbWluaS5jb20iLCJpYXQiOjE2MDI4MTgxMzV9.xkIR9ud6H7rHeilz1xrJbPnGFuJjEFkqLgTLjWPHBe8' \
        --header 'Content-Type: application/json' \
   --data-raw ''
* @apiHeader {String} Content-Type application/json
* @apiHeader {String} x-access-token   jwt token
*
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
* @apiErrorExample {json} List error
{
   "responseCode": "NOT_FOUND",
   "message": "resource not found",
   "code": 404
}
* @apiSuccessExample {json} Success-Response:
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "id": 1,
            "uuid": "3edc6810-9ddc-11eb-887b-651db0c26490",
            "type": "Registration",
            "body": "<HTML><p>Dear Customer [CUSTOMER_NAME],<br><br>Congratulations, your account has been successfully created. Welcome to Ourlane</p</html>"
        },
        {
            "id": 2,
            "uuid": "3edc6811-9ddc-11eb-887b-651db0c26490",
            "type": "Login",
            "body": "<HTML><p>[OTP] is your Verification Code (OTP) for mobile number verification. PLEASE DO NOT SHARE</p></html>"
        }
    ]
}

*/