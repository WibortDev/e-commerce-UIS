const userRole = async ( Role ) => {
	const role = await Role.findOne( { name: 'user' } );
	return [role._id];
};

export const assignRoles = async ( model, roles ) => {
	if ( roles ) {
		const foundRoles = await model.find( { name: { $in: roles } } );
		if ( foundRoles.length === 0 ) return userRole( model );

		return foundRoles.map( ( role ) => role._id );
	}
	return userRole( model );
};
