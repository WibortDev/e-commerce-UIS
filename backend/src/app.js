import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import { createRoles } from './libs/initialSetup';

import routes from './routes/index';

const app = express();

createRoles();

app.set( 'port', process.env.PORT || 1215 );

app.use( morgan( 'dev' ) );
app.use( cors() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use( routes );

export default app;
