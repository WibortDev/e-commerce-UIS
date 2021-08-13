import { Router } from 'express';

import { authJwt } from '../../../middlewares';

import * as favCtrl from '../../../controllers/fav-controller';

const router = Router();

router.post(
	'/',
	[authJwt.verifyToken],
	favCtrl.addFavProduct
);

router.get(
	'/',
	[authJwt.verifyToken],
	favCtrl.getFavProducts
);

router.delete(
	'/:favId',
	[authJwt.verifyToken],
	favCtrl.deleteFavProduct
);

export default router;
