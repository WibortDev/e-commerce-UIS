import { Schema, model } from 'mongoose';

const productSchema = new Schema( {
	name: { type: String },
	description: { type: String },
	imgUrl: { type: String },
	price: { type: String },
	active: { type: Boolean }
}, {
	timestamps: true,
	versionKey: false,
} );

export default model( 'Product', productSchema );
