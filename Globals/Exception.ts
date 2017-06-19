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

class Exception implements Error
{
	public name;
	public stack;
	public message;

	constructor( error : string )
	{
		this.name    = this.constructor.name;
		this.message = error;

		if( typeof Error.captureStackTrace === 'function' )
		{
			Error.captureStackTrace( this, this.constructor );
		}
		else
		{
			this.stack = ( new Error( error ) ).stack;
		}
	}
}

module.exports = Exception;
