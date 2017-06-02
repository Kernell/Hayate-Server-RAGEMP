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

Date.prototype.toISOString = function()
{
	let pad = ( number ) =>
	{
		if( number < 10 )
		{
			return '0' + number;
		}

		return number;
    }

	let y = this.getFullYear();
	let m = pad( this.getMonth() + 1 );
	let d = pad( this.getDate() );

	let h = pad( this.getHours() );
	let i = pad( this.getMinutes() );
	let s = pad( this.getSeconds() );

	return `${y}-${m}-${d} ${h}:${i}:${s}`;
}