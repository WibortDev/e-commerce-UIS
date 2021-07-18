export const notFound = ( res, message = 'Product not Found' ) => {
	res.status( 404 ).json( { message } );
};

export const verifySearch = ( res, object, message = 'Product not Found' ) => {
	if ( !object ) return notFound( res, message );
	res.status( 200 ).json( object );
};
