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

if( process.env.NODE_ENV == 'development' )
{
	process._debugProcess( process.pid );
}

global.printf = require( "printf" );

const fs = require( 'fs' );

let include = ( fileName ) =>
{
	if( fileName.substr( fileName.length - 2, 2 ) != 'js' )
    {
		return;
    }

	let typeName = fileName.replace( /\.js$/i, '' );

	let _export = require( './bin/Globals/' + fileName );

	if( typeof _export != "undefined" )
	{
		global[ typeName ] = _export;
	}
}

include( 'IdentifiedPool.js' );

fs.readdirSync( './packages/hayate/bin/Globals/' ).forEach( include );

// Temp fix for old RAGE builds
Vector3 = global[ "Vector3" ];

setTimeout(
	() => 
	{
		let Server = require( "./bin/Server" ).Server;

		Server.Main();
	},
	100
);
