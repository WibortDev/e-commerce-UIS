import { Router } from 'express';

import * as productsCtrl from '../../../controllers/products-controller';

const router = Router();

router.get( '/', productsCtrl.getProyects );
router.get( '/:id', productsCtrl.getProyect );

router.post( '/', productsCtrl.sendProyect );
router.put( '/:id', productsCtrl.editProyect );
router.delete( '/:id', productsCtrl.deleteProyect );

export default router;
