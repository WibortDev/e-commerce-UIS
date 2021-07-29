import User from '../models/user';
import Role from '../models/role';

import { assignRoles } from '../libs/roles';
import { jsonWTSend } from '../libs/token';
import { notFound, verifySearch } from '../helpers/functions';

export const signIn = async ( req, res ) => {
	const { email, password } = req.body;

	const user = await User.findOne( { email } );
	if ( !user ) return notFound( res, 'User not Register' );

	const isValid = await User.comparePassword( password, user.password );
	if ( !isValid ) return notFound( res, 'Invalid Password' );

	const token = await jsonWTSend( 86400, user.id );
	res.json( { token, id: user.id } );
};

export const sendUser = async ( req, res ) => {
	const {
		email,
		name,
		password,
	} = req.body;
	const roles = ['user'];

	try {
		const user = await User.findOne( { email } );
		if ( user ) return notFound( res, 'User already exists' );
	} catch ( err ) {
		notFound( res, err );
	}

	const newUser = new User( {
		email,
		name,
		password: await User.encriptPassword( password ),
	} );

	newUser.roles = await assignRoles( Role, roles );

	const saveUser = await newUser.save();

	const token = jsonWTSend( 86400, saveUser._id );
	res.status( 200 ).json( { token, id: saveUser._id } );
};

export const getUser = async ( req, res ) => {
	const { userId } = req.params;

	try {
		const user = await User.findOne( { _id: userId } ).populate( 'roles' );
		verifySearch( res, user, 'User not Found' );
	} catch ( err ) {
		notFound( res, 'User not Found' );
	}
};

export const getUsers = async ( req, res ) => {
	const users = await User.find().populate( 'roles' );
	res.status( 200 ).json( users );
};

export const editUser = async ( req, res ) => {
	const { userId } = req.params;
	const {
		email,
		name,
		password,
	} = req.body;

	try {
		const user = await User.findById( userId );
		if ( !user ) return notFound( res, 'User not Found' );

		if ( user.email !== email ) {
			const user2 = await User.findOne( { email } );
			if ( user2 ) return notFound( res, 'User already exists' );
		}

		const editUser = await user.updateOne( {
			email,
			name,
			password: await User.encriptPassword( password ),
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

export const giveRoleAdmin = async ( req, res ) => {
	const { userId } = req.params;
	const roles = ['user', 'admin'];

	try {
		const user = await User.findByIdAndUpdate( userId, {
			roles: await assignRoles( Role, roles ),
		} );
		if ( user ) return res.status( 200 ).json( { message: 'Now is Admin' } );

		notFound( res, 'User not Found' );
	} catch ( err ) {
		notFound( res, 'User not Found' );
	}
};
