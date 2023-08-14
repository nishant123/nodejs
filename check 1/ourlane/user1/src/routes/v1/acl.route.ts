import * as express from 'express';
import AclController from '../../controllers/acl';
import TokenHandler from '../../middlewares/auth';

const router = express.Router();

router.route('/load').get(TokenHandler.verify, AclController.loadAcl);
//TODO: will remove if ACL is in all services 
router.route('/aclVerify/:apiId').get(TokenHandler.verify, AclController.verifyACL)

export default router;
