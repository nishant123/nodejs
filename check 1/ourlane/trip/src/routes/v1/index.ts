import * as express from 'express';
import driver from './driver';
import trip from './trip';
import savedPlaces from './savedPlaces';

const router = express.Router();
router.use('/driver', driver);
router.use('/trip', trip);
router.use ('/savedPlaces',savedPlaces);


export default router;
