import * as express from 'express';
import EmailController from '../../controllers/email';
import jwt from '../../middlewares/auth';

const router = express.Router();
router.route('/loadEmailTemplates').get(jwt.verify, EmailController.loadEmailTemplate);

export default router;
