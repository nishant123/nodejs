import ManagePagesDBService from '../../database/service/managePages.dbservice';



const serviceName = '[ManagePagesService]';

export default class ManagePagesService {

    static async getManagePageItem(title: any) {
        const pageItem = await ManagePagesDBService.getManagePagesItem(title);
        return pageItem;
    }

}