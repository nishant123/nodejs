/* eslint-disable no-return-await */
import {
  Op,
  Transaction
} from 'sequelize';
import db from '..';

const {
  sequelize
} = db;
export class BaseDbService {
  static createQueryObj(searchObj: SearchObj): QueryObj {
    const queryObj: QueryObj = {
    };
    if (searchObj.filters && searchObj.filters.length) {
      const where: any = {};
      searchObj.filters.map((filters: FilterObj) => {
        if (filters.type === 'string') { // Simple equal operation
          where[filters.name] = filters.value;
        }
        else if (filters.type === 'search') { // Searching like operation
          where[filters.name] = {
            [Op.iLike]: `%${filters.value}%`
          };
        }
        else if (filters.type === '') {
          where[filters.name] = filters.value;
        }
        return null;
      });
      queryObj.where = where;
    }
    if (searchObj.sortKey) {
      queryObj.order = [[searchObj.sortKey.attribName, searchObj.sortKey.sortType]];
    }
    queryObj.limit = searchObj.perPage || 10;
    if (searchObj.pageNumber) {
      queryObj.offset = (queryObj.limit * (searchObj.pageNumber - 1));
    }
    return queryObj;
  }

  static async createTransaction(): Promise<Transaction> {
    return await sequelize.transaction();
  }

  static async commitTransaction(transaction: Transaction) {
    await transaction.commit();
  }

  static async rollbackTransaction(transaction: Transaction) {
    await transaction.rollback();
  }
}
export interface FilterObj {
  name: string;
  type: string;
  value: string;
}

export interface SortObj {
  attribName: string;
  sortType: string;
}

export interface SearchObj {
  bookmark: string;
  filters: FilterObj[];
  sortKey?: SortObj;
  lookup?: string;
  pageNumber?: number;
  perPage?: number;
}

export interface QueryObj {
  offset?: number;
  limit?: number;
  where?: object;
  order?: any[]
}
