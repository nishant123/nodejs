import * as express from 'express';

import car from './car';

const router = express.Router();

router.use ('/car', car);


export default router;
