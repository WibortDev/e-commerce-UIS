import { Schema, model } from 'mongoose';

const productSchema = new Schema( {
	title: { type: String },
	description: { type: String },
	imgUrl: { type: String },
	price: { type: Number },
	active: { type: Boolean },
	author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
	timestamps: true,
	versionKey: false,
} );

export default model( 'Product', productSchema );
