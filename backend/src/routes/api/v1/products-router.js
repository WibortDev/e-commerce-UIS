import { Router } from 'express';

import { authJwt } from '../../../middlewares';

import * as productsCtrl from '../../../controllers/products-controller';

const router = Router();

router.get( '/', productsCtrl.getProducts );
router.get( '/:productId', productsCtrl.getProduct );

router.post(
	'/',
	/* [authJwt.verifyToken, authJwt.verifyAdminToken], */
	productsCtrl.sendProduct
);

router.put(
	'/:productId',
	/* [authJwt.verifyToken, authJwt.verifyAdminToken], */
	productsCtrl.editProduct
);
router.delete(
	'/:productId',
	/* [authJwt.verifyToken, authJwt.verifyAdminToken], */
	productsCtrl.deleteProduct
);

export default router;
