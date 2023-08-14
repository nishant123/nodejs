import { firebaseConfig } from "../config/constants";

const request = require('request');

export default class FirebasePushNotification {

    static async sendAndroidNotification(registrationId, message) {
        return new Promise(function(resolve,reject){
            var headerarr = {
                'Content-Type': 'application/json',
                'Authorization':'key='+firebaseConfig.FIREBASE_API_KEY
            };

            let messagearr: any = {};
            let finalarr: any = {};

            messagearr.message = message;
            finalarr.registration_ids = registrationId;
            finalarr.data = messagearr;
            finalarr = JSON.stringify(finalarr);

            request({
                headers: headerarr,
                uri:     'https://fcm.googleapis.com/fcm/send',
                method: 'POST',
                body:    finalarr
            }, function(error, response, body){
                if(error){
                    console.log('Error while notification to FCM')
                }
                else
                {
                    console.log(body)
                    resolve('success');
                }

            });
        });
    }
}