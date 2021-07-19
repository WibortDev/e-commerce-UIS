import { Router } from 'express';

import apiRouter from './api/v1-router';

const router = Router();

router.get( '/', ( _req, res ) => {
	res.status( 200 ).json( { 'Bienvenido al': 'e-commerce grupo 8' } );
} );

router.use( '/api/v1', apiRouter );

export default router;
