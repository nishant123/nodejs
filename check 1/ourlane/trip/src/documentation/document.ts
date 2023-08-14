/**
* @api {get} trip/v1/car/searchCar?pageNumber=1&perPage=10&keyword=1567 Global Search Car
* @apiDescription Global search car after successful login
* @apiVersion 1.0.0
* @apiName Car Search
* @apiGroup Car
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token    jwt token
* @apiParam  {String}     keyword       Optional (query params)
* @apiParam  {String}     perPage       Reqired (query params)
* @apiParam  {String}     pageNumber    Reqired (query params)
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
    "responseCode": "UNKNOWN_ERROR",
    "message": "Undeclared variable: NaN",
    "code": 500
}
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "uuid": "e8de1e8f-783c-47a3-9c0d-5c12098a9838",
            "carNumber": "1567",
            "carModel": "BMW",
            "carCapacity": "5 seated",
            "carFactor": "00.02",
            "carOdometer": "678",
            "driverId": 7,
            "driverName": "Rahul Customer",
            "status": "Active",
            "updated_at": "2021-02-22T12:17:37.000Z",
            "created_at": "2021-02-22T12:17:37.000Z",
            "carImage": "https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1613996256745_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210222%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210222T124857Z&X-Amz-Expires=300000&X-Amz-Signature=082672ce471a8245421c41ae475c3139e39296bab995cfc154080684733ee607&X-Amz-SignedHeaders=host",
            "bookingFees": 100,
            "pricePerKilometer": 20,
            "pricePerminute": 10,
            "addDescription": "Add description here",
            "driverStatus": "Available"
        },
        {
            "uuid": "4d1e36ff-8a61-4bff-9d44-58de3205f8f3",
            "carNumber": "1567",
            "carModel": "BMW",
            "carCapacity": "5 seated",
            "carFactor": "00.02",
            "carOdometer": "678",
            "driverId": 3,
            "driverName": "Balwant Kumar",
            "status": "Active",
            "updated_at": "2021-02-22T12:16:49.000Z",
            "created_at": "2021-02-22T12:16:49.000Z",
            "carImage": "https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1613996207783_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210222%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210222T124857Z&X-Amz-Expires=300000&X-Amz-Signature=ea80be988edab05d414520d1a0282377bd740b25b45a81d1285854bd1c061672&X-Amz-SignedHeaders=host",
            "bookingFees": 100,
            "pricePerKilometer": 20,
            "pricePerminute": 10,
            "addDescription": "Add description here",
            "driverStatus": "Available"
        }
    ]
}

*/

/**
* @api {get} trip/v1/trip Get Trip by driver
* @apiDescription Get all Driver trip exclude scheduled trip
* @apiVersion 1.0.0
* @apiName Get Driver Trip
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token    jwt token

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

* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "count": 1,
        "rows": [
            {
                "uuid": "aa54631d-f044-47fb-82e9-a39cf2d4eaa2",
                "tripId": "HT1615532628",
                "tripDate": "2021-03-13T05:55:29Z",
                "status": "Completed",
                "startLocationName": "Noida",
                "endLocationName": "Gujrat",
                "driverId": 2,
                "paymentType": "CASH",
                "paymentAmount": 2000,
                "totalKms": 10,
                "totalTimeInMinute": 5,
                "customerFeedback": null,
                "driverFeedback": null,
                "ratingCustomer": 0,
                "ratingDriver": 0,
                "canceledBy": null,
                "tripType": "Scheduled",
                "startLat": 28.6117,
                "startLong": 77.325,
                "endLat": 28.6297,
                "endLong": 77.2765,
                "driver_details": {
                    "fullName": "Balwant Kumar",
                    "mobileNumber": "9015632174"
                },
                "customer_details": {
                    "fullName": "Balwant Kumar",
                    "mobileNumber": "9015632174"
                },
                "carImage": "https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1615532044999_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210316%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210316T075607Z&X-Amz-Expires=300000&X-Amz-Signature=eb55084912715cae16f3ce6da1762bf72c7085bff34bc8861d840fdb1ee73c6e&X-Amz-SignedHeaders=host",
                "carNumber": "DL57856",
                "carModel": "9 zAaa"
            }
        ]
    }
}

*/

/**
* @api {post} trip/v1/trip Trip Creation
* @apiDescription Trip creation  after successful login
* @apiVersion 1.0.0
* @apiName Trip Creation
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){String}     locationType             Location Type (Required)
* @apiParam  (Body Params){String}     startLocationName           Start Location Name (Required)
* @apiParam  (Body Params){String}     endLocationName           End Location Name (Required)
* @apiParam  (Body Params){Float}     startLat                 Start Latitude (Required)
* @apiParam  (Body Params){Float}     startLong           Start Longitude (Required)
* @apiParam  (Body Params){Float}     endLat           End Latitude (Required)
* @apiParam  (Body Params){Float}     endLong           End Longitude (Required)
* @apiParam  (Body Params){String}     paymentType       Payment Type (Required)
* @apiParam  (Body Params){String}     cardType           Card Type (Optional)
* @apiParam  (Body Params){String}     cardNo           Card No (Optional)
* @apiParam  (Body Params){Integer}     paymentAmount           Payment Amount (Required)
* @apiParam  (Body Params){Integer}     driverId           Driver Id (Required)
* @apiParam  (Body Params){Float}     totalKms           Total Kms (Required)
* @apiParam  (Body Params){Float}     totalTimeInMinute           Total Time In Minute (Required)
* @apiParam  (Body Params){Datetime}     dateTime           Date Time (Required)
*
* * @apiParamExample {json} Request-Example
{
    "locationType": "Home",
    "startLocationName": "Mayur Vihar Phase 3",
    "endLocationName": "Laxmi Nagar",
    "startLat": 28.6117,
    "startLong": 77.325,
    "endLat": 28.6297,
    "endLong": 77.2765,
    "paymentType": "Cash",
    "cardType": "DEBIT",
    "cardNo": "987076452233",
    "paymentAmount": 2000,
    "driverId": 7,
    "totalKms": 5,
    "totalTimeInMinute": 30,
    "dateTime": "2021-02-26 12:10:02"
}
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "customerFeedback": null,
        "driverFeedback": null,
        "ratingCustomer": null,
        "ratingDriver": null,
        "id": 9,
        "uuid": "2594f33a-d369-4b68-b630-bc89dc458971",
        "locationType": "Home",
        "tripId": "HT1614056167",
        "tripDate": "2021-02-23T10:26:06+05:30",
        "customerId": 6,
        "driverId": 7,
        "status": "Scheduled",
        "startLat": 28.6117,
        "startLong": 77.325,
        "endLat": 28.6297,
        "endLong": 77.2765,
        "startLocationName": "Mayur Vihar Phase 3",
        "endLocationName": "Laxmi Nagar",
        "paymentType": "Cash",
        "cardType": "DEBIT",
        "cardNo": "987076452233",
        "paymentAmount": 2000,
        "otp": "4423",
        "totalKms": 5,
        "totalTimeInMinute": 0,
        "tripType": "rightNow",
        "updatedAt": "2021-02-23T04:56:06.717Z",
        "createdAt": "2021-02-23T04:56:06.717Z"
    }
}
*/

/**
* @api {put} trip/v1/trip Update Trip PickUpTime
* @apiDescription Update Trip PickUpTime
* @apiVersion 1.0.0
* @apiName Update Trip PickUpTime
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){String}     uuid             Trip uuid (Required)
*
* * @apiParamExample {json} Request-Example
{
    "uuid": "348dbec2-bcdf-4eb3-a434-4af9b669fafd"
}
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
* @apiSuccessExample {json} Success-Response
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
* @api {post} trip/v1/trip/updateTripStatus Trip Acceptance
* @apiDescription Trip Acceptance from driver side
* @apiVersion 1.0.0
* @apiName Trip Acceptance
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){String}     uuid             Trip uuid (Required)
* @apiParam  (Body Params){String}     status           Status (Required) [Ongoing/Rejected/Completed]
* @apiParam  (Body Params){Number}     totalKms           Total Kms (Optional)
* @apiParam  (Body Params){String}     reason           reason (Optional)

* * @apiParamExample {json} Request-Example
{
    "uuid": "9cebdcd1-b52c-4889-9059-ff5d5842f582",
    "status": "Ongoing",
    "totalKms": "0",
    "reason": ""
}
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "id": 21,
        "uuid": "1d7f324c-b325-4d17-818a-b4489a2fffa1",
        "locationType": "Home",
        "startLat": 28.6117,
        "startLong": 77.325,
        "endLat": 28.6297,
        "endLong": 77.2765,
        "startLocationName": "Mayur Vihar Phase 3",
        "endLocationName": "Laxmi Nagar",
        "paymentType": "CASH",
        "cardType": "",
        "cardNo": "0",
        "paymentAmount": 2000,
        "status": "Ongoing",
        "tripId": "HT1613621846",
        "tripDate": "2021-02-18T04:17:26+00:00",
        "otp": 6393,
        "customerFeedback": null,
        "driverFeedback": null,
        "ratingCustomer": null,
        "ratingDriver": null,
        "pickUpTime": null,
        "dropTime": null,
        "description": null,
        "canceledBy": null,
        "totalKms": 0,
        "totalTimeInMinute": 0,
        "tripType": null,
        "createdAt": "2021-02-18T04:17:26.000Z",
        "updatedAt": "2021-03-01T04:51:06.000Z",
        "driverId": 78,
        "customerId": 78,
        "driver_details": {
            "fullName": "Raushan Kumar",
            "mobileNumber": "9015123632"
        },
        "customer_details": {
            "fullName": "Rakesh Kumar",
            "mobileNumber": "9015621345"
        },
        "totalFare": 300
    }
}
*/

