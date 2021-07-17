import { Router } from 'express';

import proyectRouter from './v1/products-router';
import userRouter from './v1/users-router';

const router = Router();

router.use( '/v1/product', proyectRouter );
router.use( '/v1/user', userRouter );

module.exports = router;
