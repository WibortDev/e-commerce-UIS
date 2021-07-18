import Product from '../models/product';

import { verifySearch, notFound } from '../helpers/functions';

export const sendProduct = async ( req, res ) => {
	const {
		name,
		description,
		imgUrl,
		price,
		active
	} = req.body;

	const newProduct = new Product( {
		name,
		description,
		imgUrl,
		price,
		active
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

export const getProducts = async ( req, res ) => {
	const products = await Product.find();
	res.status( 200 ).json( products );
};

export const editProduct = async ( req, res ) => {
	const { productId } = req.params;
	const {
		name,
		description,
		imgUrl,
		price,
		active
	} = req.body;

	try {
		const product = await Product.findById( productId );
		if ( !product ) return notFound( res );

		const editProduct = await product.updateOne( {
			name,
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
		verifySearch( res, product );
	} catch ( err ) {
		notFound( res );
	}
};
