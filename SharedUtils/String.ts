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

interface String
{
	pad( num : number, char ?: string, left ?: boolean ) : string;
}

String.prototype.pad = function( num : number, char : string = ' ', left : boolean = false ) : string
{
	let spaces = "";

	for( let i = this.length; i < num; ++i )
	{
		spaces += char;
	}

	if( left )
	{
		return spaces + this;
	}

	return this + spaces;
}
