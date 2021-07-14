import express from 'express';

const app = express();

app.set( 'port', process.env.PORT || 1215 );

app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

export default app;
