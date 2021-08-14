import Product from '../models/product';
import Fav from '../models/fav';

import { verifySearch, notFound } from '../helpers/functions';

export const sendProduct = async ( req, res ) => {
	const {
		title,
		description,
		imgUrl,
		price,
		active
	} = req.body;

	const newProduct = new Product( {
		title,
		description,
		imgUrl,
		price,
		active: active || true,
		author: req.userId
	} );

	const saveProduct = await newProduct.save();
	res.status( 200 ).json( saveProduct );
};

export const getProduct = async ( req, res ) => {
	const { productId } = req.params;

	try {
		const product = await Product.findById( productId );
		verifySearch( res, product );
	} catch ( err ) {
		notFound( res );
	}
};

export const getProducts = async ( _req, res ) => {
	const products = await Product.find().sort( '-createdAt' );
	res.status( 200 ).json( products );
};

export const editProduct = async ( req, res ) => {
	const { productId } = req.params;
	const {
		title,
		description,
		imgUrl,
		price,
		active
	} = req.body;

	try {
		const product = await Product.findById( productId );
		if ( !product ) return notFound( res );

		const editProduct = await product.updateOne( {
			title,
			description,
			imgUrl,
			price,
			active
		} );

		res.status( 200 ).json( editProduct );
	} catch ( err ) {
		notFound( res );
	}
};

export const deleteProduct = async ( req, res ) => {
	const { productId } = req.params;

	try {
		const product = await Product.findByIdAndRemove( productId );
		const favsProduct = await Fav.find( { product: productId } );
		favsProduct.forEach( ( fav ) => {
			fav.remove();
		} );

		verifySearch( res, product );
	} catch ( err ) {
		notFound( res );
	}
};
