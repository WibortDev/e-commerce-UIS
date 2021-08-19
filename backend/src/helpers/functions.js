export const notFound = ( res, message = 'Producto no encontrado' ) => {
	res.status( 404 ).json( { message } );
};

export const verifySearch = ( res, object, message = 'Producto no encontrado' ) => {
	if ( !object ) return notFound( res, message );
	res.status( 200 ).json( object );
};
