import * as express from 'express';
import driver from './driver.routes';
import paymentType from './paymentType.routes'
import email from '../v1/email.routes';
import managePages from '../v1/managePages.routes';

const router = express.Router();
router.use('/email', email)
router.use('/driver', driver)
router.use('/paymentType', paymentType)
router.use('/managePages', managePages)

export default router;
