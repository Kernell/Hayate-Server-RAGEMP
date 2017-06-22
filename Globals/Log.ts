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

namespace Log
{
	function GetTime() : string
	{
		let date = new Date();

		let h  = date.getHours();
		let i  = date.getMinutes();
		let s  = date.getSeconds();
		let ms = date.getMilliseconds();

		return printf( "%02d:%02d:%02d.%04d", h, i, s, ms );
	}

	export function Trace( buffer : string, ...params : any[] ) : void
	{
		Console.WriteLine( "%s%s | " + buffer, Console.FgWhite, GetTime(), ...params );
	}

	export function Debug( buffer : string, ...params : any[] ) : void
	{
		Console.WriteLine( "%s%s | " + buffer, Console.FgCyan, GetTime(), ...params );
	}

	export function Info( buffer : string, ...params : any[] ) : void
	{
		Console.WriteLine( "%s%s | " + buffer, Console.FgGreen, GetTime(), ...params );
	}

	export function Warning( buffer : string, ...params : any[] ) : void
	{
		Console.WriteLine( "%s%s | " + buffer, Console.FgYellow, GetTime(), ...params );
	}

	export function Error( buffer : string, ...params : any[] ) : void
	{
		Console.WriteLine( "%s%s | " + buffer, Console.FgRed, GetTime(), ...params );
	}
}

module.exports = Log;
