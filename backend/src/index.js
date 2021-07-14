import app from './app';

app.listen( app.get( 'port' ), () => {
	console.log( `Servidor listo en el puerto ${ app.get( 'port' ) }` );
} );