/**
* @api {post} trip/v1/trip/tripList Trip List
* @apiDescription All Trip List from driver side
* @apiVersion 1.0.0
* @apiName Trip List
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){Number}     perPage             perPage uuid (Required)
* @apiParam  (Body Params){Number}     pageNumber           pageNumber (Required)
* @apiParam  (Body Params){String}     searchByName           searchByName (Optional)
* @apiParam  (Body Params){String}     tripStatus           tripStatus (Required) [Completed/Rejected/Ongoing/Cancelled/Scheduled]
*
* * @apiParamExample {json} Request-Example
{
    "perPage": 10,
    "pageNumber": 1,
    "searchByName": "",
    "tripStatus": "Scheduled"
}
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "count": 6,
        "rows": [
            {
                "uuid": "d60e88ed-31fe-4ce0-9d8d-5a3440a24d6a",
                "tripId": "HT1615868535",
                "tripDate": "2021-03-16T04:22:15Z",
                "status": "Scheduled",
                "startLocationName": "Sector 14 fardbad",
                "endLocationName": "Dav Public School, Faridabad Sainik Colony, Sector 49, Faridabad, Haryana",
                "driverId": 2,
                "paymentType": "CASH",
                "paymentAmount": 200,
                "totalKms": 8.087,
                "totalTimeInMinute": 22.25,
                "description": null,
                "customerFeedback": null,
                "driverFeedback": null,
                "ratingCustomer": 0,
                "ratingDriver": 0,
                "canceledBy": null,
                "tripType": "Rightnow",
                "startLat": 28.4001,
                "startLong": 77.3304,
                "endLat": 28.3979,
                "endLong": 77.2737,
                "driver_details": {
                    "fullName": "Tony Stark",
                    "mobileNumber": "9900770011",
                    "profileImage": null
                },
                "customer_details": {
                    "fullName": "Aditya Jaitly",
                    "mobileNumber": "7838582402",
                    "profileImage": null
                },
                "driver_info": {
                    "locationName": "Home",
                    "addressLatitude": 12.9291,
                    "addressLongitude": 77.5362
                },
                "totalFare": 806.525
            },
            {
                "uuid": "b5afed32-f907-4f3a-976e-70d3e22cf24d",
                "tripId": "HT1615807194",
                "tripDate": "2021-03-15T11:19:54Z",
                "status": "Scheduled",
                "startLocationName": "79, 1st Cross Rd, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India",
                "endLocationName": "Metro Station Mysore Road Nayanda Halli, Bengaluru, Karnataka",
                "driverId": 2,
                "paymentType": "CASH",
                "paymentAmount": 3,
                "totalKms": 4.141,
                "totalTimeInMinute": 12.8833,
                "description": null,
                "customerFeedback": null,
                "driverFeedback": null,
                "ratingCustomer": 0,
                "ratingDriver": 0,
                "canceledBy": null,
                "tripType": "Rightnow",
                "startLat": 12.9288,
                "startLong": 77.5362,
                "endLat": 12.9459,
                "endLong": 77.5302,
                "driver_details": {
                    "fullName": "Tony Stark",
                    "mobileNumber": "9900770011",
                    "profileImage": null
                },
                "customer_details": {
                    "fullName": "Archana ML",
                    "mobileNumber": "9743994561",
                    "profileImage": null
                },
                "driver_info": {
                    "locationName": "Home",
                    "addressLatitude": 12.9291,
                    "addressLongitude": 77.5362
                },
                "totalFare": 510.575
            }
        ]
    }
}
*/

