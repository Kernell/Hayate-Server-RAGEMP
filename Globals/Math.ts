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

interface Math
{
	Random( min ?: number, max ?: number ) : number
}

Math.Random = function( min : number = 0, max : number = 0xFFFFFFFF ) : number
{
	return Math.floor( Math.random() * ( max - min ) + min );
}

module.exports = Math;
