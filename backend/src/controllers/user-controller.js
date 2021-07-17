export const sendUser = async ( req, res ) => {
	res.send( { txt: 'Send User' } );
};

export const getUser = async ( req, res ) => {
	res.send( { txt: 'Get User' } );
};

export const editUser = async ( req, res ) => {
	res.send( { txt: 'Edit Users' } );
};

export const deleteUser = async ( req, res ) => {
	res.send( { txt: 'Delete Users' } );
};
