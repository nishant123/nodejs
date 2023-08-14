import * as cron from 'node-cron';
import * as moment from 'moment';
const axios = require('axios');
//import { vars } from '../config/vars';
//const { userServicesURL } = vars;

export default class axiosCallApi {

    static async getCall(servicesURL, token: any, params: any) {
        return axios.get(
            servicesURL,
            {
                headers: {
                    'x-access-token': token
                }
            },
            {
                params: params
            }
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    static async postCall(servicesURL, token: any, body: any) {
        return axios.post(
            servicesURL,
            {
                headers: {
                    'x-access-token': token
                }
            },
            {
                data: body
            }
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })

    }


}



