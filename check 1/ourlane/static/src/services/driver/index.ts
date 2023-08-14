import DriverDBService from '../../database/service/driver.dbservice';
import cache from '../../utils/cache';
import { cache as cacheConstant } from '../../config/constants';
const { language, city, sms } = cacheConstant;

const serviceName = '[DriverService]';
const languageKey = 'languageList';
const cityKey = 'cityList';
const smsKey = 'smsList';

export default class DriverService {

  static async getSmsList() {
    const list = await cache.get(`${sms}`, smsKey);
    if (list && list.length) {
      return JSON.parse(list);
    } else {
      const result = await DriverDBService.getSmsList();
      await cache.set(`${sms}`, smsKey, result);
      return result;
    }

  }

  static async getCityList() {
    const list = await cache.get(`${city}`, cityKey);
    if (list && list.length) {
      return JSON.parse(list);
    } else {
      const result = await DriverDBService.getCityList();
      await cache.set(`${city}`, cityKey, result);
      return result;
    }
  }

  static async getLanguageList() {
    const list = await cache.get(`${language}`, languageKey);
    console.log(list);
    if (list && list.length) {
      return JSON.parse(list);
    } else {
      const result = await DriverDBService.getLanguageList();
      await cache.set(`${language}`, languageKey, result);
      return result;
    }
  }

}