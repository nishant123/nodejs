import db from '../index';

const { ManagePages } = db;

export default class ManagePagesDBService {
    static getManagePagesItem(title: any) {
        return ManagePages.findOne({
            where: {
                pageTitle: title,
                isDeleted: 0
            },
            raw: true,
            nest: true
        });
    }
}

