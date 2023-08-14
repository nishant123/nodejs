define({ "api": [
  {
    "type": "post",
    "url": "trip/v1/savedPlaces/createAddress",
    "title": "Create Address",
    "description": "<p>Save place  after successful login</p>",
    "version": "1.0.0",
    "name": "Create_Address",
    "group": "Address",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "locationType",
            "description": "<p>Location Type(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endLocationName",
            "description": "<p>End Location Name(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "endLat",
            "description": "<p>End Latitude(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "enLong",
            "description": "<p>End Longitude(Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"locationType\": \"work\",\n    \"endLocationName\": \"dubai\",\n    \"endLat\": 22.8057,\n    \"enLong\": 86.2019\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"status\": true,\n        \"isDeleted\": false,\n        \"id\": 1,\n        \"uuid\": \"32807874-6eea-4c0b-a343-ad5bc39bd05e\",\n        \"locationType\": \"work\",\n        \"endLocationName\": \"dubai\",\n        \"endLat\": 22.8057,\n        \"enLong\": 86.2019,\n        \"customerId\": \"aa6d0840-54b8-11eb-a883-4faa5e472a28\",\n        \"updatedAt\": \"2021-01-22T06:04:18.156Z\",\n        \"createdAt\": \"2021-01-22T06:04:18.156Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "trip/v1/savedPlaces/getAddress",
    "title": "Get Address",
    "description": "<p>Get Address after successful login</p>",
    "version": "1.0.0",
    "name": "Get_address",
    "group": "Address",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        {\n            \"id\": 1,\n            \"uuid\": \"32807874-6eea-4c0b-a343-ad5bc39bd05e\",\n            \"customerId\": \"aa6d0840-54b8-11eb-a883-4faa5e472a28\",\n            \"locationType\": \"work\",\n            \"address\": \"dubai\",\n            \"endLat\": 22.8057,\n            \"enLong\": 86.2019,\n            \"status\": 1,\n            \"isDeleted\": 0,\n            \"createdAt\": \"2021-01-22T06:04:18.000Z\",\n            \"updatedAt\": \"2021-01-22T06:04:18.000Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "trip/v1/car/searchCar?pageNumber=1&perPage=10&keyword=1567",
    "title": "Global Search Car",
    "description": "<p>Global search car after successful login</p>",
    "version": "1.0.0",
    "name": "Car_Search",
    "group": "Car",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Optional (query params)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "perPage",
            "description": "<p>Reqired (query params)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>Reqired (query params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        {\n            \"uuid\": \"e8de1e8f-783c-47a3-9c0d-5c12098a9838\",\n            \"carNumber\": \"1567\",\n            \"carModel\": \"BMW\",\n            \"carCapacity\": \"5 seated\",\n            \"carFactor\": \"00.02\",\n            \"carOdometer\": \"678\",\n            \"driverId\": 7,\n            \"driverName\": \"Rahul Customer\",\n            \"status\": \"Active\",\n            \"updated_at\": \"2021-02-22T12:17:37.000Z\",\n            \"created_at\": \"2021-02-22T12:17:37.000Z\",\n            \"carImage\": \"https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1613996256745_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210222%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210222T124857Z&X-Amz-Expires=300000&X-Amz-Signature=082672ce471a8245421c41ae475c3139e39296bab995cfc154080684733ee607&X-Amz-SignedHeaders=host\",\n            \"bookingFees\": 100,\n            \"pricePerKilometer\": 20,\n            \"pricePerminute\": 10,\n            \"addDescription\": \"Add description here\",\n            \"driverStatus\": \"Available\"\n        },\n        {\n            \"uuid\": \"4d1e36ff-8a61-4bff-9d44-58de3205f8f3\",\n            \"carNumber\": \"1567\",\n            \"carModel\": \"BMW\",\n            \"carCapacity\": \"5 seated\",\n            \"carFactor\": \"00.02\",\n            \"carOdometer\": \"678\",\n            \"driverId\": 3,\n            \"driverName\": \"Balwant Kumar\",\n            \"status\": \"Active\",\n            \"updated_at\": \"2021-02-22T12:16:49.000Z\",\n            \"created_at\": \"2021-02-22T12:16:49.000Z\",\n            \"carImage\": \"https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1613996207783_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210222%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210222T124857Z&X-Amz-Expires=300000&X-Amz-Signature=ea80be988edab05d414520d1a0282377bd740b25b45a81d1285854bd1c061672&X-Amz-SignedHeaders=host\",\n            \"bookingFees\": 100,\n            \"pricePerKilometer\": 20,\n            \"pricePerminute\": 10,\n            \"addDescription\": \"Add description here\",\n            \"driverStatus\": \"Available\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "List error",
          "content": "{\n    \"responseCode\": \"UNKNOWN_ERROR\",\n    \"message\": \"Undeclared variable: NaN\",\n    \"code\": 500\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Car"
  },
  {
    "type": "post",
    "url": "trip/v1/car/create",
    "title": "Create Car",
    "description": "<p>Add car after successful login</p>",
    "version": "1.0.0",
    "name": "Create_Car",
    "group": "Car",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>UUID(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carNumber",
            "description": "<p>Car Number(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carModel",
            "description": "<p>Car Model(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carCapacity",
            "description": "<p>Car Capacity(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carStatus",
            "description": "<p>Car Status(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carFactor",
            "description": "<p>Car Factor(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carOdometer",
            "description": "<p>Car Odometer(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "NUmber",
            "optional": false,
            "field": "driverID",
            "description": "<p>Driver Id(optional) (if pas driverStatus then only pas driverID)</p>"
          },
          {
            "group": "Parameter",
            "type": "NUmber",
            "optional": false,
            "field": "driverStatus",
            "description": "<p>Driver Status(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "numbder",
            "optional": false,
            "field": "bookingFees",
            "description": "<p>Booking Fees(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pricePerKilometer",
            "description": "<p>Price Per Kilometer(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pricePerminute",
            "description": "<p>Price Per Minute(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addDescription",
            "description": "<p>Add Description(optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"carCapacity\": \"5 seated\",\n    \"carFactor\": \"00.02\",\n    \"carModel\": \"BMW\",\n    \"carNumber\": \"1567\",\n    \"carOdometer\": \"678\",\n    \"carStatus\": \"Available\",\n    \"driverId\": 7,\n    \"bookingFees\": 100,\n    \"pricePerKilometer\": 20,\n    \"pricePerminute\": 10,\n    \"addDescription\":\"Add description here\",\n    \"carDescription\": \"BMW cars price starts at Rs. 37.20 Lakh .\",\n    \"carImage\": \"data:image/png;base64,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\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"id\": 4,\n        \"uuid\": \"e8de1e8f-783c-47a3-9c0d-5c12098a9838\",\n        \"carNumber\": \"1567\",\n        \"carModel\": \"BMW\",\n        \"carCapacity\": \"5 seated\",\n        \"carFactor\": \"00.02\",\n        \"carOdometer\": \"678\",\n        \"driverName\": \"Rahul Driver\",\n        \"driverId\": 7,\n        \"carImage\": \"1613996256745_img.png\",\n        \"bookingFees\": 100,\n        \"pricePerKilometer\": 20,\n        \"pricePerminute\": 10,\n        \"status\": \"Active\",\n        \"addDescription\": \"Add description here\",\n        \"updatedAt\": \"2021-02-22T12:17:37.786Z\",\n        \"createdAt\": \"2021-02-22T12:17:37.786Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "List error",
          "content": "{\n    \"responseCode\": \"UNKNOWN_ERROR\",\n    \"message\": \"All fields are required\",\n    \"code\": 500\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Car"
  },
  {
    "type": "post",
    "url": "trip/v1/car/deleteCar",
    "title": "Delete Car",
    "description": "<p>Delete Car after successful login</p>",
    "version": "1.0.0",
    "name": "Delete_Car",
    "group": "Car",
    "permission": [
      {
        "name": "private"
      },
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>(Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n   \"uuid\": \"91ef4cb6-059a-45ea-8be6-8f70a61eea80\",  \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"msg\": \" car deleted successfuly\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "List error - if uuid is wrong",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"msg\": \"Car not found\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "List error -if not pass uuid ",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"msg\": \"Somthing went wrong\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Car"
  },
  {
    "type": "post",
    "url": "trip/v1/car/updateCar",
    "title": "Update Car",
    "description": "<p>Update car after successful login</p>",
    "version": "1.0.0",
    "name": "Update_Car",
    "group": "Car",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>UUID(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carNumber",
            "description": "<p>Car Number(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carModel",
            "description": "<p>Car Model(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carCapacity",
            "description": "<p>Car Capacity(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "driverStatus",
            "description": "<p>Driver Status(if pass driver status then driver id it should) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "driverId",
            "description": "<p>Driver Id(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carOdometer",
            "description": "<p>Car Odometer(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carFactor",
            "description": "<p>Car Factor(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "bookingFees",
            "description": "<p>Booking Fees(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pricePerKilometer",
            "description": "<p>Price Per Kilometer(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pricePerminute",
            "description": "<p>Price Per Minute(optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addDescription",
            "description": "<p>Add Description(optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"uuid\": \"e8de1e8f-783c-47a3-9c0d-5c12098a9838\",\n    \"carCapacity\": \"5 seated\",\n    \"carFactor\": \"00.02\",\n    \"carModel\": \"BMW\",\n    \"carNumber\": \"BM1567\",\n    \"carOdometer\": \"678\",\n    \"carStatus\": \"Available\",\n    \"driverId\": 7,\n    \"bookingFees\": 100,\n    \"pricePerKilometer\": 20,\n    \"pricePerminute\": 10,\n    \"addDescription\": \"Add description here\",\n    \"carDescription\": \"BMW cars price starts at Rs. 37.20 Lakh .\",\n    \"carImage\": \"data:image/png;base64,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\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"msg\": \"Car updated successfully\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "List error - if  uuid is wrong",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"msg\": \"Car not found\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "List error - if uuid is not provide",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"msg\": \"Please provide uuid for update the car\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Car"
  },
  {
    "type": "put",
    "url": "trip/v1/driver/deleteDriver",
    "title": "Delete Driver",
    "description": "<p>Delete Driver</p>",
    "version": "1.0.0",
    "name": "Delete_Driver",
    "group": "Driver",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>uuid (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"uuid\": \"d007223a-6e74-4cf9-b049-c8ef8945d4db\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        1\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Driver"
  },
  {
    "type": "get",
    "url": "trip/v1/driver/driverTrips",
    "title": "Driver Trips",
    "description": "<p>Driver Trips</p>",
    "version": "1.0.0",
    "name": "Driver_Trips",
    "group": "Driver",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"count\": 1,\n        \"rows\": [\n            {\n                \"id\": 23,\n                \"uuid\": \"b85adac9-6648-4d30-8dd9-042f8e1edf8a\",\n                \"fullName\": \"Balwant Kumar\",\n                \"mobileNumber\": \"9015632176\",\n                \"loginId\": \"balwant@blockgemini.com\",\n                \"lastLoginTime\": \"2021-03-16T12:23:32.000Z\",\n                \"password\": \"$2a$10$ASRLnZV0g6PHd8gpxAzKLOjoAu2auHSgAwtbTNLCKLjZD0gGOM97y\",\n                \"isEmailVerified\": true,\n                \"isOtpVerified\": true,\n                \"profileImage\": null,\n                \"city\": null,\n                \"language\": null,\n                \"isActive\": true,\n                \"isBlocked\": false,\n                \"isDeleted\": false,\n                \"loginAttempts\": 0,\n                \"createdAt\": \"2021-03-16T12:22:06.000Z\",\n                \"updatedAt\": \"2021-03-16T12:23:32.000Z\",\n                \"organizationId\": null,\n                \"role\": \"DRIVER\",\n                \"updatedBy\": null,\n                \"driverData\": []\n            },\n            {\n                \"totalTrips\": 1,\n                \"customerRatingPercentage\": 0\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (user not found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Driver"
  },
  {
    "type": "get",
    "url": "trip/v1/driver/getDrivers",
    "title": "Get Drivers",
    "description": "<p>Get Drivers</p>",
    "version": "1.0.0",
    "name": "Get_Drivers",
    "group": "Driver",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        {\n            \"id\": 1,\n            \"driverId\": 2,\n            \"userId\": 2,\n            \"uuid\": \"d007223a-6e74-4cf9-b049-c8ef8945d4db\",\n            \"fullName\": \"Balwant Kumar\",\n            \"mobileNumber\": \"9015632174\",\n            \"loginId\": \"balwant@blockgemini.com\",\n            \"status\": \"Available\",\n            \"createdAt\": \"2021-03-12T06:50:59.000Z\",\n            \"completedTrips\": 0,\n            \"rejectedTrips\": 0,\n            \"cancelledTrips\": 0,\n            \"rating\": 0,\n            \"kmTravelled\": null,\n            \"totalEarnings\": 0\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (user not found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Driver"
  },
  {
    "type": "get",
    "url": "trip/v1/driver/getupdatedLocation/2",
    "title": "Get updated location",
    "description": "<p>Get updated location</p>",
    "version": "1.0.0",
    "name": "Get_updated_location",
    "group": "Driver",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "Number",
            "optional": false,
            "field": "driverId",
            "description": "<p>DriverId (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"id\": 1,\n        \"uuid\": \"d007223a-6e74-4cf9-b049-c8ef8945d4db\",\n        \"locationName\": \"Test23\",\n        \"addressLatitude\": 28.4013,\n        \"addressLongitude\": 77.3283,\n        \"isOnlineStatus\": \"Available\",\n        \"status\": \"Active\",\n        \"createdAt\": \"2021-03-12T06:50:59.000Z\",\n        \"updatedAt\": \"2021-03-16T12:57:36.000Z\",\n        \"userId\": 2\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (user not found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Driver"
  },
  {
    "type": "post",
    "url": "trip/v1/driver/updatedriverStatus",
    "title": "Update Driver Status",
    "description": "<p>Update Driver Status from driver side</p>",
    "version": "1.0.0",
    "name": "Update_Driver_Status",
    "group": "Driver",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status (Required) [Available/Unavailable/Driving]</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "location_name",
            "description": "<p>Location name (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"status\": \"Available\",\n    \"latitude\": \"28.456\",\n    \"longitude\": \"77.3455\",\n    \"location_name\": \"Ayodhya\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        1\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Driver"
  },
  {
    "type": "post",
    "url": "trip/v1/driver/updateLocation",
    "title": "Update location",
    "description": "<p>Update location</p>",
    "version": "1.0.0",
    "name": "Update_location",
    "group": "Driver",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "locationName",
            "description": "<p>Location Name (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "addressLatitude",
            "description": "<p>Latitude (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "addressLongitude",
            "description": "<p>Longitude (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"locationName\": \"Bangalore\",\n    \"addressLatitude\": \"28.4567\",\n    \"addressLongitude\": \"77.5678\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        0\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Driver"
  },
  {
    "type": "put",
    "url": "trip/v1/notification/deleteNotification",
    "title": "Delete Notification",
    "description": "<p>Delete Notification</p>",
    "version": "1.0.0",
    "name": "Delete_Notification",
    "group": "Notification",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Array",
            "optional": false,
            "field": "uuid",
            "description": "<p>pass multiple uuid in array (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"uuid\":[\"2742c0aa-73fe-4846-8ade-8d4ecdcddc2f\",\"efaeba4f-59dc-4a37-bfa5-37f61f54988e\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        1\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Notification"
  },
  {
    "type": "get",
    "url": "trip/v1/notification/liveFeed",
    "title": "Live Feeds",
    "description": "<p>Live Feeds</p>",
    "version": "1.0.0",
    "name": "Live_Feeds",
    "group": "Notification",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        {\n            \"id\": 4,\n            \"uuid\": \"04328ed1-29cd-43a3-b97f-e8a015e53699\",\n            \"name\": \"santosh.kumar\",\n            \"message\": \" added car \",\n            \"isRead\": 0,\n            \"status\": 0,\n            \"isDeleted\": 0,\n            \"createdAt\": \"2021-03-10T05:42:59.000Z\",\n            \"updatedAt\": \"2021-03-10T05:42:59.000Z\",\n            \"userId\": null\n        },\n        {\n            \"id\": 3,\n            \"uuid\": \"eab1c524-fac0-4f78-beeb-46669be8e468\",\n            \"name\": \"marshall\",\n            \"message\": \" added car \",\n            \"isRead\": 0,\n            \"status\": 0,\n            \"isDeleted\": 0,\n            \"createdAt\": \"2021-03-09T12:42:26.000Z\",\n            \"updatedAt\": \"2021-03-09T12:42:26.000Z\",\n            \"userId\": null\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (user not found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Notification"
  },
  {
    "type": "post",
    "url": "trip/v1/notification",
    "title": "Send Notification",
    "description": "<p>Send Notification</p>",
    "version": "1.0.0",
    "name": "Send_Notification",
    "group": "Notification",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Array",
            "optional": false,
            "field": "uuid",
            "description": "<p>pass multiple uuid in array (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"uuid\":[\"2742c0aa-73fe-4846-8ade-8d4ecdcddc2f\",\"efaeba4f-59dc-4a37-bfa5-37f61f54988e\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": 2\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Notification"
  },
  {
    "type": "put",
    "url": "trip/v1/notification/updateNotification",
    "title": "Update User Notification",
    "description": "<p>Update User Notification</p>",
    "version": "1.0.0",
    "name": "Update_User_Notification",
    "group": "Notification",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        1\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Notification"
  },
  {
    "type": "get",
    "url": "trip/v1/notification",
    "title": "get User Notification",
    "description": "<p>get User Notification</p>",
    "version": "1.0.0",
    "name": "get_User_Notification",
    "group": "Notification",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Query Params": [
          {
            "group": "Query Params",
            "type": "String",
            "optional": false,
            "field": "notificationStatus",
            "description": "<p>notificationStatus (read/unread)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"count\": 2,\n        \"rows\": [\n            {\n                \"id\": 63,\n                \"uuid\": \"b7f36cc2-9b50-42ad-b02b-8c33af075db6\",\n                \"name\": \"Aashuman Kumar \",\n                \"message\": \"Booking has been confirmed with the customer Aashuman Kumar. Please reach the pick-up location on time\",\n                \"isRead\": true,\n                \"status\": false,\n                \"isDeleted\": false,\n                \"type\": null,\n                \"tripType\": \"createdTrip\",\n                \"createdAt\": \"2021-04-19T04:29:19.000Z\",\n                \"updatedAt\": \"2021-04-19T10:47:12.000Z\",\n                \"userId\": 13\n            },\n            {\n                \"id\": 62,\n                \"uuid\": \"6aae012e-a598-4fda-993e-292bdad7dca4\",\n                \"name\": \"Aashuman Kumar \",\n                \"message\": \"Your booking has been confirmed. Please wait for the driver’s arrival\",\n                \"isRead\": true,\n                \"status\": false,\n                \"isDeleted\": false,\n                \"type\": null,\n                \"tripType\": \"createdTrip\",\n                \"createdAt\": \"2021-04-19T04:29:19.000Z\",\n                \"updatedAt\": \"2021-04-19T10:47:12.000Z\",\n                \"userId\": 13\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Notification"
  },
  {
    "type": "post",
    "url": "trip/v1/trip/avoidOverlappingTrip",
    "title": "Avoid Overlapping Scheduled trip",
    "description": "<p>Avoid Overlapping Scheduled trip</p>",
    "version": "1.0.0",
    "name": "Avoid_Overlapping_Scheduled_trip",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "driverId",
            "description": "<p>driverId (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "dateTime",
            "description": "<p>dateTime (Required) [send the date time as a UTC format]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"driverId\": \"2\",\n    \"dateTime\": \"2021-03-18T04:51:33Z\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        \"This car is already booked by another customer.\"\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "post",
    "url": "trip/v1/trip/customerReview",
    "title": "Customer Review",
    "description": "<p>Customer Review</p>",
    "version": "1.0.0",
    "name": "Customer_Review",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>uuid (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "driverFeedback",
            "description": "<p>Driver feedback (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "ratingDriver",
            "description": "<p>Driver rating (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"uuid\": \"333333\",\n    \"driverFeedback\": \"good\",\n    \"ratingDriver\":\"5\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        0\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "post",
    "url": "trip/v1/trip/customerTrips",
    "title": "Customer Trips",
    "description": "<p>Customer Trips</p>",
    "version": "1.0.0",
    "name": "Customer_Trips",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>perPage (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>pageNumber (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"perPage\": 10,\n    \"pageNumber\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        {\n            \"id\": 4,\n            \"uuid\": \"f4774b8b-4d7e-42f2-bb1e-2b9327dfd8ea\",\n            \"fullName\": \"Aditya Jaitly\",\n            \"loginId\": \"aditya.jaitly16@gmail.com\",\n            \"mobileNumber\": \"7838582402\",\n            \"profileImage\": \"https://alphaseed-dev.s3.ap-south-1.amazonaws.com/HT_1615897397933NXr6hTB4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210316%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210316T133733Z&X-Amz-Expires=300000&X-Amz-Signature=464bb3f1ea40f6065a3e8e412ab00d7e8b4ceadef66c70cd803437c1a35f7e81&X-Amz-SignedHeaders=host\",\n            \"dateOfJoining\": \"2021-03-15T10:33:57.000Z\",\n            \"completedTrips\": 1,\n            \"cancelledTrips\": 6,\n            \"avgCustomerRating\": 0,\n            \"cardNo\": []\n        },\n        {\n            \"id\": 14,\n            \"uuid\": \"a429945a-a409-454b-84fa-a3c79bd0a8de\",\n            \"fullName\": \"Anshuman\",\n            \"loginId\": \"anshumank13@gmail.com\",\n            \"mobileNumber\": \"9650756484\",\n            \"profileImage\": \"https://alphaseed-dev.s3.ap-south-1.amazonaws.com/HT_1615897397933NXr6hTB4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210316%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210316T133733Z&X-Amz-Expires=300000&X-Amz-Signature=464bb3f1ea40f6065a3e8e412ab00d7e8b4ceadef66c70cd803437c1a35f7e81&X-Amz-SignedHeaders=host\",\n            \"dateOfJoining\": \"2021-03-15T16:10:17.000Z\",\n            \"completedTrips\": 1,\n            \"cancelledTrips\": 0,\n            \"avgCustomerRating\": 0,\n            \"cardNo\": []\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/driverOverview?driverId=3",
    "title": "Get Driver Trip Details",
    "description": "<p>Get Admin after successful login</p>",
    "version": "1.0.0",
    "name": "Driver_Overview",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"weeklyData\": [\n            {\n                \"TotalDayTrips\": \"1\",\n                \"TotalDayAmount\": 5000,\n                \"Tripdate\": \"Sunday-21/Feb/2021\"\n            },\n            {\n                \"TotalDayTrips\": \"1\",\n                \"TotalDayAmount\": 12000,\n                \"Tripdate\": \"Thursday-25/Feb/2021\"\n            },\n            {\n                \"TotalDayTrips\": \"1\",\n                \"TotalDayAmount\": 6000,\n                \"Tripdate\": \"Friday-26/Feb/2021\"\n            }\n        ],\n        \"monthlyData\": [\n            {\n                \"TotalMonthTrips\": \"1\",\n                \"TotalMonthAmount\": 5000,\n                \"Month\": \"Jan-2021\"\n            },\n            {\n                \"TotalMonthTrips\": \"4\",\n                \"TotalMonthAmount\": 25000,\n                \"Month\": \"Feb-2021\"\n            }\n        ],\n        \"yearlyData\": [\n            {\n                \"TotalYearTrips\": \"1\",\n                \"TotalYearAmount\": 5000,\n                \"Year\": \"2018\"\n            },\n            {\n                \"TotalYearTrips\": \"1\",\n                \"TotalYearAmount\": 5000,\n                \"Year\": \"2020\"\n            },\n            {\n                \"TotalYearTrips\": \"5\",\n                \"TotalYearAmount\": 30000,\n                \"Year\": \"2021\"\n            }\n        ],\n        \"totalUserData\": [\n            {\n                \"totalTrips\": \"7\",\n                \"totalAmount\": 40000,\n                \"todayTrips\": \"0\",\n                \"todayAmount\": null,\n                \"totalCurrentWeekTrips\": \"3\",\n                \"totalCurrentWeekAmount\": 23000,\n                \"totalCurrentMonthTrips\": \"4\",\n                \"totalCurrentMonthAmount\": 25000\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (No driver found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "post",
    "url": "trip/v1/trip/driverReview",
    "title": "Driver Review",
    "description": "<p>Driver Review</p>",
    "version": "1.0.0",
    "name": "Driver_Review",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>uuid (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "customerFeedback",
            "description": "<p>customer feedback (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "ratingCustomer",
            "description": "<p>customer rating (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n  \"customerFeedback\":\"avg\",\n  \"ratingCustomer\":3,\n  \"uuid\":\"00a40171-a7ed-4dae-b0cb-1c126c664bce\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n\"responseCode\": \"SUCCESS\",\n\"message\": \"success\",\n\"code\": 200,\n\"result\": [\n1\n]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "post",
    "url": "trip/v1/driver/nearestCab",
    "title": "Find Nearest Cab",
    "description": "<p>Find Nearest Cab</p>",
    "version": "1.0.0",
    "name": "Find_Nearest_Cab",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "latitude",
            "description": "<p>Latitude(Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "longitude",
            "description": "<p>Longitude(Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "totalKms",
            "description": "<p>Total Kms(Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "totalTimeInMinute",
            "description": "<p>Total Time In Minute(Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "source",
            "description": "<p>Start location(Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "destination",
            "description": "<p>End location(Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"latitude\": \"28.456\",\n    \"longitude\": \"77.3456\",\n    \"totalKms\": 5.5,\n    \"totalTimeInMinute\": 30,\n    \"source\": \"Rajghat new delhi\",\n    \"destination\": \"India get new delhi\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        {\n            \"driverName\": \"Balwant Kumar\",\n            \"driverMobileNumber\": \"9015632171\",\n            \"driverId\": 3,\n            \"locationName\": \"New Delhi\",\n            \"addressLatitude\": 28.456,\n            \"addressLongitude\": 77.3456,\n            \"carId\": 1,\n            \"pricePerKilometer\": 10,\n            \"pricePerminute\": 5,\n            \"carNumber\": \"UP57856\",\n            \"carModel\": \"8 zAaa\",\n            \"driverStatus\": \"Available\",\n            \"carCapacity\": \"8 seated\",\n            \"bookingFees\": 300,\n            \"addDescription\": null,\n            \"distanceInKm\": 0.000379229178192033,\n            \"totalFare\": 505,\n            \"carImage\": \"https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1613232335291_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210223%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210223T044028Z&X-Amz-Expires=300000&X-Amz-Signature=7c84833fb56bee037b0f5b747d54337e382686948ee8d6d3fe855e44545d6735&X-Amz-SignedHeaders=host\"\n        },\n        {\n            \"driverName\": \"Balwant Kumar\",\n            \"driverMobileNumber\": \"9015632171\",\n            \"driverId\": 3,\n            \"locationName\": \"New Delhi\",\n            \"addressLatitude\": 28.456,\n            \"addressLongitude\": 77.3456,\n            \"carId\": 2,\n            \"pricePerKilometer\": 5,\n            \"pricePerminute\": 8,\n            \"carNumber\": \"DL57856\",\n            \"carModel\": \"9 zAaa\",\n            \"driverStatus\": \"Available\",\n            \"carCapacity\": \"8 seated\",\n            \"bookingFees\": 350,\n            \"addDescription\": null,\n            \"distanceInKm\": 0.000379229178192033,\n            \"totalFare\": 617.5,\n            \"carImage\": \"https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1613536808453_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210223%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210223T044028Z&X-Amz-Expires=300000&X-Amz-Signature=70c1aed65b71388ec76aac3147713b9343663df5312a09d23e1e3b47ccdaf3d6&X-Amz-SignedHeaders=host\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/customerOverview?customerId=6",
    "title": "Get Customer Trips Details",
    "description": "<p>Get Admin after successful login</p>",
    "version": "1.0.0",
    "name": "Get_Customer_Overview",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"weeklyData\": [\n            {\n                \"TotalDayTrips\": \"1\",\n                \"TotalDayAmount\": 5000,\n                \"Tripdate\": \"Sunday-21/Feb/2021\"\n            },\n            {\n                \"TotalDayTrips\": \"1\",\n                \"TotalDayAmount\": 12000,\n                \"Tripdate\": \"Thursday-25/Feb/2021\"\n            },\n            {\n                \"TotalDayTrips\": \"1\",\n                \"TotalDayAmount\": 6000,\n                \"Tripdate\": \"Friday-26/Feb/2021\"\n            }\n        ],\n        \"monthlyData\": [\n            {\n                \"TotalMonthTrips\": \"4\",\n                \"TotalMonthAmount\": 25000,\n                \"Month\": \"Feb-2021\"\n            }\n        ],\n        \"yearlyData\": [\n            {\n                \"TotalYearTrips\": \"4\",\n                \"TotalYearAmount\": 25000,\n                \"Year\": \"2021\"\n            }\n        ],\n        \"totalUserData\": [\n            {\n                \"totalTrips\": \"4\",\n                \"totalAmount\": 25000,\n                \"todayTrips\": \"0\",\n                \"todayAmount\": null,\n                \"totalCurrentWeekTrips\": \"3\",\n                \"totalCurrentWeekAmount\": 23000,\n                \"totalCurrentMonthTrips\": \"4\",\n                \"totalCurrentMonthAmount\": 25000,\n                \"totalCashPayment\": 2000,\n                \"totalCardPayment\": 17000,\n                \"totalWalletPayment\": 6000\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (No customer found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip",
    "title": "Get Trip by driver",
    "description": "<p>Get all Driver trip exclude scheduled trip</p>",
    "version": "1.0.0",
    "name": "Get_Driver_Trip",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"count\": 1,\n        \"rows\": [\n            {\n                \"uuid\": \"aa54631d-f044-47fb-82e9-a39cf2d4eaa2\",\n                \"tripId\": \"HT1615532628\",\n                \"tripDate\": \"2021-03-13T05:55:29Z\",\n                \"status\": \"Completed\",\n                \"startLocationName\": \"Noida\",\n                \"endLocationName\": \"Gujrat\",\n                \"driverId\": 2,\n                \"paymentType\": \"CASH\",\n                \"paymentAmount\": 2000,\n                \"totalKms\": 10,\n                \"totalTimeInMinute\": 5,\n                \"customerFeedback\": null,\n                \"driverFeedback\": null,\n                \"ratingCustomer\": 0,\n                \"ratingDriver\": 0,\n                \"canceledBy\": null,\n                \"tripType\": \"Scheduled\",\n                \"startLat\": 28.6117,\n                \"startLong\": 77.325,\n                \"endLat\": 28.6297,\n                \"endLong\": 77.2765,\n                \"driver_details\": {\n                    \"fullName\": \"Balwant Kumar\",\n                    \"mobileNumber\": \"9015632174\"\n                },\n                \"customer_details\": {\n                    \"fullName\": \"Balwant Kumar\",\n                    \"mobileNumber\": \"9015632174\"\n                },\n                \"carImage\": \"https://alphaseed-dev.s3.ap-south-1.amazonaws.com/1615532044999_img.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210316%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210316T075607Z&X-Amz-Expires=300000&X-Amz-Signature=eb55084912715cae16f3ce6da1762bf72c7085bff34bc8861d840fdb1ee73c6e&X-Amz-SignedHeaders=host\",\n                \"carNumber\": \"DL57856\",\n                \"carModel\": \"9 zAaa\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/leaders",
    "title": "Get All Trips Driver Details",
    "description": "<p>Get Admin after successful login</p>",
    "version": "1.0.0",
    "name": "Get_Leaders",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": " {\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        {\n            \"driver_id\": 3,\n            \"total_amount\": 40000,\n            \"driver_details\": {\n                \"full_name\": \"111\"\n            }\n        },\n        {\n            \"driver_id\": 4,\n            \"total_amount\": 5000,\n            \"driver_details\": {\n                \"full_name\": \"222\"\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (user not found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/tripsOverview",
    "title": "Get All Trips Details",
    "description": "<p>Get Admin after successful login</p>",
    "version": "1.0.0",
    "name": "Get_Trips",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"totalAmount\": 45000,\n        \"completedTrips\": 8,\n        \"availableDrivers\": 1,\n        \"OccupiedDrivers\": 1,\n        \"currentweekTrips\": 4,\n        \"lastWeekTrips\": 1,\n        \"currentweekRevenue\": 28000,\n        \"lastWeekRevenue\": 5000\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (user not found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/mostDrop",
    "title": "Get most drop data",
    "description": "<p>Get most drop data</p>",
    "version": "1.0.0",
    "name": "Get_most_drop_data",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"Dav Public School, Faridabad Sainik Colony, Sector 49, Faridabad, Haryana\": 30,\n        \"SRS Mall Main Building Sector 12, Faridabad, Haryana, India\": 11,\n        \"Bank More Dhanbad, Jharkhand, India\": 11,\n        \"Mysore Road Metro Station Deepanjali Nagar, Old Guddadahalli, Guddadahalli, Bengaluru, Karnataka, India\": 10,\n        \"Laxmi Nagar\": 7,\n        \"Shrilekha Talkies Kusunda, Jharkhand, India\": 6,\n        \"Karol Bagh New Delhi, Delhi, India\": 6,\n        \"PES University Road Dwaraka Nagar, Banashankari, Bengaluru, Karnataka, India\": 5,\n        \"Silk Board, Santhosapuram, Sector 6, HSR Layout, Bengaluru, Karnataka 560102, India\": 5,\n        \"Laxmi Nagar New Delhi, Delhi, India\": 3,\n        \"Janakpuri New Delhi, Delhi, India\": 3,\n        \"Hirapur, Pandey Muhalla Dhanbad, Jharkhand, India\": 2,\n        \"Metro Station Mysore Road Nayanda Halli, Bengaluru, Karnataka\": 2,\n        \"The Amazing Museum & Gallery\": 2,\n        \"Vijayanagar Bus Depot Chord Road, Govindaraja Nagar Ward, Basaveshwara HBCS Layout, Vijayanagar, Bengaluru, Karnataka, India\": 2,\n        \"Gujrat\": 2,\n        \"Dav public school Faridabad\": 2,\n        \"Dwarka New Delhi, Delhi, India\": 2,\n        \"Dwarka Sector 21 Metro Station Sector 21, Dwarka, New Delhi, Delhi, India\": 2,\n        \"Mysore Road Metro Station\": 2,\n        \"Katrasgarh Katras, Jharkhand, India\": 2,\n        \"Laxm\": 2,\n        \"Matkuriya Dhanbad, Jharkhand, India\": 2,\n        \"Laxmi\": 2,\n        \"Banashankari BMTC Bus Depot Banashankari, Bengaluru, Karnataka, India\": 2,\n        \"Gole Ka Mandir Road Mahaveer, Morar, Gwalior, Madhya Pradesh, India\": 1,\n        \"Godhar Dhanbad, Jharkhand, India\": 1,\n        \"ISM Dhanbad Internal Road Housing Colony, Sardar Patel Nagar, Dhanbad, Jharkhand, India\": 1,\n        \"Laxmangarh Rajasthan, India\": 1,\n        \"25a, 2nd Main Rd, 2nd Stage, Hoysala Nagar, Naagarabhaavi, Bengaluru, Karnataka 560072, India\": 1,\n        \"Dhanbad Railway Station Road New Station Railway Colony, Damodarpur, Dhanbad, Jharkhand, India\": 1,\n        \"Deepanjali Nagar BMTC Bus Depot Building Mysore Road, Patel Puttanna Industrial Estate, Deepanjali Nagar, Bengaluru, Karnataka, India\": 1,\n        \"PES University, Ring Road, Bangalore\": 1,\n        \"Dari Mohalla Damodarpur, Dhanbad, Jharkhand, India\": 1,\n        \"Banashankari Temple, Bangalore\": 1,\n        \"Janak Cinema Complex Pankha Road, Block C 6A, Janakpuri, New Delhi, Delhi, India\": 1,\n        \"Bekar Bandh Road Kasturba Nagar, Dhanbad, Jharkhand, India\": 1,\n        \"Iskcon Temple, Rajajinagar 1st R Block, Rajajinagar, Bengaluru, Karnataka\": 1,\n        \"Banashankari Bengaluru, Karnataka, India\": 1,\n        \"1 Cross AGS Layout, Ittamadu, Hosakerehalli, Bangalore, Karnataka, India\": 1,\n        \"Nall\": 1,\n        \"Banashankari Temple Ward Bengaluru, Karnataka, India\": 1,\n        \"PES University Road Dwaraka Nagar, Banashankari, Bangalore, Karnataka, India\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/mostPickup",
    "title": "Get most pickup data",
    "description": "<p>Get most pickup data</p>",
    "version": "1.0.0",
    "name": "Get_most_pickup_data",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"387, Friends Colony, Sector 14, Faridabad, Haryana 121007, India\": 38,\n        \"Unnamed Road, Kusunda, Jharkhand 828116, India\": 28,\n        \"D/39/1, Jyoti Nagar West, Block D, Jyoti Nagar, Shahdara, New Delhi, Delhi 110053, India\": 18,\n        \"78, 1st Cross Rd, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India\": 13,\n        \"Mayur Vihar Phase 3\": 7,\n        \"PES University Road Dwaraka Nagar, Banashankari, Bengaluru, Karnataka, India\": 5,\n        \"Mysore Road, Mysore Rd, Muthachari Industrial Estate, Deepanjali Nagar, Bengaluru, Karnataka 560039, India\": 5,\n        \"5, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India\": 3,\n        \"Dubai School\": 2,\n        \"Noida\": 2,\n        \"Little Flower Public School 2nd Phase, Banashankari 3rd Stage, Hosakerehalli, Bengaluru, Karnataka\": 2,\n        \"Hno.w-210 Chandrashekhar Azad Gali,, Jyoti Nagar West, Jyoti Nagar, Shahdara, Delhi, 110032, India\": 2,\n        \"Sector 14 Faridabad, Haryana, India\": 2,\n        \"611, Sector 15, Faridabad, Haryana 121007, India\": 1,\n        \"16, 1st Main Rd, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India\": 1,\n        \"386, Friends Colony, Sector 14, Faridabad, Haryana 121007, India\": 1,\n        \"D/39, H Block, Jyoti Nagar West, Block D, Jyoti Nagar, Shahdara, New Delhi, Delhi 110053, India\": 1,\n        \"No.030, 3rd Floor, 1st Main Road, OppMookambika Temple, HoskereHalli, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India\": 1,\n        \"41, 1st Cross Rd, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India\": 1,\n        \"PES University\": 1,\n        \"home\": 1,\n        \"5A, Dr MC Modi Hospital Rd, West of Chord Road 2nd Stage, Manjunath Nagar, Basaveshwar Nagar, Bengaluru, Karnataka 560010, India\": 1,\n        \"Mysore Road Metro station\": 1,\n        \"Manjeera Diamond Towers Rd, Tellapur, Nalagandla, Telangana 500019, India\": 1,\n        \"Tejendra Nath Ki Gali, Dal Bazaar, Lashkar, Gwalior, Madhya Pradesh 474009, India\": 1,\n        \"PES University, Ring Road, Bangalore\": 1,\n        \"D36, Jyoti Nagar West, Block D, Jyoti Nagar, Shahdara, New Delhi, Delhi 110053, India\": 1,\n        \"Orion Mall Brigade Gateway Road, Subramanyanagar,2 State, Rajajinagar, Bengaluru, Karnataka, India\": 1,\n        \"391, Friends Colony, Sector 14, Faridabad, Haryana 121007, India\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/todayTrips",
    "title": "Get today trips",
    "description": "<p>Get today trips</p>",
    "version": "1.0.0",
    "name": "Get_today_trips",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"Scheduled\": 0,\n        \"Ongoing\": 0,\n        \"Completed\": 0,\n        \"Cancelled\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/driverTotalEarning",
    "title": "My Earnings",
    "description": "<p>My Earnings</p>",
    "version": "1.0.0",
    "name": "My_Earnings",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token by admin or superAdmin</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"previousTrip\": {\n            \"id\": 549,\n            \"uuid\": \"dda60b23-60d3-4919-8151-247c2732aa5f\",\n            \"tripId\": \"HT1616949452\",\n            \"tripDate\": \"2021-03-28T16:37:31Z\",\n            \"status\": \"Completed\",\n            \"paymentAmount\": 950,\n            \"startLat\": 12.9288,\n            \"startLong\": 77.5361,\n            \"endLat\": 12.9467,\n            \"endLong\": 77.5301,\n            \"driverId\": 2,\n            \"customerId\": 5,\n            \"ratingCustomer\": 0,\n            \"customer_details\": {\n                \"fullName\": \"Archana ML\",\n                \"mobileNumber\": \"9743994561\",\n                \"profileImage\": \"https://alphaseed-dev.s3.ap-south-1.amazonaws.com/HT_1616039725719ZTbebL6R.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARDLXDWGHP2XKAJPB%2F20210331%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20210331T132242Z&X-Amz-Expires=300000&X-Amz-Signature=03e84305785a7df2f73bb67bf82439b59a531813688e67c78bcd2761ffa83a6b&X-Amz-SignedHeaders=host\",\n                \"createdAt\": \"2021-03-15T10:46:04.000Z\"\n            }\n        },\n        \"last7DaysTrip\": [\n            {\n                \"totalFare\": 52165.47998046875,\n                \"completedTrips\": \"38\",\n                \"totalKms\": 446.7999999523163\n            }\n        ],\n        \"todayEarning\": [\n            {\n                \"totalFare\": 1160,\n                \"completedTrips\": \"2\",\n                \"totalKms\": 45\n            }\n        ],\n        \"totalEarning\": [\n            {\n                \"totalFare\": 1530556.896238327,\n                \"completedTrips\": \"196\",\n                \"totalKms\": 2116.8549990725005\n            }\n        ],\n        \"hoursAvailable\": \"0\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (user not found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "post",
    "url": "trip/v1/trip/shareCustomerStatus",
    "title": "Share Customer Status",
    "description": "<p>Share Customer Status</p>",
    "version": "1.0.0",
    "name": "Share_Customer_Status",
    "group": "Trip",
    "permission": [
      {
        "name": "public"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tripId",
            "description": "<p>Trip Id(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "receiverId",
            "description": "<p>Receiver Id (Required)[e.g Receiver Email Id, WhatsApp No etc ]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shareMethod",
            "description": "<p>Share Method (Required)[Airdrop,Email,SMS,WhatsApp]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message (Required) [I have booked an ride with Ourlane. Track this ride: (link) Vehicle number: XXXXX Driver Contact Number]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example ",
          "content": "{\n    \"tripId\": \"HT1613726482\",\n    \"receiverId\": \"test@mailinator.com\",\n    \"shareMethod\": \"SMS\",\n    \"message\": \"I have booked an ride with OurLane. Track this ride: (link) Vehicle number: XXXXX Driver Contact Number\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"uuid\": \"7a9945b2-3976-49f9-b38b-823440380b76\",\n        \"id\": 1,\n        \"tripId\": \"HT1613726482\",\n        \"receiverId\": \"test@mailinator.com\",\n        \"shareMethod\": \"SMS\",\n        \"message\": \"I have booked an ride with OurLane. Track this ride: (link) Vehicle number: XXXXX Driver Contact Number\",\n        \"updatedAt\": \"2021-02-20T06:48:55.225Z\",\n        \"createdAt\": \"2021-02-20T06:48:55.225Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (username is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "post",
    "url": "trip/v1/trip/updateTripStatus",
    "title": "Trip Acceptance",
    "description": "<p>Trip Acceptance from driver side</p>",
    "version": "1.0.0",
    "name": "Trip_Acceptance",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Trip uuid (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status (Required) [Ongoing/Rejected/Completed]</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "totalKms",
            "description": "<p>Total Kms (Optional)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>reason (Optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"uuid\": \"9cebdcd1-b52c-4889-9059-ff5d5842f582\",\n    \"status\": \"Ongoing\",\n    \"totalKms\": \"0\",\n    \"reason\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"id\": 21,\n        \"uuid\": \"1d7f324c-b325-4d17-818a-b4489a2fffa1\",\n        \"locationType\": \"Home\",\n        \"startLat\": 28.6117,\n        \"startLong\": 77.325,\n        \"endLat\": 28.6297,\n        \"endLong\": 77.2765,\n        \"startLocationName\": \"Mayur Vihar Phase 3\",\n        \"endLocationName\": \"Laxmi Nagar\",\n        \"paymentType\": \"CASH\",\n        \"cardType\": \"\",\n        \"cardNo\": \"0\",\n        \"paymentAmount\": 2000,\n        \"status\": \"Ongoing\",\n        \"tripId\": \"HT1613621846\",\n        \"tripDate\": \"2021-02-18T04:17:26+00:00\",\n        \"otp\": 6393,\n        \"customerFeedback\": null,\n        \"driverFeedback\": null,\n        \"ratingCustomer\": null,\n        \"ratingDriver\": null,\n        \"pickUpTime\": null,\n        \"dropTime\": null,\n        \"description\": null,\n        \"canceledBy\": null,\n        \"totalKms\": 0,\n        \"totalTimeInMinute\": 0,\n        \"tripType\": null,\n        \"createdAt\": \"2021-02-18T04:17:26.000Z\",\n        \"updatedAt\": \"2021-03-01T04:51:06.000Z\",\n        \"driverId\": 78,\n        \"customerId\": 78,\n        \"driver_details\": {\n            \"fullName\": \"Raushan Kumar\",\n            \"mobileNumber\": \"9015123632\"\n        },\n        \"customer_details\": {\n            \"fullName\": \"Rakesh Kumar\",\n            \"mobileNumber\": \"9015621345\"\n        },\n        \"totalFare\": 300\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "post",
    "url": "trip/v1/trip",
    "title": "Trip Creation",
    "description": "<p>Trip creation  after successful login</p>",
    "version": "1.0.0",
    "name": "Trip_Creation",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "locationType",
            "description": "<p>Location Type (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "startLocationName",
            "description": "<p>Start Location Name (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "endLocationName",
            "description": "<p>End Location Name (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "startLat",
            "description": "<p>Start Latitude (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "startLong",
            "description": "<p>Start Longitude (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "endLat",
            "description": "<p>End Latitude (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "endLong",
            "description": "<p>End Longitude (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "paymentType",
            "description": "<p>Payment Type (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "cardType",
            "description": "<p>Card Type (Optional)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "cardNo",
            "description": "<p>Card No (Optional)</p>"
          },
          {
            "group": "Body Params",
            "type": "Integer",
            "optional": false,
            "field": "paymentAmount",
            "description": "<p>Payment Amount (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Integer",
            "optional": false,
            "field": "driverId",
            "description": "<p>Driver Id (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "totalKms",
            "description": "<p>Total Kms (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Float",
            "optional": false,
            "field": "totalTimeInMinute",
            "description": "<p>Total Time In Minute (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Datetime",
            "optional": false,
            "field": "dateTime",
            "description": "<p>Date Time (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"locationType\": \"Home\",\n    \"startLocationName\": \"Mayur Vihar Phase 3\",\n    \"endLocationName\": \"Laxmi Nagar\",\n    \"startLat\": 28.6117,\n    \"startLong\": 77.325,\n    \"endLat\": 28.6297,\n    \"endLong\": 77.2765,\n    \"paymentType\": \"Cash\",\n    \"cardType\": \"DEBIT\",\n    \"cardNo\": \"987076452233\",\n    \"paymentAmount\": 2000,\n    \"driverId\": 7,\n    \"totalKms\": 5,\n    \"totalTimeInMinute\": 30,\n    \"dateTime\": \"2021-02-26 12:10:02\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"customerFeedback\": null,\n        \"driverFeedback\": null,\n        \"ratingCustomer\": null,\n        \"ratingDriver\": null,\n        \"id\": 9,\n        \"uuid\": \"2594f33a-d369-4b68-b630-bc89dc458971\",\n        \"locationType\": \"Home\",\n        \"tripId\": \"HT1614056167\",\n        \"tripDate\": \"2021-02-23T10:26:06+05:30\",\n        \"customerId\": 6,\n        \"driverId\": 7,\n        \"status\": \"Scheduled\",\n        \"startLat\": 28.6117,\n        \"startLong\": 77.325,\n        \"endLat\": 28.6297,\n        \"endLong\": 77.2765,\n        \"startLocationName\": \"Mayur Vihar Phase 3\",\n        \"endLocationName\": \"Laxmi Nagar\",\n        \"paymentType\": \"Cash\",\n        \"cardType\": \"DEBIT\",\n        \"cardNo\": \"987076452233\",\n        \"paymentAmount\": 2000,\n        \"otp\": \"4423\",\n        \"totalKms\": 5,\n        \"totalTimeInMinute\": 0,\n        \"tripType\": \"rightNow\",\n        \"updatedAt\": \"2021-02-23T04:56:06.717Z\",\n        \"createdAt\": \"2021-02-23T04:56:06.717Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "post",
    "url": "trip/v1/trip/tripList",
    "title": "Trip List",
    "description": "<p>All Trip List from driver side</p>",
    "version": "1.0.0",
    "name": "Trip_List",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "perPage",
            "description": "<p>perPage uuid (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>pageNumber (Required)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "searchByName",
            "description": "<p>searchByName (Optional)</p>"
          },
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "tripStatus",
            "description": "<p>tripStatus (Required) [Completed/Rejected/Ongoing/Cancelled/Scheduled]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"perPage\": 10,\n    \"pageNumber\": 1,\n    \"searchByName\": \"\",\n    \"tripStatus\": \"Scheduled\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"count\": 6,\n        \"rows\": [\n            {\n                \"uuid\": \"d60e88ed-31fe-4ce0-9d8d-5a3440a24d6a\",\n                \"tripId\": \"HT1615868535\",\n                \"tripDate\": \"2021-03-16T04:22:15Z\",\n                \"status\": \"Scheduled\",\n                \"startLocationName\": \"Sector 14 fardbad\",\n                \"endLocationName\": \"Dav Public School, Faridabad Sainik Colony, Sector 49, Faridabad, Haryana\",\n                \"driverId\": 2,\n                \"paymentType\": \"CASH\",\n                \"paymentAmount\": 200,\n                \"totalKms\": 8.087,\n                \"totalTimeInMinute\": 22.25,\n                \"description\": null,\n                \"customerFeedback\": null,\n                \"driverFeedback\": null,\n                \"ratingCustomer\": 0,\n                \"ratingDriver\": 0,\n                \"canceledBy\": null,\n                \"tripType\": \"Rightnow\",\n                \"startLat\": 28.4001,\n                \"startLong\": 77.3304,\n                \"endLat\": 28.3979,\n                \"endLong\": 77.2737,\n                \"driver_details\": {\n                    \"fullName\": \"Tony Stark\",\n                    \"mobileNumber\": \"9900770011\",\n                    \"profileImage\": null\n                },\n                \"customer_details\": {\n                    \"fullName\": \"Aditya Jaitly\",\n                    \"mobileNumber\": \"7838582402\",\n                    \"profileImage\": null\n                },\n                \"driver_info\": {\n                    \"locationName\": \"Home\",\n                    \"addressLatitude\": 12.9291,\n                    \"addressLongitude\": 77.5362\n                },\n                \"totalFare\": 806.525\n            },\n            {\n                \"uuid\": \"b5afed32-f907-4f3a-976e-70d3e22cf24d\",\n                \"tripId\": \"HT1615807194\",\n                \"tripDate\": \"2021-03-15T11:19:54Z\",\n                \"status\": \"Scheduled\",\n                \"startLocationName\": \"79, 1st Cross Rd, Mookambika Nagar, Hosakerehalli, Bengaluru, Karnataka 560085, India\",\n                \"endLocationName\": \"Metro Station Mysore Road Nayanda Halli, Bengaluru, Karnataka\",\n                \"driverId\": 2,\n                \"paymentType\": \"CASH\",\n                \"paymentAmount\": 3,\n                \"totalKms\": 4.141,\n                \"totalTimeInMinute\": 12.8833,\n                \"description\": null,\n                \"customerFeedback\": null,\n                \"driverFeedback\": null,\n                \"ratingCustomer\": 0,\n                \"ratingDriver\": 0,\n                \"canceledBy\": null,\n                \"tripType\": \"Rightnow\",\n                \"startLat\": 12.9288,\n                \"startLong\": 77.5362,\n                \"endLat\": 12.9459,\n                \"endLong\": 77.5302,\n                \"driver_details\": {\n                    \"fullName\": \"Tony Stark\",\n                    \"mobileNumber\": \"9900770011\",\n                    \"profileImage\": null\n                },\n                \"customer_details\": {\n                    \"fullName\": \"Archana ML\",\n                    \"mobileNumber\": \"9743994561\",\n                    \"profileImage\": null\n                },\n                \"driver_info\": {\n                    \"locationName\": \"Home\",\n                    \"addressLatitude\": 12.9291,\n                    \"addressLongitude\": 77.5362\n                },\n                \"totalFare\": 510.575\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "put",
    "url": "trip/v1/trip",
    "title": "Update Trip PickUpTime",
    "description": "<p>Update Trip PickUpTime</p>",
    "version": "1.0.0",
    "name": "Update_Trip_PickUpTime",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Params": [
          {
            "group": "Body Params",
            "type": "String",
            "optional": false,
            "field": "uuid",
            "description": "<p>Trip uuid (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"uuid\": \"348dbec2-bcdf-4eb3-a434-4af9b669fafd\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": [\n        1\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (email is required)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  },
  {
    "type": "get",
    "url": "trip/v1/trip/tripsTotalOverview",
    "title": "getTotalCompleted Trips of DashBoard-analytics",
    "description": "<p>getTotalCompleted Trips of DashBoard-analytics</p>",
    "version": "1.0.0",
    "name": "tripsTotalOverview_for_DashBoard-analytics",
    "group": "Trip",
    "permission": [
      {
        "name": "private"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>jwt token by admin or superAdmin</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example",
          "content": "{\n    \"driverId\": \"2\",\n    \"dateTime\": \"2021-03-18T04:51:33Z\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "OK 200": [
          {
            "group": "OK 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>200=OK</p>"
          },
          {
            "group": "OK 200",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>true for success and false for failure</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Success)</p>"
          },
          {
            "group": "OK 200",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>result object</p>"
          },
          {
            "group": "OK 200",
            "type": "String",
            "optional": false,
            "field": "appVersion",
            "description": "<p>API version</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"responseCode\": \"SUCCESS\",\n    \"message\": \"success\",\n    \"code\": 200,\n    \"result\": {\n        \"weeklyData\": [\n            {\n                \"totalTodayAmount\": 457.9249877929688,\n                \"completedTrips\": \"1\",\n                \"date\": \"Friday-19/Mar/2021\"\n            },\n            {\n                \"totalTodayAmount\": 450.8399963378906,\n                \"completedTrips\": \"2\",\n                \"date\": \"Sunday-21/Mar/2021\"\n            },\n            {\n                \"totalTodayAmount\": 1167217.5081996918,\n                \"completedTrips\": \"23\",\n                \"date\": \"Monday-22/Mar/2021\"\n            },\n            {\n                \"totalTodayAmount\": 22617.06015777588,\n                \"completedTrips\": \"30\",\n                \"date\": \"Tuesday-23/Mar/2021\"\n            },\n            {\n                \"totalTodayAmount\": 8090.125610351562,\n                \"completedTrips\": \"8\",\n                \"date\": \"Wednesday-24/Mar/2021\"\n            },\n            {\n                \"totalTodayAmount\": 4950.127166748047,\n                \"completedTrips\": \"10\",\n                \"date\": \"Thursday-25/Mar/2021\"\n            }\n        ],\n        \"monthlyData\": [\n            {\n                \"totalMonthlyAmount\": 415,\n                \"completedTrips\": \"1\",\n                \"Month\": \"Feb-2021\"\n            },\n            {\n                \"totalMonthlyAmount\": 1307633.5461406708,\n                \"completedTrips\": \"146\",\n                \"Month\": \"Mar-2021\"\n            }\n        ],\n        \"yearlyData\": [\n            {\n                \"totalYeaelyAmount\": 2825,\n                \"completedTrips\": \"1\",\n                \"year\": \"2020\"\n            },\n            {\n                \"totalYeaelyAmount\": 1308048.5461406708,\n                \"completedTrips\": \"147\",\n                \"year\": \"2021\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (user not found)</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>400=Bad Request</p>"
          },
          {
            "group": "Bad Request 400",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ],
        "Internal Server Error 500": [
          {
            "group": "Internal Server Error 500",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>false</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>API Response message (Internal Server Error)</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>500=Internal Server Error</p>"
          },
          {
            "group": "Internal Server Error 500",
            "type": "Object[]",
            "optional": false,
            "field": "result",
            "description": "<p>Blank Object</p>"
          }
        ]
      }
    },
    "filename": "src/documentation/document.ts",
    "groupTitle": "Trip"
  }
] });
