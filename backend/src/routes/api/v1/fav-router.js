import { Router } from 'express';

import { authJwt } from '../../../middlewares';

import * as favCtrl from '../../../controllers/fav-controller';

const router = Router();

router.post(
	'/',
	[authJwt.verifyToken],
	favCtrl.addFavProduct
);

export default router;
