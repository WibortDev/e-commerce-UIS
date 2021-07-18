import User from '../models/user';

import { notFound, verifySearch } from '../helpers/functions';

export const signIn = async ( req, res ) => {
	res.send( req.body );
};

export const sendUser = async ( req, res ) => {
	const {
		email,
		name,
		password,
	} = req.body;

	try {
		const user = await User.findOne( { email } );
		if ( user ) return notFound( res, 'User already exists' );
	} catch ( err ) {
		notFound( res, err );
	}

	const newUser = new User( {
		email,
		name,
		password,
	} );

	const saveUser = await newUser.save();
	res.status( 200 ).send( saveUser );
};

export const getUser = async ( req, res ) => {
	const { userId } = req.params;

	try {
		const user = await User.findOne( { _id: userId } );
		verifySearch( res, user, 'User not Found' );
	} catch ( err ) {
		notFound( res, 'User not Found' );
	}
};

export const getUsers = async ( req, res ) => {
	const users = await User.find();
	res.status( 200 ).send( users );
};

export const editUser = async ( req, res ) => {
	const { userId } = req.params;
	const {
		email,
		name,
		password,
	} = req.body;

	try {
		const user = await User.findOne( { _id: userId } );
		if ( !user ) return notFound( res, 'User not Found' );

		if ( user.email !== email ) {
			const user2 = await User.findOne( { email } );
			if ( user2 ) return notFound( res, 'User already exists' );
		}

		const editUser = await user.updateOne( {
			email,
			name,
			password,
		} );

		res.status( 200 ).json( editUser );
	} catch ( err ) {
		notFound( res, 'User not Found' );
	}
};

export const deleteUser = async ( req, res ) => {
	const { userId } = req.params;

	try {
		const user = await User.findByIdAndDelete( userId );
		verifySearch( res, user, 'User not Found' );
	} catch ( err ) {
		notFound( res, 'User not Found' );
	}
};
