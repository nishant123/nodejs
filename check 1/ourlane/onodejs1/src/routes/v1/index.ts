import * as express from 'express';
import auth from './auth.route';
import user from './user.route';
import acl from './acl.route';
import role from './role';


const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/acl', acl);
router.use('/role', role);

export default router;
