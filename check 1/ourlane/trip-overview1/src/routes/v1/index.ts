import * as express from 'express';
import trip from './trip';


const router = express.Router();

router.use('/trip', trip);



export default router;
