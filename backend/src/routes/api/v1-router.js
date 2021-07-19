import { Router } from 'express';

import proyectRouter from './v1/products-router';
import userRouter from './v1/users-router';

const router = Router();

router.use( '/product', proyectRouter );
router.use( '/user', userRouter );

module.exports = router;
