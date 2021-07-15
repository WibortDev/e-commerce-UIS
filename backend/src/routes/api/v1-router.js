import { Router } from 'express';

import proyectRouter from './v1/products-router';

const router = Router();

router.use( '/v1/product', proyectRouter );

module.exports = router;
