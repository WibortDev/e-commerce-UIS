import { Schema, model } from 'mongoose';

const productSchema = new Schema( {
	name: { type: String },
	description: { type: String },
	imgUrl: { type: String },
	price: { type: Number },
	active: { type: Boolean }
}, {
	timestamps: true,
	versionKey: false,
} );

export default model( 'Product', productSchema );
