const emails = [{
    type: 'WELCOME',
    subject: 'Welcome to Habtoorist',
    body: '<html><body style="padding:68px 0; font-family: Arial, sans-serif; margin:0; text-align:center;background: #F5F5F5;"><div style="width: 600px;background: #FFFFFF;margin: auto;padding: 20px 25px;box-shadow: 0px 4px 12px #0000000D;"><div style="background: #558BFF; text-align: left; border-radius: 4px; padding: 11px;"><img style="vertical-align: middle; width: 131px; height: 38px; margin-right: 24px;" src="[LOCALHOST]/assets/images/logo.png" alt="logo"/></div><div style="padding: 30px 0 0"><img style="width: 40px; height: 40px" src="[LOCALHOST]/assets/images/email.png"><h4 style="font-weight: 700; font-size: 18px; color: #434343; margin-top: 5px; margin-bottom: 0;font-family: Arial, sans-serif;"> Hi <span style="color: #180E49;">[NAME],</span></h4><p style="font-weight: 400; font-size: 18px; color: #180E49; margin-top: 5px; font-family: Arial, sans-serif;">Welcome to Habtoorist</p><p style="font-weight: 400; width: 300px; font-size: 14px; color:#727272; margin-top: 5px;margin: auto; line-height: 22px;font-family: Arial, sans-serif;">Please use the your password to login</p><div style="padding-top: 47px; margin-bottom: 21px"></div><a href="[LOCALHOST]/login" style="background: #558BFF;color: #fff;text-decoration: none; font-size: 14px;width: 238px;height: 40px;display: inline-block;line-height: 40px;border-radius: 4px;font-family: Arial, sans-serif;cursor: pointer;font-weight: 600;">Take me to Login</a></div><div style="color: #9B9B9B;font-size: 8px; margin-top:37px ">Habtoorist is developed by Block Gemini. Copyright © 2020. All Rights Reserved.</div></div></body></html>',
    status: true,
},
{
    type: 'OTP',
    subject: 'Habtoorist Secret OTP - Please do not share it with others',
    body: '<html><body style="padding:68px 0; margin:0; text-align:center;background: #F5F5F5;font-family: Arial, sans-serif;"><div style="width: 600px;background: #FFFFFF;margin: auto;padding: 20px 25px;box-shadow: 0px 4px 12px #0000000D;"><div style="background: #558BFF; text-align: left; border-radius: 4px; padding: 11px;"><img style="vertical-align: middle; width: 131px; height: 38px; margin-right: 24px;" src="[LOCALHOST]/assets/images/logo.png" alt="logo"/></div><div style="padding: 30px 0 0"><img style="width: 40px; height: 40px" src="[LOCALHOST]/assets/images/email.png"><h4 style="font-weight: 700; font-size: 24px; color: #180E49; margin-top: 5px; margin-bottom: 0;font-family: Arial, sans-serif;"> Hi [NAME],</h4><p style="font-weight: 400; font-size: 18px; color: #180E49; margin-top: 5px;font-family: Arial, sans-serif;">Welcome to Habtoorist</p><p style="font-weight: 400; width: 300px; font-size: 14px; color:#727272; margin-top: 5px; margin: auto; line-height: 20px;font-family: Arial, sans-serif;">Please use the below OTP for verification. OTP valid for next 03:00 minutes.</p><div style="padding-top: 47px; margin-bottom: 21px"><p style="font-weight: 400; font-size: 12px; color: #180E49; margin-top: 5px;font-family: Arial, sans-serif;">System generated OTP</p><p style="font-weight: 700;font-size: 14px; color:#558BFF; background: #F0F0F0; margin-top: 5px; width: 89px;height: 40px;margin: auto; line-height: 40px;border-radius: 4px;font-family: Arial, sans-serif;letter-spacing: 8px;">[OTP_VALUE]</p></div></div><div style="color: #9B9B9B;font-size: 8px; margin-top:37px;font-family: Arial, sans-serif; ">Habtoorist developed by Block Gemini. Copyright © 2020. All Rights Reserved.</div></div></body></html>',
    status: true,
}
];


module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        return true;
    },
    // eslint-disable-next-line no-unused-vars
    down(queryInterface, Sequelize) {

    },
    emails
};
