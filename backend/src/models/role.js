import { Schema, model } from 'mongoose';

const roleSchema = new Schema( {
	name: String,
}, {
	timestamps: true,
	versionKey: false,
} );

export default model( 'Role', roleSchema );
