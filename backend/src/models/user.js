import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema( {
	name: { type: String },
	email: { type: String, unique: true },
	password: { type: String },
	roles: [{
		ref: 'Role',
		type: Schema.Types.ObjectId,
	}],
}, {
	timestamps: true,
	versionKey: false,
} );

userSchema.statics.encriptPassword = async ( password ) => {
	const salt = await bcrypt.genSalt( 10 );
	return bcrypt.hash( password, salt );
};

// eslint-disable-next-line arrow-body-style
userSchema.statics.comparePassword = async ( password, comparepassword ) => {
	return bcrypt.compare( password, comparepassword );
};

export default model( 'User', userSchema );
