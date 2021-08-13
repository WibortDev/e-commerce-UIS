import Fav from '../models/fav';

import Product from '../models/product';

import { verifySearch, notFound } from '../helpers/functions';

export const getFavProducts = async ( req, res ) => {
	try {
		const favs = await Fav.find( { user: req.userId } ).populate( 'product' ).sort( '-createdAt' );
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

export const deleteFavProduct = async ( req, res ) => {
	const { favId } = req.params;

	try {
		const product = await Fav.findOneAndDelete( { product: favId, user: req.userId } ).populate( 'product' );
		verifySearch( res, product );
	} catch ( err ) {
		notFound( res );
	}
};
