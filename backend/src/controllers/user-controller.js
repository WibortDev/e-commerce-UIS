export const signIn = async ( req, res ) => {
	res.send( req.body );
};

export const sendUser = async ( req, res ) => {
	res.send( req.body );
};

export const getUser = async ( req, res ) => {
	res.send( { txt: 'Get User' } );
};

export const getUsers = async ( req, res ) => {
	res.send( { txt: 'Get Users' } );
};

export const editUser = async ( req, res ) => {
	res.send( { txt: 'Edit Users' } );
};

export const deleteUser = async ( req, res ) => {
	res.send( { txt: 'Delete Users' } );
};
