import { Router } from 'express';

import { authJwt } from '../../../middlewares';

import * as userCtrl from '../../../controllers/user-controller';

const router = Router();

router.get(
	'/',
	[authJwt.verifyToken, authJwt.verifyAdminToken],
	userCtrl.getUsers
);
router.get(
	'/:userId',
	[authJwt.verifyToken],
	userCtrl.getUser
);

router.post( '/', userCtrl.sendUser );
router.post( '/login', userCtrl.signIn );

router.put(
	'/:userId',
	[authJwt.verifyToken],
	userCtrl.editUser
);
router.put(
	'/admin/:userId',
	[authJwt.verifyToken, authJwt.verifyAdminToken],
	userCtrl.giveRoleAdmin
);

router.delete(
	'/:userId',
	[authJwt.verifyToken],
	userCtrl.deleteUser
);

export default router;
