import * as express from 'express';
import cache from '../../utils/cache';
import { cache as cacheConstant } from '../../config/constants';
import AclDBService from '../../database/service/acl.dbservice';
import logger from '../../utils/logger';
const { prefix, rolePolicyModule, apiPolicyModule } = cacheConstant;
export default class ACLService {

    /**
   *
   *
   * @static
   * @param {string} roleName
   * @returns
   * @memberof ACLService
   */
     static async loadRolePolicyResourceMapping() {
        const [rolePolicyMapperList, apiPolicyMapperList] = await Promise.all([
            AclDBService.getRolePolicyMapping(),
            AclDBService.getApiPolicyMapping()
        ]);
        const apiPolicyMapper = apiPolicyMapperList.reduce((acc, cur) => {
            if (acc[cur.apiId]) {
                acc[cur.apiId].push(cur.policyName);
            }
            else {
                acc[cur.apiId] = [cur.policyName];
            }
            return acc;
        }, {});
        const rolePolicyMapper = rolePolicyMapperList.reduce((acc, cur) => {
            if (acc[cur.roleName]) {
                acc[cur.roleName].push(cur.policyName);
            }
            else {
                acc[cur.roleName] = [cur.policyName];
            }
            return acc;
        }, {});
        const promises = [
            ...Object.keys(apiPolicyMapper).map(async (key) => {
                await cache.del(`${prefix}${apiPolicyModule}`, key);
                return cache.insertList(`${prefix}${apiPolicyModule}`, key, apiPolicyMapper[key]);
            }),
            ...Object.keys(rolePolicyMapper).map(async (key) => {
                await cache.del(`${prefix}${rolePolicyModule}`, key);
                return cache.insertList(`${prefix}${rolePolicyModule}`, key, rolePolicyMapper[key]);
            })
        ];
        await Promise.all(promises);
        logger.info(apiPolicyMapper, rolePolicyMapper);
        return { apiPolicyMapper, rolePolicyMapper };
    }
    static async getRolePolicyMapping(roleName: string) {
        const list = await cache.getList(`${prefix}${rolePolicyModule}`, roleName);
        if (list && list.length) {
            return list;
        }
        const rolePolicyMapperList = await AclDBService.getRolePolicyMapping(roleName);
        const policyList = rolePolicyMapperList.map((obj) => obj.policyName);
        await cache.insertList(`${prefix}${rolePolicyModule}`, roleName, policyList);
        return policyList;
    }

    /**
    *
    *
    * @static
    * @param {string} apiName
    * @returns
    * @memberof ACLService
    */
    static async getApiPolicyMapping(apiName: string) {
        const list = await cache.getList(`${prefix}${apiPolicyModule}`, apiName);
        console.log("`${prefix}${apiPolicyModule}`", `${prefix}${apiPolicyModule}`)
        if (list && list.length) {
            return list;
        }
        const apiPolicyMapperList = await AclDBService.getApiPolicyMapping(apiName);
        const policyList = apiPolicyMapperList.map((obj) => obj.policyName);
        await cache.insertList(`${prefix}${apiPolicyModule}`, apiName, policyList);
        return policyList;
    }
}
