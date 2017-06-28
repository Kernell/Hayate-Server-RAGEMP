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

const FileSystem = require( 'fs' );
const Path       = require( 'path' );

let include = ( file ) =>
{
	let _export = require( './bin/' + file );

	if( typeof _export != "undefined" )
	{
		global[ Path.basename( file, ".js" ) ] = _export;
	}
}

const base_path = './packages/hayate/bin/';

let loadGlobals = ( path ) =>
{
	FileSystem.readdirSync( base_path + path ).forEach(
		( file ) =>
		{
			let stat = FileSystem.statSync( base_path + path + '/' + file );

			if( stat.isDirectory() )
			{
				return loadGlobals( path + '/' + file );
			}

			if( file.substr( file.length - 2, 2 ) == 'js' )
			{
				include( path + '/' + file );
			}
		}
	);
}

include( 'Globals/IdentifiedPool.js' );

loadGlobals( 'Globals' );

// Temp fix for old RAGE builds
Vector3 = global[ "Vector3" ];

setTimeout(
	() => 
	{
		require( "./bin/Server" ).Server.Main();
	},
	100
);
