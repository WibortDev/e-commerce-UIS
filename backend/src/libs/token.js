import jwt from 'jsonwebtoken';

export const jsonWTSend = ( expires, id ) => {
	const token = jwt.sign( { id }, process.env.SECRET_KEY, {
		expiresIn: expires,
	} );

	return token;
};

export const jsonWTVerify = ( token ) => {
	try {
		const decoded = jwt.verify( token, process.env.SECRET_KEY );

		return decoded;
	} catch {
		return false;
	}
};
