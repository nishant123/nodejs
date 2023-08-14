// eslint-disable-next-line no-unused-vars
import * as express from 'express';
import { version } from '../config/constants';
import { errorManager } from '../config/errorManager';

class CustomResponse {
  result: any;

  response: express.Response;

  status: boolean;

  message: string;

  messageText: string;

  version: string = version.v1;

  code: number = 200;

  constructor(response: express.Response) {
    this.response = response;
  }

  /**
   *
   * @param {*} res
   * @param {*} successStatus
   * @param {*} status
   * @param {*} message
   * @param {*} appVersion
   * @param {*} result
   * @param {*} platformstatus
   */
  setResponse(
    options: any = {
      status: true,
      message: null,
      result: null,
      messageText: null
    }
  ) {
    this.status = options.status;
    this.result = options.result;
    this.message = options.message;

    if (!this.message) {
      this.messageText = 'success';
      this.message = 'SUCCESS';
      this.code = 200;
      this.status = true;
    }
    else {
      let found = false;
      // this is coming form an error, find suitable message and code
      // eslint-disable-next-line array-callback-return
      Object.keys(errorManager).find((key) => {
        if (errorManager[key].type !== 'VALIDATION_ERROR') {
          if (errorManager[key].type === this.message) {
            this.messageText = errorManager[key]['message'];
            this.code = errorManager[key]['code'];
            found = true;
          }
        }
      });

      if (this.message === errorManager['VALIDATION_ERROR'].type) {
        found = true;
        this.messageText = options.messageText;
        this.code = 400;
      }

      if (!found) {
        this.message = 'UNKNOWN_ERROR';
        this.code = 500;
        this.messageText = options.messageText;
      }
    }

    this.makeResponse();
  }

  /**
   * making response format
   */
  makeResponse() {
    // TODO : think for the cors policy
    this.response.set('Access-Control-Allow-Origin', '*');
    this.response.set('Pragma', 'no-cache');
    this.response.set('Cache-Control', 'no-store');
    this.response.status(this.code).send({
      responseCode: this.message,
      message: this.messageText,
      code:this.code,
      result: (this.result === null || this.result === 'null' || this.result === '') ? [] : this.result
    });
  }
}

// exporting all functions
export default CustomResponse;
