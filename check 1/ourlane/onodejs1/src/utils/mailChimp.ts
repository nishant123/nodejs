import { vars } from '../config/vars';
const { mailChimpCredentials } = vars;
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: mailChimpCredentials.apiKey,
    server: mailChimpCredentials.server,
  });

export default class MailChimp {
    static async sendMailChimpSubscription(userDetails:{ firstName:string;lastName:string,email:string}) {
        const { firstName, lastName, email } = userDetails;
        // Make sure fields are filled
        if (!firstName || !lastName || !email) {
          return "provideAllTheDetails" 
        }
      try{
        const result = await client.lists.addListMember(mailChimpCredentials.audienceId, {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          },
        }) 
      }catch(error){
       console.log("....",error)
      }
    }
}