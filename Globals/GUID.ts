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

class GUID
{
	protected data : number[];

	public constructor();
	public constructor( guid : GUID );
	public constructor( guid : string );

	public constructor( guid ?: any )
	{
		this.data = [ 0, 0, 0, 0, 0, 0, 0, 0 ];

		if( guid == null )
		{
			this.Generate();

			return;
		}

		if( guid instanceof GUID )
		{
			for( let i = 0; i < 8; ++i )
			{
				this.data[ i ] = guid.data[ i ];
			}

			return;
		}

		if( typeof guid == "string" )
		{
			let data = guid.substring( 1, guid.length - 1 ).split( '-' ).join( '' );

			for( let i = 0; i < 8; ++i )
			{
				this.data[ i ] = parseInt( data.substring( i * 4, i * 4 + 4 ), 16 );
			}
		}
	}

	protected Generate() : void
	{
		let rand = () =>
		{
			return Math.floor( ( 1 + Math.random() ) * 0x10000 );
		}

		for( let i = 0; i < 8; ++i )
		{
			this.data[ i ] = rand();
		}
	}

	public IsNull() : boolean
	{
		return this.data[ 0 ] == 0 && this.data[ 1 ] == 0 && this.data[ 2 ] == 0 && this.data[ 3 ] == 0 && 
			   this.data[ 4 ] == 0 && this.data[ 5 ] == 0 && this.data[ 6 ] == 0 && this.data[ 7 ] == 0;
	}

	public toString() : string
	{
		let toHex = ( data : number, digits : number ) =>
		{
			return data.toString( 16 ).substring( 1 ).pad( digits, '0', false );
		}

		let result = [];

		result.push( toHex( this.data[ 0 ], 4 ) + toHex( this.data[ 1 ], 4 ) );
		result.push( toHex( this.data[ 2 ], 4 ) );
		result.push( toHex( this.data[ 3 ], 4 ) );
		result.push( toHex( this.data[ 4 ], 4 ) );
		result.push( toHex( this.data[ 5 ], 4 ) + toHex( this.data[ 6 ], 4 ) + toHex( this.data[ 7 ], 4 ) );

		return '{' + result.join( '-' ).toUpperCase() + '}';
	}
}

module.exports = GUID;
