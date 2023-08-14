import * as cron from 'node-cron';
import * as moment from 'moment';
import axios from 'axios';
//import { vars } from '../config/vars';
//const { userServicesURL } = vars;

export default class axiosCallApi {

    static async getCall(servicesURL, token: any, params: any) {
        let result = '';
        return axios.get(
            servicesURL,
            {
                headers: {
                    'x-access-token': token
                }
            },
        )
            .then((response) => {

                if (response.data.code == 200) {
                    result = response.data.result;
                    return result;
                }
            })
            .catch((error) => {
                return error;
            })
    }


    static async postCall(servicesURL, token: any, body: any) {
        
        return axios.post(servicesURL, body, {
            headers: {
                'Authorization': token
            }
        })
            .then(res => res.data)
            .catch(err => err);
    }


}



