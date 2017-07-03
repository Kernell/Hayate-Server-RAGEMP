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

interface PromiseConstructor
{
	Delay( milliseconds : number ) : Promise< PromiseConstructor >;
}

Promise.Delay = function( milliseconds : number ) : Promise< PromiseConstructor >
{
	return new Promise( resolve => setTimeout( resolve, milliseconds ) );
}

module.exports = Promise;
