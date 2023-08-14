
import * as cacheClient from 'async-redis';
import { vars } from '../config/vars';
import logger from './logger';


const { cache } = vars;
const fileName = '[cache.ts]';

const client = cacheClient.createClient({
  host: cache['host'],
  port: cache['port']
});

client.auth(cache['password'], (err: Error, reply: string) => {
  if (err) {
    logger.error(`${fileName} password supply error`, err);
  }
  else {
    logger.info(`${fileName} password supplied %s`, reply);
  }
});

client.on('error', (err: Error) => {
  logger.error(`${fileName} error`, err);
  
});

client.on('ready', () => {
  logger.info(`${fileName} cache is ready`);
});

export default class RedisCache {
  static set(moduleName: string, key: string, value: string|object|boolean) {
    try {
      if (typeof value !== 'string') {
        client.set(moduleName + key, JSON.stringify(value));
      }
      else {
        client.set(moduleName + key, value);
      }
      return true;
    }
    catch (error) {
      return false;
    }
  }

  static async get(moduleName: string, key: string) {
    try {
      return await client.get(moduleName + key);
    }
    catch (error) {
      return false;
    }
  }

  static async del(moduleName: string, key: string) {
    try {
      return JSON.parse(await client.del(moduleName + key));
    }
    catch (error) {
      return false;
    }
  }

  static async insertList(moduleName: string, key: string, list: Array<string>) {
    try {
      await client.rpush(`${moduleName}${key}`, list);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  static async getList(moduleName: string, key: string) {
    try {
      return await client.lrange(moduleName + key, 0, -1);
    }
    catch (error) {
      return false;
    }
  }

  static async flushAll() {
    try {
      return JSON.parse(await client.flushdb());
    }
    catch (error) {
      return false;
    }
  }
  static async lPush(moduleName: string, key: string, value:string) {
    try {
    return await client.lpush(moduleName + key, value);
    }
    catch (error) {
    return false;
    }
    }
    
    static async lRem(moduleName: string, key: string, value:string) {
    try {
    return await client.lrem(moduleName + key, -1, value);
    }
    catch (error) {
    return false;
    }
    }


}
