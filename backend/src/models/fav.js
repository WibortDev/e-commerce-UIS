import { Schema, model } from 'mongoose';

const favSchema = new Schema( {
	product: { ref: 'Product', type: Schema.Types.ObjectId },
	user: { type: String },
}, {
	timestamps: true,
	versionKey: false,
} );

export default model( 'Fav', favSchema );