/**
* @api {post} trip/v1/driver/updatedriverStatus Update Driver Status
* @apiDescription Update Driver Status from driver side
* @apiVersion 1.0.0
* @apiName Update Driver Status
* @apiGroup Driver
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){String}     status           Status (Required) [Available/Unavailable/Driving]
* @apiParam  (Body Params){Number}     latitude           Latitude (Required)
* @apiParam  (Body Params){Number}     longitude           Longitude (Required)
* @apiParam  (Body Params){String}     location_name           Location name (Required)
*
* * @apiParamExample {json} Request-Example
{
    "status": "Available",
    "latitude": "28.456",
    "longitude": "77.3455",
    "location_name": "Ayodhya"
}
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
* @apiSuccessExample {json} Success-Response
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
 * @api {post} trip/v1/car/updateCar Update Car
 * @apiDescription Update car after successful login
 * @apiVersion 1.0.0
 * @apiName Update Car
 * @apiGroup Car
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiParam  {String}     uuid             UUID(Required)
 * @apiParam  {String}     carNumber        Car Number(optional)
 * @apiParam  {String}     carModel         Car Model(optional)
 * @apiParam  {String}     carCapacity      Car Capacity(optional)
 * @apiParam  {String}     driverStatus     Driver Status(if pass driver status then driver id it should) (optional)
 * @apiParam  {Number}     driverId         Driver Id(optional)
 * @apiParam  {String}     carOdometer      Car Odometer(optional) 
 * @apiParam  {String}     carFactor        Car Factor(optional)
 * @apiParam  {Number}     bookingFees      Booking Fees(optional)
 * @apiParam  {Number}     pricePerKilometer Price Per Kilometer(optional)
 * @apiParam  {Number}     pricePerminute    Price Per Minute(optional)
 * @apiParam  {String}     addDescription    Add Description(optional)
 *
* * @apiParamExample {json} Request-Example
{
    "uuid": "e8de1e8f-783c-47a3-9c0d-5c12098a9838",
    "carCapacity": "5 seated",
    "carFactor": "00.02",
    "carModel": "BMW",
    "carNumber": "BM1567",
    "carOdometer": "678",
    "carStatus": "Available",
    "driverId": 7,
    "bookingFees": 100,
    "pricePerKilometer": 20,
    "pricePerminute": 10,
    "addDescription": "Add description here",
    "carDescription": "BMW cars price starts at Rs. 37.20 Lakh .",
    "carImage": "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBIPEBIQDw8PDw8PDw8PDw8PDw8PFREWFhURFRUYHSggGRolHhUVITEhJSkrLi4uFyAzODMsNygtLisBCgoKDg0OFxAQFy0lHx8rLS4vLS0tLS0rLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLf/AABEIAOAA4AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQYHAP/EADwQAAIBAgQDBgIIBQMFAAAAAAECAAMRBBIhMQVBUQYTImFxkTKBByNSobHB0fAUQmJy4TOCkkNjorLx/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACgRAAICAQQBAgcBAQAAAAAAAAABAhEDBBIhMUEiURMyQmFxocGBBf/aAAwDAQACEQMRAD8Avkn2SGAk5ZxmgHJJFOHCQndwAXCS4pwgSXyxjFWSLVEj7rAOkZLQg6RarTmiyReosZNGRXSI1FmxXSZ1dIEiLCVAl2lQYhEgSbT4GTGBUiRaXkWgBURiksEojVJYgCIkKElqaQwSIAOSUNONZZBSFhQg9KLuk1GSLVqUYGXVWKsJoVUilRZSA9HWFUSqiEAmZuXVZbLIWEEBg8s+Ihcs+ywAXZYJ1jbCL1JQhR1iWKqKguxCjzNpl8f7SCmxpUSC40ZxZgp6Dlecy+Ndzd2Lm+7Ne3pA2x4N3bOoqY6mdmB9AYGrrMihUFs9hbS5F7xhMWGA5D7TNb19Irfsay0+KKtyIxKka2028ouDOm4VgWqqwKqxtcAlXVx62uNNZ9xTsjVWicVQVmpLrVpWu9IfaH2l38xKaafKOCWy/S7OaEuDBAybwJCXn15S8m8ADUxG6YilIx2mIAM04cLBUxGUEljK5JOSGVZbLEAqacDVpzQyQb04BRiV6URq0pt16cQq05SEdshhhFaZh1MzNgoMIpgRDIIAEk2kCXEoYGpMPtLxL+Gw71d20VB/W2gm9UE87+kfEAvSog3YXfLyAOgJ89DLirYHIJULNc3JJufWPU1BsL2JIA5A+svw/A2YFipGl7a28puDAKSNNQbHL95+6OckmduHHJxdAKOBVgVbMhHMEWPyIsZn43hz02upIuBkqElQG0upI2/CdPwzDUalVaVWqaNMkIapAYUxrq23pflPScD9HOCpr9aamKLWOY1GpJboAh29SY3mhGO5s5cmKeOS3I8FXH4jC1jVpOKbvc/VkstidvFfNbkTfbedt2c+kbHa0mSi96bAFiU8Vvjy63HXlPUB2Q4dSuUw1NTp4rFm08zcxPFcGwQ17inpu1tdBtf0nHl/6+nh6W7IhppTlaVHlNbjVNKYD2drXzGmqXNuWusyG42jXspJ6D9I92i7hsTU7pFFNXYLpobHWw5CJLYbWHppO6Ga4ppGUlTZVOIk3+oY3ta4AAF/lCDEk2+pYdbOv5mfBpYGDnfgkYQi+l7edr/dHqJmchjtBpmwNKmIwoi9I6RqmJLGEUQlpCiXEkZUCQ4hQIOpGAhXWJVEmlUWKOsYjoUEMsGkMokGhZYdINVhkWAyRLAz60iMZDzyLtFUFXH1TcZRUyZjt4dPyPtPXGM8Mx1S9aowvY1XIubm2Y2v5zbGF0dArLo40IzLk5XNhoLesZo41ltY3v8A50/fWYGDr6XP+BuAY4rc+p9ecyyRPU0+S+jabGEiwAuc2Y211A/QTW4D2qxmEsqualIadzUN1Hmp5fLSc5h1I258/wAo0gbmPScc65Xg7njWRVJHrXDu01PF09PBU5oxFxoNuo/Scl23489KmtCmbPUzM7dKe1h6m/tMfAJYg/8Az0Mz+0+FqrU7xszUiAqOdcv9BPv+7zz8OhwPUqd9fS/1RxarHPBiairT8+35MNjzkZpDQZM+go8MMHlw0VvLo0YDqNG6DRCkY3RMQGvQaPUjMvDtH6LSSkPLLiBRpcNEygkG8nNKMZIgTxVxGXMXaMRv0owsBTjCySwiQoglhAYDLypn15DGMAGMayOeit+E8Oq6sTfck3HrPY+01Qrg8Sw0Iw9W3zUj854yZtiJkx7B4Nr7dPY850OF4fmIHT92nPcJx3c1ASLrqCPI8/30npHDKVOshqU7MNiBa4Ol7/KcmrlOPKXB6einj6fZipg7CwG2/wCscw+GIIBF5qJgCPGASAbGH7r201++eNk1DPbxteBWjhunLX9iatDDAqVdc6MLMp1BBglUA3Gl49Qq225bjy5ziyZJNWXJ8UcF2s7OPgmDC7YeoT3VTcjn3b9GA9xr1A5pp75WwNPF4d8NWF0qKLHZlYaqw8wZ4pxnhjYavUoPq1NstxcXG4M+j0GqebH6u0fKarB8OTrozZdBLCnLqk7zlDUhG6SxemI7h1ksBmjHqZi1JI0qySkMI0IGgUEKBEUSWkFpDQTtEBLtAMZLvBM0dEnTJGFMXWEUyDQMGl1aL3l1aIBi8gyqmXjGJcVw/e0KtPm9Kog9SpAniZHqPXcT3eeP9qsCaGLrJspY1U/sfxaehJH+2a4n4JaMhZsdnuNvg6oYE909hUGpFuTAeUxyJ8BNmk+xnsnAOJqzGxV0qKtRNBcXBJF5pPSQtbZW2Ntjv+s8f4RxaphiLeNAQ2Q201vp+k9H4HxVMSpKG6g3AOhVSb5SPI/hPH1uiXzQXB6Gl1TTqTNX+GHwty5jp1lqdE0zlbY/C0ZpHUA9PbrGO7DqUa39J2/tPlPDUKfJ67yWhjA1Dax0Kzn/AKSeCd7SXGIPHTAWpYbp1+W/yM1+H1cw/qUlGB3uDYgzcoUFq02pNs6lddR+9p2aWUsWU4NVGMo2eA93LCnNXjfDDhsRUokEZG8N/snUa89NPlExTn0aZ4TVAqaR6gkHTpx2gkLBBqSxlElaaRpEklpAwstaFyyMsBgWgKgjTCLVREJirmCZoSrAGMk6zNJV4EtIDTMsaDS6tFVaFVohjSNCZouhly0ACFpyf0gcJNWkMSgu9AEOBu1Em5/4nX0JnTZ5IeOLp2B4kfulROv7T9kjSLV8MC1K5Z6I1ZBzKdRvpynIkg6jY6zpTvoEyc9pqcIxbUamekb7Zl2JHpMkESUfKbg26GUiZnuHAuJLXpqwIv8AzC+zDceXpNunSHyIuP0nkvZ7i3dkPupNyB6aqfTQjlv5T0ng/F6dcXVgSuUkcwDoLieXqdEvmiv8OvTaz6ZMze0OJfB4qjiFNqNU93iFI8Omneg9bFb+nt1+AxwYAgggagjYiZXaLDDEYVwAC1MiooPO2hB6XBI8r35TjOzfFHwtTuCc1MAGlm0+r5D5XsenymEcDlHau0dMsi78HS/SbwwMKeLUcgj+nL2P3vOAFOes1qtLG4V6aMCLEsp+JARr7HK3ynmNSiVYqRYqSD6ieji3bFu76Z5eRJSddAadOOUkg6axumsslBaSxlVg6aw4gaIqVlCIYwZEAAtAVRGWgKkQjPrRZo1WEAyxWZs3Q8nPFs8kPJLsbRoZGiStDI0QIdVpJeLK8veIYTNLAwMteNDCZpw/bDs6FLYmguhJNamo2POoo/EfPrOzJlGaaRdAzx63Pl1n1p0XFezVVM70xmUMxyDfLfQgczblOdzzf8E2n2PcLxxomxXOpIO9iD1BnR4euobvaD5TY2I0sDuhB/e049G18vwj/Dca1Bw41PMH+YWtNY9HPJUz1TgPalfCmIulxkNQAsjKRYhgNba78vSY2Lwfe3FM3q0Xd6BBFqgv4kJ89/mZz68QRmzJsd1O5PM+U3OFcRp/ETlZdcttSRtb1mU8MZp06l/TbDnlGSUuv4aPZ7iBDJWp+FhoQR8mRh7gjyn3GqVytYCwqCxH2WXS3tb2iOKrjDkYlLGjWYCqh0CVDtUHQG1j5285qUB3tKopGutZALnKdz92YfOPFkjqMdpc+fyidRjeCaTfF/oyVEapCAAjFKcxaGVl5RZN47KJMgz68iKxgngXhqkA0RLFqqxdhGqkWMTZmxgNCKYCEUwKDqYZWi6mFUxDsOGhVMCsIIDQUSZTNILRjLEwTySYXB4dqzFEB8Nrkjw632PP/Mtcj7MLtBj2oUrr8THKDa+XTf1nnVV7sSSTckkne53noHbfhVRKtKmjmsXVj3YFhSsQCSdrG+56GcxwzgHfVKgd/BSqZGyf9RtyATsNtbc5vFqMTOUXfJhkEGFD8j8jO14xwhK4zLZKoFgw2YDZW8vPl905HEYdqbFHGVhy5HzB5iaQkpGU78heHnxWuA24U6ZwNwDtfoOfWb+BBLMmzpbQ6G3Qg6g6Tk2W23L3E0MLxR8yuTepT8IfS9RL37t+tuR85VckbbXB22Ada1N8NU+CqpW+5psTvb1/OaPZpqlArSrfGoKq+hWsoGhB+11B6X2nO8Oxlx32VgoYXPhtr+U6mhiqZVcxBVjYXFxfcD10uPSZ71in6fJptlOHq8CGLUK7AbXuPmL2++3ykUmlMdUy1u7NsjLmot53JYfO/wD69TKqZhNK7XTLj7DoeWDxRXlw8guxm8qWgs8qXiCy7tAMZ8zwLNEyWyXMDaWZpAkklhLqIRacuElMqiqiFQSVSXVIgLrL3kAQeKqZEZ/sqza7aCNIYQmRe+g1PTnGeH8PesiHUMxYtckhVLEqATbYECbCmhhFUsoNQ5uVybG17e00+G12UlYngeDswz1TkQddzLY/ia0l7qha+xa23+YrxDiVStuSqbBQeXmZmsIN+EXuUejE43x0UHdWuXNHvEffM9yMp/H3kcHw3c0UU/Gwz1OudtT+Q+U+49hlqVcKpALGsxv/ANtVzMPQkLH6gj8GTBs0Tx2DSsuVxt8LD4lPlG7SpEm66JZxuPwD0TZtVPwuNj+hiLKPQ9f1nd1qYYFWAYHcHac1xPhJp3ZLsnTdl/UfvznVDNu4Zk41yhPhfEDQZT8SklXU/CaZGo97H5TsOC4lHU0mJNNtUN7MpU6G/JgZwdQeVvwImjwrHmnUAJ8JK89nCgZh6yMuO+jWM+Dvq+GNVDSJBceKk40zEbeh5EecSoVsyg7EaMOjDeMcJxi1EAPXluD1EX4knd1c+4qGzGw3Ox9efuIPFSoSdqwyvLd5FFqS+ecw7Gc8qakBnkF4hWEZ5QtB5pMTEWl1kKJcCSA1g6veoHIs2q1B9moujD3/ABhmsNToBuToIlXvSrlEZU/jFbuywzKuKRdCRzDD8Iu9biTadxh10IYlr5raEZeV5u43yam1k8pdVmDw/CY8WrB6aX1XCVAWpovJSev6xurxqpS/18LVX+qj9ahPlbX3i2ezEa4WfLw965CKNCy5z/SDe3ryh+GMtQBnGQMRZGNmF9s1tj5TVrYxaQKqLaaADX3lxx7XchpWD4piP4XDs1i9soCqBmLFgoAHqZh1qjVGzNe9gNTe1uQnP1+0FfG44Ye+XD0ajOyru7U72Zj620nRIsMsvAFMsqyRnLIyzIKMOlmfFVCDanRppTO92qNdjztbKVvodxtaMVacJwxPq853rPUrf7WYlB/xyj5QlRZTFQgVlGEaZYBxChCzwDw9WKuYUSzL4hwsN46WjbldgT1HQzBrob7ENexAFtfTkZ1+aLYvCLU1+F7WDWvcdGHMTaGXxIhryjM4dxNqNWx0GcH0BOo+8ztqxWshRuY0I3HmD12PynnOPoMjWYEH1uD5g8xOg4DxIuAjHVbC/lyM0l9i4sfoVTrTe3e09Cw0FROTj9/gYYNIxuHLWZf9RdRyDA7qfWQQRowsek5snPIbaLFpBaVn0yEWBhVgVhViYBlhRBpGFEQDnEuHUqyjvBql2RxcPTb7SnrPuH44ORScjvwtzpbvEBsKq+v6z7x1ahTvKapb4Mv1lvM3mkvCqZek17PSBysLaqRZkPlt7Tp2OqZsQEjGGwmY3bRR95hCtNT4thub6Sj4xagvTIK7XB6coKKjywoRr0AmJz0kTKy2qOScwI5KNvnJxFQKrO2yqzH0AufwhSInxU2oVT0o1T/4GQ3bBs43sLTapXr1zzBB/uZsxnbKs5z6OcKzYXEVFW4pNnc3UAKFNhrzNjYToMHUd0DOndsdcl8xUX0v52lZFzYkHlKi3BHUESSZGaZjKuIvUEYYyjRgKMIvWEdYRSvKRLRm12tEmqRnFmIkR0Qy+efB4GTeFEhK9Jai5XFwfceYmQmD7onKxNQOAmlgwKscvsu/WaymBxuFeoM1M+NLNl5tlNxbzGvuZeN06EzQ4Zju9pg/zLZXHMETUal3iH7SajzXcj85zOGbvLVqdlqgZalPYN1U/iDNXhuP1DDloQdCOqt0O80lAN5aWCw2JpDNddmGYenWSizklGnRSdoEKcIqQoSGWjJHQNEh1WWWlJK2iAVocKxpZqgqUqRbS2UubesaweBxauO8qB1N/Enht8puIYVRNd7Zsc3xim2HdarlqmDKmniA3i7ok2FXrl69NIbsrZaT0QyutGqyoy86beJD7Gb1SkrAqwBVgVYHUEHcGcjgsHVwGJalSRXpVUzU/Fld1ViSuujOoPqRYxp2qEdQRM3jtTJh6p5mmygdSwyj8YSjxii9E4jx06Qvc1UZdmy289ZyXa/tBTrItKiSy95d3GisAulj6k79IoRbZLH/AKPv4ilh6yeFaFZ1zKVvUZk1BB/lH46zo4h2fS2GpXFiyZmGu7a848xhN2wPmMGTLNByLA+vIJk2lGlIoo7RLENpGahiVcyyWZuIMUMbrxRxGQVMpeWnxWIVFkhqZglWHRYh0U/hxn7wXVj8RXTP/cOcOMMC/eC6sQA1tmttcfnLosbo07xb2vIUEoC4yndblfTmPz94wlKWFHS43GohqOvl5Qm1L1IIquCEpWhQghAJVpkUT3cEwhA0HARo0mjKtEKTRlGlmgcvE+I4bv0yhslRWD0anOnVHwt6ciOYJEMzxZq4BAvYk2F+Z6QX2GK0qi4ymyVUUADu8RRIPhrA62PTQEH0nEcN4bTfHd3TuaFNy92OYlVPM+ZtOv7R8XFGkUX/AFagIFv5V2LH8pldkMOoSoRc1s4Dra2WnbQ+/wC9JrG6bIZ04Ol4ItLM1oG+swYMKxlVEi8usVgSRBPDMYFzNEUhWrEcQY5XaZ9ZpZLEqsXaNVIM04myQBWVsYZ6csEktgQghlWVQRpVk2BNBRtHqNOL0Ej1MRNjCoNJDJY3HzkrLrEmAZdRKuklGn2cQAA1xB55eq8SqvrpAR//2Q=="
}
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
* @apiErrorExample {json} List error - if  uuid is wrong
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "msg": "Car not found"
    }
}
* @apiErrorExample {json} List error - if uuid is not provide
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "msg": "Please provide uuid for update the car"
    }
}
 * @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "msg": "Car updated successfully"
    }
}
*/

