import { Router } from 'express';

import proyectRouter from './v1/products-router';
import userRouter from './v1/users-router';
import favRouter from './v1/fav-router';

const router = Router();

router.use( '/product', proyectRouter );
router.use( '/user', userRouter );
router.use( '/fav', favRouter );

module.exports = router;
