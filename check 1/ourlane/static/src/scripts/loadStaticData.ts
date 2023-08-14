import { cache } from '../config/constants';
import RedisCache from '../utils/cache';

const uuidv1 = require('uuid/v1');
const languageJson = require('../../migrations/seeders/language.json');
const emailJson = require('../../migrations/seeders/emailTemplates.json');
const paymentTypeJson = require('../../migrations/seeders/paymentType.json');
const cityJson = require('../../migrations/seeders/cities.json');
const smsJson = require('../../migrations/seeders/sms.json');

const languages = [];
const emailTemplates = [];
const paymentTypeArr = [];
const cities = [];
const smsOtp = [];

const { paymentType, emailPrefix, language, city, sms } = cache;
const paymentKey = 'paymentTypeList';
const languageKey = 'languageList';
const cityKey = 'cityList';
const smsKey = 'smsKey'

class LoadStaticData {
  static async loadMaster() {
      await this.languageEntry();
      await this.emailTemplate();
      await this.cityEntry();
      await this.paymentTypeEntry();
      await this.smsEntry();
  }

  
  static async languageEntry() {
    languageJson.forEach((obj, index) => {
        languages.push({
            id: index + 1,
            uuid: uuidv1(),
            language: obj.language
        });
    });
    if (languages) {
        RedisCache.del(language, languageKey);
        await RedisCache.set(`${language}`, languageKey, languages);
    }
  }

  static async cityEntry() {
    cityJson.forEach((obj, index) => {
        cities.push({
            id: index + 1,
            uuid: uuidv1(),
            name: obj.name,
            country: obj.country,
            countryCode: obj.countryCode
        });
    });
    if (cities) {
        RedisCache.del(city, cityKey);
        await RedisCache.set(`${city}`, cityKey, cities);
    }
  }

  static async emailTemplate() {
    emailJson.forEach((obj, index) => {
        const emailTemplates = {
            id: index + 1,
            uuid: uuidv1(),
            type: obj.type,
            subject: obj.subject,
            htmlDescription: obj.htmlDescription,
            status: obj.status
        };
        RedisCache.del(emailPrefix, obj.type);
        RedisCache.set(emailPrefix, obj.type, JSON.stringify(emailTemplates));
    });
  }

  static async paymentTypeEntry() {
    paymentTypeJson.forEach((obj, index) => {
        paymentTypeArr.push({
            id: index + 1,
            uuid: uuidv1(),
            name: obj.name,
            status: obj.status
        });
    });
    if (paymentTypeArr) {
        RedisCache.del(paymentType, paymentKey);
        await RedisCache.set(`${paymentType}`, paymentKey, paymentTypeArr);
    }
  }

  static async smsEntry() {
    smsJson.forEach((obj, index) => {
        const smsOtp = {
            id: index + 1,
            uuid: uuidv1(),
            type: obj.type,
            body: obj.body
        };
        RedisCache.del(sms, obj.type);
        RedisCache.set(sms, obj.type, JSON.stringify(smsOtp));
    });
  }

}

LoadStaticData.loadMaster();