/**
 * @api {post} trip/v1/car/deleteCar Delete Car
 * @apiDescription Delete Car after successful login
 * @apiVersion 1.0.0
 * @apiName Delete Car
 * @apiGroup Car
 * @apiPermission private
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiParam  {String}     uuid             (Required)
   *
* @apiParamExample {json} Request-Example
{
   "uuid": "91ef4cb6-059a-45ea-8be6-8f70a61eea80",  
}
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
 * @apiErrorExample {json} List error - if uuid is wrong
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "msg": "Car not found"
    }
}
* @apiErrorExample {json} List error -if not pass uuid 
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "msg": "Somthing went wrong"
    }
}
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "msg": " car deleted successfuly"
    }
}
*/


/**
 * @api {post} trip/v1/car/create Create Car
 * @apiDescription Add car after successful login
 * @apiVersion 1.0.0
 * @apiName Create Car
 * @apiGroup Car
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiParam  {String}     uuid                  UUID(Required)
 * @apiParam  {String}     carNumber             Car Number(Required)
 * @apiParam  {String}     carModel              Car Model(Required)
 * @apiParam  {String}     carCapacity           Car Capacity(Required)
 * @apiParam  {String}     carStatus             Car Status(optional)
 * @apiParam  {String}     carFactor             Car Factor(Required)
 * @apiParam  {String}     carOdometer           Car Odometer(Required)
 * @apiParam  {NUmber}     driverID              Driver Id(optional) (if pas driverStatus then only pas driverID)
 * @apiParam  {NUmber}     driverStatus          Driver Status(optional) 
 * @apiParam  {numbder}    bookingFees           Booking Fees(Required)
 * @apiParam  {number}     pricePerKilometer     Price Per Kilometer(Required)
 * @apiParam  {number}     pricePerminute        Price Per Minute(Required)
 * @apiParam  {String}     addDescription        Add Description(optional)
   *
* @apiParamExample {json} Request-Example
{
    "carCapacity": "5 seated",
    "carFactor": "00.02",
    "carModel": "BMW",
    "carNumber": "1567",
    "carOdometer": "678",
    "carStatus": "Available",
    "driverId": 7,
    "bookingFees": 100,
    "pricePerKilometer": 20,
    "pricePerminute": 10,
    "addDescription":"Add description here",
    "carDescription": "BMW cars price starts at Rs. 37.20 Lakh .",
    "carImage": "data:image/png;base64,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"
}
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
 * {
    "responseCode": "UNKNOWN_ERROR",
    "message": "All fields are required",
    "code": 500
}
 * @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "id": 4,
        "uuid": "e8de1e8f-783c-47a3-9c0d-5c12098a9838",
        "carNumber": "1567",
        "carModel": "BMW",
        "carCapacity": "5 seated",
        "carFactor": "00.02",
        "carOdometer": "678",
        "driverName": "Rahul Driver",
        "driverId": 7,
        "carImage": "1613996256745_img.png",
        "bookingFees": 100,
        "pricePerKilometer": 20,
        "pricePerminute": 10,
        "status": "Active",
        "addDescription": "Add description here",
        "updatedAt": "2021-02-22T12:17:37.786Z",
        "createdAt": "2021-02-22T12:17:37.786Z"
    }
}
*/

