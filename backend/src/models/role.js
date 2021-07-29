import { Schema, model } from 'mongoose';

const roleSchema = new Schema( {
	name: String,
}, {
	timestamps: false,
	versionKey: false,
} );

export default model( 'Role', roleSchema );
