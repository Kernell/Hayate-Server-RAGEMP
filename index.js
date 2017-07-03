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

(function()
{
	const CH_PERIOD   = 46;
	const baseUrl     = __dirname + '/bin/';
	const existsCache = {};

	const moduleProto = Object.getPrototypeOf( module );
	const origRequire = moduleProto.require;

	moduleProto.require = function( request )
	{
		let existsPath = existsCache[ request ];

		if( existsPath === undefined )
		{
			existsPath = '';

			if( !path.isAbsolute( request ) && request.charCodeAt( 0 ) !== CH_PERIOD )
			{
				const ext = path.extname( request );
				const basedRequest = path.join( baseUrl, ext ? request : request + '.js' );
				
				if( fs.existsSync( basedRequest ) )
				{
					existsPath = basedRequest;
				}
				else
				{
					const basedIndexRequest = path.join( baseUrl, request, 'index.js' );

					existsPath = fs.existsSync( basedIndexRequest ) ? basedIndexRequest : '';
				}
			}

			existsCache[ request ] = existsPath
		}

		return origRequire.call( this, existsPath || request );
	}
}
)();


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