/**
 * @api {post} trip/v1/savedPlaces/createAddress Create Address
 * @apiDescription Save place  after successful login 
 * @apiVersion 1.0.0
 * @apiName Create Address
 * @apiGroup Address
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 *
 * @apiParam  {String}    locationType             Location Type(Required)
 * @apiParam  {String}    endLocationName           End Location Name(Required)
 * @apiParam  {Number}    endLat                    End Latitude(Required)
 * @apiParam  {Number}    enLong                    End Longitude(Required)
 *
* * @apiParamExample {json} Request-Example
    {
        "locationType": "work",
        "endLocationName": "dubai",
        "endLat": 22.8057,
        "enLong": 86.2019
     }

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
 * @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "status": true,
        "isDeleted": false,
        "id": 1,
        "uuid": "32807874-6eea-4c0b-a343-ad5bc39bd05e",
        "locationType": "work",
        "endLocationName": "dubai",
        "endLat": 22.8057,
        "enLong": 86.2019,
        "customerId": "aa6d0840-54b8-11eb-a883-4faa5e472a28",
        "updatedAt": "2021-01-22T06:04:18.156Z",
        "createdAt": "2021-01-22T06:04:18.156Z"
    }
}
*/

/**
 * @api {get} trip/v1/savedPlaces/getAddress Get Address
 * @apiDescription Get Address after successful login
 * @apiVersion 1.0.0
 * @apiName Get address
 * @apiGroup Address
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
 * @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "id": 1,
            "uuid": "32807874-6eea-4c0b-a343-ad5bc39bd05e",
            "customerId": "aa6d0840-54b8-11eb-a883-4faa5e472a28",
            "locationType": "work",
            "address": "dubai",
            "endLat": 22.8057,
            "enLong": 86.2019,
            "status": 1,
            "isDeleted": 0,
            "createdAt": "2021-01-22T06:04:18.000Z",
            "updatedAt": "2021-01-22T06:04:18.000Z"
        }
    ]
}
*/

/**
* @api {post} trip/v1/driver/nearestCab Find Nearest Cab
* @apiDescription Find Nearest Cab
* @apiVersion 1.0.0
* @apiName Find Nearest Cab
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){Float}     latitude            Latitude(Required)
* @apiParam  (Body Params){Float}     longitude           Longitude(Required)
* @apiParam  (Body Params){Float}     totalKms            Total Kms(Required)
* @apiParam  (Body Params){Float}     totalTimeInMinute   Total Time In Minute(Required)
* @apiParam  (Body Params){String}     source   Start location(Required)
* @apiParam  (Body Params){String}     destination   End location(Required)
*
* * @apiParamExample {json} Request-Example
{
    "latitude": "28.456",
    "longitude": "77.3456",
    "totalKms": 5.5,
    "totalTimeInMinute": 30,
    "source": "Rajghat new delhi",
    "destination": "India get new delhi"
}
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "driverName": "Balwant Kumar",
            "driverMobileNumber": "9015632171",
            "driverId": 3,
            "locationName": "New Delhi",
            "addressLatitude": 28.456,
            "addressLongitude": 77.3456,
            "carId": 1,
            "pricePerKilometer": 10,
            "pricePerminute": 5,
            "carNumber": "UP57856",
            "carModel": "8 zAaa",
            "driverStatus": "Available",
            "carCapacity": "8 seated",
            "bookingFees": 300,
            "addDescription": null,
            "distanceInKm": 0.000379229178192033,
            "totalFare": 505,
            "carImage": "https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1613232335291_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210223%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210223T044028Z&X-Amz-Expires=300000&X-Amz-Signature=7c84833fb56bee037b0f5b747d54337e382686948ee8d6d3fe855e44545d6735&X-Amz-SignedHeaders=host"
        },
        {
            "driverName": "Balwant Kumar",
            "driverMobileNumber": "9015632171",
            "driverId": 3,
            "locationName": "New Delhi",
            "addressLatitude": 28.456,
            "addressLongitude": 77.3456,
            "carId": 2,
            "pricePerKilometer": 5,
            "pricePerminute": 8,
            "carNumber": "DL57856",
            "carModel": "9 zAaa",
            "driverStatus": "Available",
            "carCapacity": "8 seated",
            "bookingFees": 350,
            "addDescription": null,
            "distanceInKm": 0.000379229178192033,
            "totalFare": 617.5,
            "carImage": "https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1613536808453_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210223%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210223T044028Z&X-Amz-Expires=300000&X-Amz-Signature=70c1aed65b71388ec76aac3147713b9343663df5312a09d23e1e3b47ccdaf3d6&X-Amz-SignedHeaders=host"
        }
    ]
}
*/
/**
 * @api {get} trip/v1/trip/tripsOverview Get All Trips Details
 * @apiDescription Get Admin after successful login
 * @apiVersion 1.0.0
 * @apiName Get Trips
 * @apiGroup Trip
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (user not found)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "totalAmount": 45000,
        "completedTrips": 8,
        "availableDrivers": 1,
        "OccupiedDrivers": 1,
        "currentweekTrips": 4,
        "lastWeekTrips": 1,
        "currentweekRevenue": 28000,
        "lastWeekRevenue": 5000
    }
}
*/
/**
 * @api {get} trip/v1/trip/leaders Get All Trips Driver Details
 * @apiDescription Get Admin after successful login
 * @apiVersion 1.0.0
 * @apiName Get Leaders
 * @apiGroup Trip
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (user not found)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "driver_id": 3,
            "total_amount": 40000,
            "driver_details": {
                "full_name": "111"
            }
        },
        {
            "driver_id": 4,
            "total_amount": 5000,
            "driver_details": {
                "full_name": "222"
            }
        }
    ]
}
*/
/**
 * @api {get} trip/v1/trip/customerOverview?customerId=6 Get Customer Trips Details
 * @apiDescription Get Admin after successful login
 * @apiVersion 1.0.0
 * @apiName Get Customer Overview
 * @apiGroup Trip
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (No customer found)
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
        "weeklyData": [
            {
                "TotalDayTrips": "1",
                "TotalDayAmount": 5000,
                "Tripdate": "Sunday-21/Feb/2021"
            },
            {
                "TotalDayTrips": "1",
                "TotalDayAmount": 12000,
                "Tripdate": "Thursday-25/Feb/2021"
            },
            {
                "TotalDayTrips": "1",
                "TotalDayAmount": 6000,
                "Tripdate": "Friday-26/Feb/2021"
            }
        ],
        "monthlyData": [
            {
                "TotalMonthTrips": "4",
                "TotalMonthAmount": 25000,
                "Month": "Feb-2021"
            }
        ],
        "yearlyData": [
            {
                "TotalYearTrips": "4",
                "TotalYearAmount": 25000,
                "Year": "2021"
            }
        ],
        "totalUserData": [
            {
                "totalTrips": "4",
                "totalAmount": 25000,
                "todayTrips": "0",
                "todayAmount": null,
                "totalCurrentWeekTrips": "3",
                "totalCurrentWeekAmount": 23000,
                "totalCurrentMonthTrips": "4",
                "totalCurrentMonthAmount": 25000,
                "totalCashPayment": 2000,
                "totalCardPayment": 17000,
                "totalWalletPayment": 6000
            }
        ]
    }
}
*/
/**
 * @api {get} trip/v1/trip/driverOverview?driverId=3 Get Driver Trip Details
 * @apiDescription Get Admin after successful login
 * @apiVersion 1.0.0
 * @apiName Driver Overview 
 * @apiGroup Trip
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (No driver found)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "weeklyData": [
            {
                "TotalDayTrips": "1",
                "TotalDayAmount": 5000,
                "Tripdate": "Sunday-21/Feb/2021"
            },
            {
                "TotalDayTrips": "1",
                "TotalDayAmount": 12000,
                "Tripdate": "Thursday-25/Feb/2021"
            },
            {
                "TotalDayTrips": "1",
                "TotalDayAmount": 6000,
                "Tripdate": "Friday-26/Feb/2021"
            }
        ],
        "monthlyData": [
            {
                "TotalMonthTrips": "1",
                "TotalMonthAmount": 5000,
                "Month": "Jan-2021"
            },
            {
                "TotalMonthTrips": "4",
                "TotalMonthAmount": 25000,
                "Month": "Feb-2021"
            }
        ],
        "yearlyData": [
            {
                "TotalYearTrips": "1",
                "TotalYearAmount": 5000,
                "Year": "2018"
            },
            {
                "TotalYearTrips": "1",
                "TotalYearAmount": 5000,
                "Year": "2020"
            },
            {
                "TotalYearTrips": "5",
                "TotalYearAmount": 30000,
                "Year": "2021"
            }
        ],
        "totalUserData": [
            {
                "totalTrips": "7",
                "totalAmount": 40000,
                "todayTrips": "0",
                "todayAmount": null,
                "totalCurrentWeekTrips": "3",
                "totalCurrentWeekAmount": 23000,
                "totalCurrentMonthTrips": "4",
                "totalCurrentMonthAmount": 25000
            }
        ]
    }
}
*/

