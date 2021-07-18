import { jsonWTVerify } from '../libs/token';
import User from '../models/user';
import Role from '../models/role';

export const verifyToken = async ( req, res, next ) => {
	const { token } = req.headers;

	if ( !token ) return res.status( 403 ).json( { message: 'No Token Provided' } );

	const decoded = jsonWTVerify( token );

	if ( !decoded ) return res.status( 403 ).json( { message: 'No Token Provided' } );

	req.userId = decoded.id;

	const user = await User.findById( decoded.id, { password: 0 } );

	if ( !user ) return res.status( 404 ).json( { message: 'User no Found' } );

	next();
};

export const verifyAdminToken = async ( req, res, next ) => {
	const user = await User.findById( req.userId );

	const roles = await Role.find( { _id: { $in: user.roles } } );

	for ( let i = 0; i < roles.length; i++ ) {
		if ( roles[i].name === 'admin' ) {
			next();
			return;
		}
	}

	return res.status( 403 ).json( { message: 'Require Admin Role' } );
};
