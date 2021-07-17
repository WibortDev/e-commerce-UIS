import { Router } from 'express';

import * as productsCtrl from '../../../controllers/products-controller';

const router = Router();

router.get( '/', productsCtrl.getProducts );
router.get( '/:id', productsCtrl.getProduct );

router.post( '/', productsCtrl.sendProduct );
router.put( '/:id', productsCtrl.editProduct );
router.delete( '/:id', productsCtrl.deleteProduct );

export default router;
