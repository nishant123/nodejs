import * as express from 'express';

import notification from './notification';

const router = express.Router();

router.use ('/notification',notification);


export default router;
