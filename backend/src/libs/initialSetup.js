import Role from '../models/role';
import User from '../models/user';

export const createRolesAndAdmin = async () => {
	if ( !process.env.PASSWORD_ADMIN ) return;
	const count = await Role.estimatedDocumentCount();
	if ( count > 0 ) return;

	const userRole = await new Role( { name: 'user' } ).save();
	const adminRole = await new Role( { name: 'admin' } ).save();
	const ownerRole = await new Role( { name: 'owner' } ).save();

	const admin = await User.findOne( { email: 'admin@grupo8.com' } );
	if ( !admin ) {
		const account = await User.create( {
			name: 'Administrador',
			email: 'admin@grupo8.com',
			password: await User.encriptPassword( process.env.PASSWORD_ADMIN ),
			roles: [ownerRole._id, adminRole._id, userRole._id],
		} );

		console.log( account );
	}

	console.log( [ownerRole, userRole, adminRole] );
};
