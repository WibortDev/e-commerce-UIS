import mongoose from 'mongoose';

const { MONGOCONNECTION, MONGOCONNECTION_TEST, NODE_ENV } = process.env;

let connection;
if ( NODE_ENV === 'production' ) {
	connection = MONGOCONNECTION;
} else {
	connection = MONGOCONNECTION_TEST;
}

mongoose.connect( connection, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
} )
	.then( ( _db ) => console.log( `\n Base de datos Lista en ${ NODE_ENV }\n` ) )
	.catch( ( _err ) => console.log( `\n ${ NODE_ENV }: Ocurrio un error al conectar en la base de datos. \n  ${_err}\n` ) );
