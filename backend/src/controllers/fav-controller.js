import Fav from '../models/fav';

import Product from '../models/product';

import { verifySearch, notFound } from '../helpers/functions';

export const getFavProducts = async ( req, res ) => {
	try {
		const favs = await Fav.find( { user: req.userId } ).populate( 'product' );
		console.log( favs );
		if ( favs ) {
			res.status( 200 ).json( favs );
		} else {
			notFound( res, 'favs product not founds' );
		}
	} catch ( err ) {
		res.status( 500 ).json( err );
	}
};

export const addFavProduct = async ( req, res ) => {
	const { id } = req.body;

	const product = await Product.findById( id );
	if ( !product ) return verifySearch( res, product );

	const isfav = await Fav.findOne( { product: product._id, user: req.userId } );
	if ( isfav ) return notFound( res, 'already exists' );

	const fav = new Fav( { product, user: req.userId } );

	const saveFav = await fav.save();
	res.status( 200 ).json( saveFav );
};
