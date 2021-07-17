import { Router } from 'express';

import * as userCtrl from '../../../controllers/user-controller';

const router = Router();

router.get( '/', userCtrl.getUsers );
router.get( '/:id', userCtrl.getUser );

router.post( '/', userCtrl.sendUser );
router.post( '/login', userCtrl.signIn );

router.put( '/:id', userCtrl.editUser );
router.delete( '/:id', userCtrl.deleteUser );

export default router;
