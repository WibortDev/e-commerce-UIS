import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes/index';

const app = express();

app.set( 'port', process.env.PORT || 1215 );

app.use( morgan( 'dev' ) );
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

app.use( routes );

export default app;
