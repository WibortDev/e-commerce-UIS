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
	'/account',
	[authJwt.verifyToken],
	userCtrl.getAccount
);

router.get(
	'/:userId',
	[authJwt.verifyToken, authJwt.verifyAuthorToken],
	userCtrl.getUser
);

router.post( '/', userCtrl.sendUser );
router.post( '/login', userCtrl.signIn );

router.put(
	'/:userId',
	[authJwt.verifyToken, authJwt.verifyAuthorToken],
	userCtrl.editUser
);
router.put(
	'/admin/:userId',
	[authJwt.verifyToken, authJwt.verifyAdminToken],
	userCtrl.giveRoleAdmin
);

router.delete(
	'/:userId',
	[authJwt.verifyToken, authJwt.verifyAuthorToken],
	userCtrl.deleteUser
);

export default router;
