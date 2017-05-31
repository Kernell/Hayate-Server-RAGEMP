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
import { Player }         from "../Entity/Player";
import { Console }        from "../Entity/Console";
import CommandManager     from "../Core/CommandManager";

export class User extends ConsoleCommand
{
	constructor( manager : CommandManager )
	{
		super( manager );

		this.Name = "user";
	}

	public Execute( player : Player, args : any[] ) : Boolean
	{
		Console.WriteLine( Console.FgMagenta + "[%s] entered command /%s with args: %s" + Console.Reset, player.GetName(), this.GetName(), args.join( ', ' ) );

		return true;
	}
}