/**
 * @api {post} trip/v1/trip/shareCustomerStatus Share Customer Status
 * @apiDescription Share Customer Status
 * @apiVersion 1.0.0
 * @apiName Share Customer Status
 * @apiGroup Trip
 * @apiPermission public
 *
 * @apiHeader {String} Content-Type application/json
 * @apiHeader {String} x-access-token   jwt token
 * @apiParam  {String}     tripId            Trip Id(Required)
 * @apiParam  {String}     receiverId        Receiver Id (Required)[e.g Receiver Email Id, WhatsApp No etc ]
 * @apiParam  {String}     shareMethod        Share Method (Required)[Airdrop,Email,SMS,WhatsApp]
 * @apiParam  {String}     message            Message (Required) [I have booked an ride with Ourlane. Track this ride: (link)
Vehicle number: XXXXX
Driver Contact Number]

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
* * @apiParamExample {json} Request-Example 
{
    "tripId": "HT1613726482",
    "receiverId": "test@mailinator.com",
    "shareMethod": "SMS",
    "message": "I have booked an ride with OurLane. Track this ride: (link) Vehicle number: XXXXX Driver Contact Number"
}

 * @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "uuid": "7a9945b2-3976-49f9-b38b-823440380b76",
        "id": 1,
        "tripId": "HT1613726482",
        "receiverId": "test@mailinator.com",
        "shareMethod": "SMS",
        "message": "I have booked an ride with OurLane. Track this ride: (link) Vehicle number: XXXXX Driver Contact Number",
        "updatedAt": "2021-02-20T06:48:55.225Z",
        "createdAt": "2021-02-20T06:48:55.225Z"
    }
}
 */

/**
* @api {post} trip/v1/trip/driverReview Driver Review
* @apiDescription Driver Review
* @apiVersion 1.0.0
* @apiName Driver Review
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){String}     uuid                     uuid (Required)
* @apiParam  (Body Params){String}     customerFeedback         customer feedback (Required)
* @apiParam  (Body Params){Number}     ratingCustomer           customer rating (Required)

* * @apiParamExample {json} Request-Example
{
  "customerFeedback":"avg",
  "ratingCustomer":3,
  "uuid":"00a40171-a7ed-4dae-b0cb-1c126c664bce"
}
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
* @apiSuccessExample {json} Success-Response
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
* @api {post} trip/v1/trip/customerReview Customer Review
* @apiDescription Customer Review
* @apiVersion 1.0.0
* @apiName Customer Review
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){String}     uuid                   uuid (Required)
* @apiParam  (Body Params){String}     driverFeedback         Driver feedback (Required)
* @apiParam  (Body Params){Number}     ratingDriver           Driver rating (Required)

* * @apiParamExample {json} Request-Example
{
    "uuid": "333333",
    "driverFeedback": "good",
    "ratingDriver":"5"
 } 
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        0
    ]
}
*/

/**
* @api {get} trip/v1/trip/mostDrop  Get most drop data
* @apiDescription Get most drop data
* @apiVersion 1.0.0
* @apiName Get most drop data
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token    jwt token

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

* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "Dav Public School, Faridabad Sainik Colony, Sector 49, Faridabad, Haryana": 30,
        "SRS Mall Main Building Sector 12, Faridabad, Haryana, India": 11,
        "Bank More Dhanbad, Jharkhand, India": 11,
        "Mysore Road Metro Station Deepanjali Nagar, Old Guddadahalli, Guddadahalli, Bengaluru, Karnataka, India": 10,
        "Laxmi Nagar": 7,
        "Shrilekha Talkies Kusunda, Jharkhand, India": 6,
        "Karol Bagh New Delhi, Delhi, India": 6,
        "PES University Road Dwaraka Nagar, Banashankari, Bengaluru, Karnataka, India": 5,
        "Silk Board, Santhosapuram, Sector 6, HSR Layout, Bengaluru, Karnataka 560102, India": 5,
        "Laxmi Nagar New Delhi, Delhi, India": 3,
        "Janakpuri New Delhi, Delhi, India": 3,
        "Hirapur, Pandey Muhalla Dhanbad, Jharkhand, India": 2,
        "Metro Station Mysore Road Nayanda Halli, Bengaluru, Karnataka": 2,
        "The Amazing Museum & Gallery": 2,
        "Vijayanagar Bus Depot Chord Road, Govindaraja Nagar Ward, Basaveshwara HBCS Layout, Vijayanagar, Bengaluru, Karnataka, India": 2,
        "Gujrat": 2,
        "Dav public school Faridabad": 2,
        "Dwarka New Delhi, Delhi, India": 2,
        "Dwarka Sector 21 Metro Station Sector 21, Dwarka, New Delhi, Delhi, India": 2,
        "Mysore Road Metro Station": 2,
        "Katrasgarh Katras, Jharkhand, India": 2,
        "Laxm": 2,
        "Matkuriya Dhanbad, Jharkhand, India": 2,
        "Laxmi": 2,
        "Banashankari BMTC Bus Depot Banashankari, Bengaluru, Karnataka, India": 2,
        "Gole Ka Mandir Road Mahaveer, Morar, Gwalior, Madhya Pradesh, India": 1,
        "Godhar Dhanbad, Jharkhand, India": 1,
        "ISM Dhanbad Internal Road Housing Colony, Sardar Patel Nagar, Dhanbad, Jharkhand, India": 1,
        "Laxmangarh Rajasthan, India": 1,
        "25a, 2nd Main Rd, 2nd Stage, Hoysala Nagar, Naagarabhaavi, Bengaluru, Karnataka 560072, India": 1,
        "Dhanbad Railway Station Road New Station Railway Colony, Damodarpur, Dhanbad, Jharkhand, India": 1,
        "Deepanjali Nagar BMTC Bus Depot Building Mysore Road, Patel Puttanna Industrial Estate, Deepanjali Nagar, Bengaluru, Karnataka, India": 1,
        "PES University, Ring Road, Bangalore": 1,
        "Dari Mohalla Damodarpur, Dhanbad, Jharkhand, India": 1,
        "Banashankari Temple, Bangalore": 1,
        "Janak Cinema Complex Pankha Road, Block C 6A, Janakpuri, New Delhi, Delhi, India": 1,
        "Bekar Bandh Road Kasturba Nagar, Dhanbad, Jharkhand, India": 1,
        "Iskcon Temple, Rajajinagar 1st R Block, Rajajinagar, Bengaluru, Karnataka": 1,
        "Banashankari Bengaluru, Karnataka, India": 1,
        "1 Cross AGS Layout, Ittamadu, Hosakerehalli, Bangalore, Karnataka, India": 1,
        "Nall": 1,
        "Banashankari Temple Ward Bengaluru, Karnataka, India": 1,
        "PES University Road Dwaraka Nagar, Banashankari, Bangalore, Karnataka, India": 1
    }
}

*/

/**
* @api {get} trip/v1/trip/mostPickup  Get most pickup data
* @apiDescription Get most pickup data
* @apiVersion 1.0.0
* @apiName Get most pickup data
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token    jwt token

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

* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "387, Friends Colony, Sector 14, Faridabad, Haryana 121007, India": 38,
        "Unnamed Road, Kusunda, Jharkhand 828116, India": 28,
        "D/39/1, Jyoti Nagar West, Block D, Jyoti Nagar, Shahdara, New Delhi, Delhi 110053, India": 18,
        "78, 1st Cross Rd, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India": 13,
        "Mayur Vihar Phase 3": 7,
        "PES University Road Dwaraka Nagar, Banashankari, Bengaluru, Karnataka, India": 5,
        "Mysore Road, Mysore Rd, Muthachari Industrial Estate, Deepanjali Nagar, Bengaluru, Karnataka 560039, India": 5,
        "5, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India": 3,
        "Dubai School": 2,
        "Noida": 2,
        "Little Flower Public School 2nd Phase, Banashankari 3rd Stage, Hosakerehalli, Bengaluru, Karnataka": 2,
        "Hno.w-210 Chandrashekhar Azad Gali,, Jyoti Nagar West, Jyoti Nagar, Shahdara, Delhi, 110032, India": 2,
        "Sector 14 Faridabad, Haryana, India": 2,
        "611, Sector 15, Faridabad, Haryana 121007, India": 1,
        "16, 1st Main Rd, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India": 1,
        "386, Friends Colony, Sector 14, Faridabad, Haryana 121007, India": 1,
        "D/39, H Block, Jyoti Nagar West, Block D, Jyoti Nagar, Shahdara, New Delhi, Delhi 110053, India": 1,
        "No.030, 3rd Floor, 1st Main Road, OppMookambika Temple, HoskereHalli, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India": 1,
        "41, 1st Cross Rd, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India": 1,
        "PES University": 1,
        "home": 1,
        "5A, Dr MC Modi Hospital Rd, West of Chord Road 2nd Stage, Manjunath Nagar, Basaveshwar Nagar, Bengaluru, Karnataka 560010, India": 1,
        "Mysore Road Metro station": 1,
        "Manjeera Diamond Towers Rd, Tellapur, Nalagandla, Telangana 500019, India": 1,
        "Tejendra Nath Ki Gali, Dal Bazaar, Lashkar, Gwalior, Madhya Pradesh 474009, India": 1,
        "PES University, Ring Road, Bangalore": 1,
        "D36, Jyoti Nagar West, Block D, Jyoti Nagar, Shahdara, New Delhi, Delhi 110053, India": 1,
        "Orion Mall Brigade Gateway Road, Subramanyanagar,2 State, Rajajinagar, Bengaluru, Karnataka, India": 1,
        "391, Friends Colony, Sector 14, Faridabad, Haryana 121007, India": 1
    }
}
*/

