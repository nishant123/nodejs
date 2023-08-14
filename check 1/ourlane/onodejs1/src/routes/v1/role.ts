import * as express from 'express';
import * as validate from 'express-validation';

import jwt from '../../middlewares/auth';
import validations from '../../validations/role';
import RoleController from '../../controllers/role';
import AccessControl from '../../middlewares/acl';

const { createRole, getRole } = validations;

const router = express.Router();


router.route('/').post(validate(createRole), jwt.verify, AccessControl.authorize('CREATE_ROLE'), RoleController.createRole);

router.route('/').get(validate(getRole), jwt.verify, AccessControl.authorize('GET_ROLE'), RoleController.getRole);

export default router;
