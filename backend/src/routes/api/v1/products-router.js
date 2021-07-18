import { Router } from 'express';

import * as productsCtrl from '../../../controllers/products-controller';

const router = Router();

router.get( '/', productsCtrl.getProducts );
router.get( '/:productId', productsCtrl.getProduct );

router.post( '/', productsCtrl.sendProduct );
router.put( '/:productId', productsCtrl.editProduct );
router.delete( '/:productId', productsCtrl.deleteProduct );

export default router;
