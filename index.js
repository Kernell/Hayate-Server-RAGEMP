/*********************************************************
*
*  Copyright © 2017, Raybit Games.
*
*  All Rights Reserved.
*
*  Redistribution and use in source and binary forms,
*  with or without modification,
*  is permitted only for authors.
*
*********************************************************/

process._debugProcess( process.pid );

const fs = require( 'fs' );

let include = ( fileName ) =>
{
	if( fileName.substr( fileName.length - 2, 2 ) != 'js' )
    {
		return;
    }

	let typeName = fileName.replace( /\.js$/i, '' );

	global[ typeName ] = require( './bin/Types/' + fileName );
}

include( 'IdentifiedPool.js' );

fs.readdirSync( './packages/hayate/bin/Types/' ).forEach( include );

// Temp fix for old RAGE builds
Vector3 = global[ "Vector3" ];

setTimeout(
	() => 
	{
		let Server = require( "./bin/Server" ).default;

		new Server();
	},
	100
);
