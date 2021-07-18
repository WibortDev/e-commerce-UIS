import { Router } from 'express';

import * as userCtrl from '../../../controllers/user-controller';

const router = Router();

router.get( '/', userCtrl.getUsers );
router.get( '/:userId', userCtrl.getUser );

router.post( '/', userCtrl.sendUser );
router.post( '/login', userCtrl.signIn );

router.put( '/:userId', userCtrl.editUser );
router.delete( '/:userId', userCtrl.deleteUser );

export default router;
