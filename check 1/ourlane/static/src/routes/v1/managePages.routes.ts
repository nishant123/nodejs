import * as express from 'express';
import ManagePagesController from '../../controllers/managePages';
import jwt from '../../middlewares/auth';

const router = express.Router();
router.route('/getManagePage/:title').get(ManagePagesController.getManagePageItem);

export default router;
