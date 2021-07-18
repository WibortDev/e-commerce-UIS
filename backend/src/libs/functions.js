export const productNotFound = ( res ) => {
	res.status( 404 ).json( { message: 'Product not Found' } );
};

export const verifySearch = ( res, product ) => {
	if ( !product ) return productNotFound( res );
	res.status( 200 ).json( product );
};
