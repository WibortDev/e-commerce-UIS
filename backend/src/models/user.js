import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema( {
	name: { type: String },
	password: { type: String },
	roles: [{
		ref: 'Role',
		type: Schema.Types.ObjectId,
	}],
}, {
	timestamps: true,
	versionKey: false,
} );

userSchema.statics.encriptarContrasenia = async ( password ) => {
	const salt = await bcrypt.genSalt( 10 );
	return bcrypt.hash( password, salt );
};

// eslint-disable-next-line arrow-body-style
userSchema.statics.compararContrasenia = async ( password, comparepassword ) => {
	return bcrypt.compare( password, comparepassword );
};

export default model( 'User', userSchema );
