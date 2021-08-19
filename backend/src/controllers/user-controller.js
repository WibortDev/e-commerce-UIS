import User from '../models/user';
import Role from '../models/role';
import Fav from '../models/fav';

import { assignRoles } from '../libs/roles';
import { jsonWTSend } from '../libs/token';
import { notFound, verifySearch } from '../helpers/functions';

const expiresIn = 86400;

export const signIn = async ( req, res ) => {
	const { email, password } = req.body;

	const user = await User.findOne( { email } ).populate( 'roles' );
	if ( !user ) return notFound( res, 'Usuario No Registrado' );

	const isValid = await User.comparePassword( password, user.password );
	if ( !isValid ) return notFound( res, 'Contraseña incorrecta' );

	const token = await jsonWTSend( expiresIn, user.id );

	res.json( {
		token,
		expiresIn,
		roles: user.roles,
	} );
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
		if ( user ) return notFound( res, 'El usuario ya existe.' );
	} catch ( err ) {
		notFound( res, err );
	}

	const newUser = new User( {
		email,
		name,
		password: await User.encriptPassword( password ),
	} );

	newUser.roles = await assignRoles( Role, roles );
	await newUser.save();

	const saveUser = await User.findOne( { email } ).populate( 'roles' );
	const token = jsonWTSend( expiresIn, saveUser._id );
	res.status( 200 ).json( {
		token,
		expiresIn,
		roles: saveUser.roles
	} );
};

export const getUser = async ( req, res ) => {
	const { userId } = req.params;

	try {
		const user = await User.findById( userId ).populate( 'roles' );
		verifySearch( res, user, 'Usuario no encontrado' );
	} catch ( err ) {
		notFound( res, 'Usuario no encontrado' );
	}
};

export const getAccount = async ( req, res ) => {
	const { userId } = req;

	try {
		const user = await User.findById( userId ).populate( 'roles' );
		verifySearch( res, user, 'Usuario no encontrado' );
	} catch ( err ) {
		notFound( res, 'Usuario no encontrado' );
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
		if ( !user ) return notFound( res, 'Usuario no encontrado' );

		if ( user.email !== email ) {
			const user2 = await User.findOne( { email } );
			if ( user2 ) return notFound( res, 'El usuario ya existe' );
		}

		const editUser = await user.updateOne( {
			email,
			name,
			password: await User.encriptPassword( password ),
		} );

		res.status( 200 ).json( editUser );
	} catch ( err ) {
		notFound( res, 'Usuario no encontrado' );
	}
};

export const deleteUser = async ( req, res ) => {
	const { userId } = req.params;

	try {
		const user = await User.findByIdAndDelete( userId );

		if ( user ) {
			const favsProduct = await Fav.find( { user: user._id } );
			favsProduct.forEach( ( fav ) => {
				fav.remove();
			} );
		}

		verifySearch( res, user, 'Usuario no encontrado' );
	} catch ( err ) {
		notFound( res, 'Usuario no encontrado' );
	}
};

export const giveRoleAdmin = async ( req, res ) => {
	const { userId } = req.params;
	const roles = ['user', 'admin'];

	try {
		const user = await User.findByIdAndUpdate( userId, {
			roles: await assignRoles( Role, roles ),
		} );
		if ( user ) return res.status( 200 ).json( { message: 'Ahora es Admin' } );

		notFound( res, 'Usuario no encontrado' );
	} catch ( err ) {
		notFound( res, 'Usuario no encontrado' );
	}
};

export const removeRoleAdmin = async ( req, res ) => {
	const { userId } = req.params;
	const roles = ['user'];

	try {
		const user = await User.findByIdAndUpdate( userId, {
			roles: await assignRoles( Role, roles ),
		} );
		if ( user ) return res.status( 200 ).json( { message: 'Ya no es Admin' } );

		notFound( res, 'Usuario no encontrado' );
	} catch ( err ) {
		notFound( res, 'Usuario no encontrado' );
	}
};
