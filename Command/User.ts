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

import { ConsoleCommand } from "./ConsoleCommand";

export class User extends ConsoleCommand
{
	constructor()
	{
		super();

		this.Name       = "user";
		this.Restricted = true;
	}

	public Execute( player : PlayerInterface, args : any[] ) : Promise< any >
	{
		Console.WriteLine( Console.FgMagenta + "[%s] entered command /%s with args: %s" + Console.Reset, player.GetName(), this.GetName(), args.join( ', ' ) );

		return null;
	}
}