/**
* @api {get} trip/v1/trip/todayTrips  Get today trips
* @apiDescription Get today trips
* @apiVersion 1.0.0
* @apiName Get today trips
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token    jwt token

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

* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "Scheduled": 0,
        "Ongoing": 0,
        "Completed": 0,
        "Cancelled": 0
    }
}
*/

/**
* @api {post} trip/v1/notification Send Notification
* @apiDescription Send Notification
* @apiVersion 1.0.0
* @apiName Send Notification
* @apiGroup Notification
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){Array}     uuid             pass multiple uuid in array (Required)

* * @apiParamExample {json} Request-Example
{
    "uuid":["2742c0aa-73fe-4846-8ade-8d4ecdcddc2f","efaeba4f-59dc-4a37-bfa5-37f61f54988e"]
}
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": 2
}
*/

/**
 * @api {get} trip/v1/notification/liveFeed Live Feeds
 * @apiDescription Live Feeds
 * @apiVersion 1.0.0
 * @apiName Live Feeds
 * @apiGroup Notification
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * 
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * 
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (user not found)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * 
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "id": 4,
            "uuid": "04328ed1-29cd-43a3-b97f-e8a015e53699",
            "name": "santosh.kumar",
            "message": " added car ",
            "isRead": 0,
            "status": 0,
            "isDeleted": 0,
            "createdAt": "2021-03-10T05:42:59.000Z",
            "updatedAt": "2021-03-10T05:42:59.000Z",
            "userId": null
        },
        {
            "id": 3,
            "uuid": "eab1c524-fac0-4f78-beeb-46669be8e468",
            "name": "marshall",
            "message": " added car ",
            "isRead": 0,
            "status": 0,
            "isDeleted": 0,
            "createdAt": "2021-03-09T12:42:26.000Z",
            "updatedAt": "2021-03-09T12:42:26.000Z",
            "userId": null
        }
    ]
}
*/

/**
* @api {put} trip/v1/notification/deleteNotification Delete Notification
* @apiDescription Delete Notification
* @apiVersion 1.0.0
* @apiName Delete Notification
* @apiGroup Notification
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){Array}     uuid             pass multiple uuid in array (Required)

* * @apiParamExample {json} Request-Example
{
    "uuid":["2742c0aa-73fe-4846-8ade-8d4ecdcddc2f","efaeba4f-59dc-4a37-bfa5-37f61f54988e"]
}
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
* @apiSuccessExample {json} Success-Response
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
* @api {put} trip/v1/notification/updateNotification Update User Notification
* @apiDescription Update User Notification
* @apiVersion 1.0.0
* @apiName Update User Notification
* @apiGroup Notification
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
* @apiSuccessExample {json} Success-Response
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
* @api {get} trip/v1/notification get User Notification
* @apiDescription get User Notification
* @apiVersion 1.0.0
* @apiName get User Notification
* @apiGroup Notification
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Query Params){String}     notificationStatus             notificationStatus (read/unread)

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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "count": 2,
        "rows": [
            {
                "id": 63,
                "uuid": "b7f36cc2-9b50-42ad-b02b-8c33af075db6",
                "name": "Aashuman Kumar ",
                "message": "Booking has been confirmed with the customer Aashuman Kumar. Please reach the pick-up location on time",
                "isRead": true,
                "status": false,
                "isDeleted": false,
                "type": null,
                "tripType": "createdTrip",
                "createdAt": "2021-04-19T04:29:19.000Z",
                "updatedAt": "2021-04-19T10:47:12.000Z",
                "userId": 13
            },
            {
                "id": 62,
                "uuid": "6aae012e-a598-4fda-993e-292bdad7dca4",
                "name": "Aashuman Kumar ",
                "message": "Your booking has been confirmed. Please wait for the driver’s arrival",
                "isRead": true,
                "status": false,
                "isDeleted": false,
                "type": null,
                "tripType": "createdTrip",
                "createdAt": "2021-04-19T04:29:19.000Z",
                "updatedAt": "2021-04-19T10:47:12.000Z",
                "userId": 13
            }
        ]
    }
}
*/

/**
 * @api {get} trip/v1/driver/driverTrips Driver Trips
 * @apiDescription Driver Trips
 * @apiVersion 1.0.0
 * @apiName Driver Trips
 * @apiGroup Driver
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * 
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * 
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (user not found)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * 
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "count": 1,
        "rows": [
            {
                "id": 23,
                "uuid": "b85adac9-6648-4d30-8dd9-042f8e1edf8a",
                "fullName": "Balwant Kumar",
                "mobileNumber": "9015632176",
                "loginId": "balwant@blockgemini.com",
                "lastLoginTime": "2021-03-16T12:23:32.000Z",
                "password": "$2a$10$ASRLnZV0g6PHd8gpxAzKLOjoAu2auHSgAwtbTNLCKLjZD0gGOM97y",
                "isEmailVerified": true,
                "isOtpVerified": true,
                "profileImage": null,
                "city": null,
                "language": null,
                "isActive": true,
                "isBlocked": false,
                "isDeleted": false,
                "loginAttempts": 0,
                "createdAt": "2021-03-16T12:22:06.000Z",
                "updatedAt": "2021-03-16T12:23:32.000Z",
                "organizationId": null,
                "role": "DRIVER",
                "updatedBy": null,
                "driverData": []
            },
            {
                "totalTrips": 1,
                "customerRatingPercentage": 0
            }
        ]
    }
}
*/

/**
 * @api {get} trip/v1/driver/getDrivers Get Drivers
 * @apiDescription Get Drivers
 * @apiVersion 1.0.0
 * @apiName Get Drivers
 * @apiGroup Driver
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * 
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * 
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (user not found)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * 
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "id": 1,
            "driverId": 2,
            "userId": 2,
            "uuid": "d007223a-6e74-4cf9-b049-c8ef8945d4db",
            "fullName": "Balwant Kumar",
            "mobileNumber": "9015632174",
            "loginId": "balwant@blockgemini.com",
            "status": "Available",
            "createdAt": "2021-03-12T06:50:59.000Z",
            "completedTrips": 0,
            "rejectedTrips": 0,
            "cancelledTrips": 0,
            "rating": 0,
            "kmTravelled": null,
            "totalEarnings": 0
        }
    ]
}
*/

/**
* @api {post} trip/v1/driver/updateLocation Update location
* @apiDescription Update location
* @apiVersion 1.0.0
* @apiName Update location
* @apiGroup Driver
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){String}     locationName             Location Name (Required)
* @apiParam  (Body Params){Float}     addressLatitude           Latitude (Required)
* @apiParam  (Body Params){Float}     addressLongitude           Longitude (Required)

* * @apiParamExample {json} Request-Example
{
    "locationName": "Bangalore",
    "addressLatitude": "28.4567",
    "addressLongitude": "77.5678"
}
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        0
    ]
}
*/

/**
 * @api {get} trip/v1/driver/getupdatedLocation/2 Get updated location
 * @apiDescription Get updated location
 * @apiVersion 1.0.0
 * @apiName Get updated location
 * @apiGroup Driver
 * @apiPermission private
 * @apiHeader {String} Content-Type     application/json
 * @apiHeader {String} x-access-token   jwt token
 * 
 * @apiParam  (Query Params){Number}     driverId             DriverId (Required)
 * 
 * @apiSuccess (OK 200) {Number}     code         200=OK
 * @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
 * @apiSuccess (OK 200)  {String}    message      API Response message (Success)
 * @apiSuccess (OK 200) {Object[]}   result       result object
 * @apiSuccess (OK 200) {String}     appVersion   API version
 * 
 * @apiError (Bad Request 400)   {Boolean}    status    false
 * @apiError (Bad Request 400)   {String}     message   API Response message (user not found)
 * @apiError (Bad Request 400)   {Number}     code      400=Bad Request
 * @apiError (Bad Request 400)   {Object[]}   result    Blank Object
 * 
 * @apiError (Internal Server Error 500)   {Boolean}   status    false
 * @apiError (Internal Server Error 500)   {String}    message
 * API Response message (Internal Server Error)
 * @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
 * @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
 * @apiSuccessExample {json} Success-Response
 {
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "id": 1,
        "uuid": "d007223a-6e74-4cf9-b049-c8ef8945d4db",
        "locationName": "Test23",
        "addressLatitude": 28.4013,
        "addressLongitude": 77.3283,
        "isOnlineStatus": "Available",
        "status": "Active",
        "createdAt": "2021-03-12T06:50:59.000Z",
        "updatedAt": "2021-03-16T12:57:36.000Z",
        "userId": 2
    }
}
*/

