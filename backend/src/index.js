import './config';
import app from './app';

import './database';

app.listen( app.get( 'port' ), () => {
	console.log( `\n Servidor listo en el puerto ${ app.get( 'port' ) }` );
} );
