export default {
  swagger: '2.0',
  info: {
    description: '',
    version: '1.0.0',
    title: 'Habtoorist',
    termsOfService: '',
    contact: {
      email: 'api@habtoorist.com'
    }
  },
  host: '127.0.0.1:4000',
  basePath: '/api/v1',
  tags: [
    {
      name: 'Habtoorist',
      description: 'Habtoorist API Docs'
    }
  ],
  schemes: [
    'http'
  ],
  paths: {
    '/auth': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Login',
        description: 'Login',
        operationId: 'login',
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Login',
            required: true,
            schema: {
              $ref: '#/definitions/login'
            }
          }
        ],
        responses: {
          200: {
            message: 'SUCCESS',
            result: {
              token: 'jwtToken'
            }
          },
          403: {
            description: 'Invalid input Error'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/auth/check-account': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Check Account',
        description: 'Check an account is exist or not',
        operationId: 'checkAccount',
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Check Account',
            required: true,
            schema: {
              $ref: '#/definitions/checkAccount'
            }
          }
        ],
        responses: {
          200: {
            description: 'SUCCESS'
          },
          403: {
            description: 'Invalid input Error'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/auth/send-otp': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Send otp',
        description: 'Send otp to the email address',
        operationId: 'sendOtp',
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Send Otp',
            required: true,
            schema: {
              $ref: '#/definitions/checkAccount'
            }
          }
        ],
        responses: {
          200: {
            description: 'SUCCESS'
          },
          403: {
            description: 'Invalid input Error'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/auth/verify-otp': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Verify otp',
        description: 'Verify otp',
        operationId: 'sendOtp',
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Send Otp',
            required: true,
            schema: {
              $ref: '#/definitions/verifyOtp'
            }
          }
        ],
        responses: {
          200: {
            message: 'SUCCESS',
            result: {
              verificationCode: 'someString'
            }
          },
          403: {
            description: 'Invalid input Error'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/auth/set-password': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Set password of the user',
        description: 'Set password of the user',
        operationId: 'setPassword',
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Set password',
            required: true,
            schema: {
              $ref: '#/definitions/setPassword'
            }
          }
        ],
        responses: {
          200: {
            message: 'SUCCESS'
          },
          403: {
            description: 'Invalid input Error'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    'auth/change-password': {
      post: {
        tags: [
          'Auth'
        ],
        summary: 'Change password of the user',
        description: 'change password of the user',
        operationId: 'changePassword',
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Change password',
            required: true,
            schema: {
              $ref: '#/definitions/changePassword'
            }
          },
          {
            in: 'header',
            name: 'x-access-token',
            description: 'token',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            message: 'SUCCESS'
          },
          403: {
            description: 'Invalid input Error'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    },
    '/user': {
      post: {
        tags: [
          'User'
        ],
        summary: 'createUser',
        description: 'createUser',
        operationId: 'createUser',
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Create User',
            required: true,
            schema: {
              $ref: '#/definitions/createUser'
            }
          },
          {
            in: 'header',
            name: 'x-access-token',
            description: 'token',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            message: 'SUCCESS',
            result: {
              token: 'jwtToken'
            }
          },
          403: {
            description: 'Invalid input Error'
          },
          500: {
            description: 'Internal Server Error'
          }
        }
      }
    }
  },
  definitions: {
    checkAccount: {
      type: 'object',
      required: [
        'email'
      ],
      properties: {
        email: {
          type: 'string',
          example: 'xyz@example.com',
          required: true
        }
      },
      xml: {
        name: 'checkAccount'
      }
    },
    verifyOtp: {
      type: 'object',
      required: [
        'email',
        'otp'
      ],
      properties: {
        email: {
          type: 'string',
          example: 'xyz@example.com',
          required: true
        },
        otp: {
          type: 'string',
          example: '123456',
          required: true
        }
      },
      xml: {
        name: 'verifyOtp'
      }
    },
    setPassword: {
      type: 'object',
      required: [
        'email',
        'password',
        'verificationCode'
      ],
      properties: {
        email: {
          type: 'string',
          example: 'xyz@example.com',
          required: true
        },
        password: {
          type: 'string',
          example: '123456',
          required: true
        },
        verificationCode: {
          type: 'string',
          example: 'SomeString',
          required: true
        }
      },
      xml: {
        name: 'setPassword'
      }
    },
    login: {
      type: 'object',
      required: [
        'email',
        'password'
      ],
      properties: {
        email: {
          type: 'string',
          example: 'xyz@example.com',
          required: true
        },
        password: {
          type: 'string',
          example: '123456',
          required: true
        }
      },
      xml: {
        name: 'login'
      }
    },
    changePassword: {
      type: 'object',
      required: [
        'password',
        'oldPassword'
      ],
      properties: {
        password: {
          type: 'string',
          example: '123456',
          required: true
        },
        oldPassword: {
          type: 'string',
          example: '1234567',
          required: true
        }
      },
      xml: {
        name: 'changePassword'
      }
    },
    createUser: {
      type: 'object',
      required: [
        'email',
        'organizationId'
      ],
      properties: {
        email: {
          type: 'string',
          example: 'xyz@example.com',
          required: true
        },
        role: {
          type: 'string',
          example: 'ADMIN',
          required: true
        },
        organizationId: {
          type: 'string',
          example: '1234567',
          required: true
        }
      },
      xml: {
        name: 'changePassword'
      }
    }
  }
};