/**
* @api {put} trip/v1/driver/deleteDriver Delete Driver
* @apiDescription Delete Driver
* @apiVersion 1.0.0
* @apiName Delete Driver
* @apiGroup Driver
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){String}     uuid             uuid (Required)

* * @apiParamExample {json} Request-Example
{
    "uuid": "d007223a-6e74-4cf9-b049-c8ef8945d4db"
}
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
* @apiSuccessExample {json} Success-Response
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
* @api {post} trip/v1/trip/customerTrips Customer Trips
* @apiDescription Customer Trips
* @apiVersion 1.0.0
* @apiName Customer Trips
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){Number}     perPage             perPage (Required)
* @apiParam  (Body Params){Number}     pageNumber           pageNumber (Required)

* * @apiParamExample {json} Request-Example
{
    "perPage": 10,
    "pageNumber": 1
}
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        {
            "id": 4,
            "uuid": "f4774b8b-4d7e-42f2-bb1e-2b9327dfd8ea",
            "fullName": "Aditya Jaitly",
            "loginId": "aditya.jaitly16@gmail.com",
            "mobileNumber": "7838582402",
            "profileImage": "https://alphaseed-dev.s3.ap-south-1.amazonaws.com/HT_1615897397933NXr6hTB4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210316%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210316T133733Z&X-Amz-Expires=300000&X-Amz-Signature=464bb3f1ea40f6065a3e8e412ab00d7e8b4ceadef66c70cd803437c1a35f7e81&X-Amz-SignedHeaders=host",
            "dateOfJoining": "2021-03-15T10:33:57.000Z",
            "completedTrips": 1,
            "cancelledTrips": 6,
            "avgCustomerRating": 0,
            "cardNo": []
        },
        {
            "id": 14,
            "uuid": "a429945a-a409-454b-84fa-a3c79bd0a8de",
            "fullName": "Anshuman",
            "loginId": "anshumank13@gmail.com",
            "mobileNumber": "9650756484",
            "profileImage": "https://alphaseed-dev.s3.ap-south-1.amazonaws.com/HT_1615897397933NXr6hTB4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210316%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210316T133733Z&X-Amz-Expires=300000&X-Amz-Signature=464bb3f1ea40f6065a3e8e412ab00d7e8b4ceadef66c70cd803437c1a35f7e81&X-Amz-SignedHeaders=host",
            "dateOfJoining": "2021-03-15T16:10:17.000Z",
            "completedTrips": 1,
            "cancelledTrips": 0,
            "avgCustomerRating": 0,
            "cardNo": []
        }
    ]
}
*/

/**
* @api {post} trip/v1/trip/avoidOverlappingTrip Avoid Overlapping Scheduled trip
* @apiDescription Avoid Overlapping Scheduled trip
* @apiVersion 1.0.0
* @apiName Avoid Overlapping Scheduled trip
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token

* @apiParam  (Body Params){Number}     driverId             driverId (Required)
* @apiParam  (Body Params){String}     dateTime           dateTime (Required) [send the date time as a UTC format]

* * @apiParamExample {json} Request-Example
{
    "driverId": "2",
    "dateTime": "2021-03-18T04:51:33Z"
}
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
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": [
        "This car is already booked by another customer."
    ]
}
*/

/**
* @api {get} trip/v1/trip/tripsTotalOverview getTotalCompleted Trips of DashBoard-analytics
* @apiDescription getTotalCompleted Trips of DashBoard-analytics
* @apiVersion 1.0.0
* @apiName tripsTotalOverview for  DashBoard-analytics
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token by admin or superAdmin

* * @apiParamExample {json} Request-Example
{
    "driverId": "2",
    "dateTime": "2021-03-18T04:51:33Z"
}
* @apiSuccess (OK 200) {Number}     code         200=OK
* @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
* @apiSuccess (OK 200)  {String}    message      API Response message (Success)
* @apiSuccess (OK 200) {Object[]}   result       result object
* @apiSuccess (OK 200) {String}     appVersion   API version
* @apiError (Bad Request 400)   {Boolean}    status    false
* @apiError (Bad Request 400)   {String}     message   API Response message (user not found)
* @apiError (Bad Request 400)   {Number}     code      400=Bad Request
* @apiError (Bad Request 400)   {Object[]}   result    Blank Object
* @apiError (Internal Server Error 500)   {Boolean}   status    false
* @apiError (Internal Server Error 500)   {String}    message
* API Response message (Internal Server Error)
* @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
* @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "weeklyData": [
            {
                "totalTodayAmount": 457.9249877929688,
                "completedTrips": "1",
                "date": "Friday-19/Mar/2021"
            },
            {
                "totalTodayAmount": 450.8399963378906,
                "completedTrips": "2",
                "date": "Sunday-21/Mar/2021"
            },
            {
                "totalTodayAmount": 1167217.5081996918,
                "completedTrips": "23",
                "date": "Monday-22/Mar/2021"
            },
            {
                "totalTodayAmount": 22617.06015777588,
                "completedTrips": "30",
                "date": "Tuesday-23/Mar/2021"
            },
            {
                "totalTodayAmount": 8090.125610351562,
                "completedTrips": "8",
                "date": "Wednesday-24/Mar/2021"
            },
            {
                "totalTodayAmount": 4950.127166748047,
                "completedTrips": "10",
                "date": "Thursday-25/Mar/2021"
            }
        ],
        "monthlyData": [
            {
                "totalMonthlyAmount": 415,
                "completedTrips": "1",
                "Month": "Feb-2021"
            },
            {
                "totalMonthlyAmount": 1307633.5461406708,
                "completedTrips": "146",
                "Month": "Mar-2021"
            }
        ],
        "yearlyData": [
            {
                "totalYeaelyAmount": 2825,
                "completedTrips": "1",
                "year": "2020"
            },
            {
                "totalYeaelyAmount": 1308048.5461406708,
                "completedTrips": "147",
                "year": "2021"
            }
        ]
    }
}
*/

/**
* @api {get} trip/v1/trip/driverTotalEarning My Earnings
* @apiDescription My Earnings
* @apiVersion 1.0.0
* @apiName My Earnings
* @apiGroup Trip
* @apiPermission private
* @apiHeader {String} Content-Type     application/json
* @apiHeader {String} x-access-token   jwt token by admin or superAdmin

* @apiSuccess (OK 200) {Number}     code         200=OK
* @apiSuccess (OK 200) {Boolean}    status       true for success and false for failure
* @apiSuccess (OK 200)  {String}    message      API Response message (Success)
* @apiSuccess (OK 200) {Object[]}   result       result object
* @apiSuccess (OK 200) {String}     appVersion   API version
* @apiError (Bad Request 400)   {Boolean}    status    false
* @apiError (Bad Request 400)   {String}     message   API Response message (user not found)
* @apiError (Bad Request 400)   {Number}     code      400=Bad Request
* @apiError (Bad Request 400)   {Object[]}   result    Blank Object
* @apiError (Internal Server Error 500)   {Boolean}   status    false
* @apiError (Internal Server Error 500)   {String}    message
* API Response message (Internal Server Error)
* @apiError (Internal Server Error 500)   {Number}    code      500=Internal Server Error
* @apiError (Internal Server Error 500)   {Object[]}  result    Blank Object
* @apiSuccessExample {json} Success-Response
{
    "responseCode": "SUCCESS",
    "message": "success",
    "code": 200,
    "result": {
        "previousTrip": {
            "id": 549,
            "uuid": "dda60b23-60d3-4919-8151-247c2732aa5f",
            "tripId": "HT1616949452",
            "tripDate": "2021-03-28T16:37:31Z",
            "status": "Completed",
            "paymentAmount": 950,
            "startLat": 12.9288,
            "startLong": 77.5361,
            "endLat": 12.9467,
            "endLong": 77.5301,
            "driverId": 2,
            "customerId": 5,
            "ratingCustomer": 0,
            "customer_details": {
                "fullName": "Archana ML",
                "mobileNumber": "9743994561",
                "profileImage": "https://alphaseed-dev.s3.ap-south-1.amazonaws.com/HT_1616039725719ZTbebL6R.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210331%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210331T132242Z&X-Amz-Expires=300000&X-Amz-Signature=03e84305785a7df2f73bb67bf82439b59a531813688e67c78bcd2761ffa83a6b&X-Amz-SignedHeaders=host",
                "createdAt": "2021-03-15T10:46:04.000Z"
            }
        },
        "last7DaysTrip": [
            {
                "totalFare": 52165.47998046875,
                "completedTrips": "38",
                "totalKms": 446.7999999523163
            }
        ],
        "todayEarning": [
            {
                "totalFare": 1160,
                "completedTrips": "2",
                "totalKms": 45
            }
        ],
        "totalEarning": [
            {
                "totalFare": 1530556.896238327,
                "completedTrips": "196",
                "totalKms": 2116.8549990725005
            }
        ],
        "hoursAvailable": "0"
    }
}
*/

