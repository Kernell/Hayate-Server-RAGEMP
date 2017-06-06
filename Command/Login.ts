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
import Server             from "../Server";

export class Login extends ConsoleCommand
{
	constructor( server : Server )
	{
		super( server );

		this.Name = "login";
	}

	public Execute( player : Player, args : any[] ) : Boolean
	{
		if( args.length < 2 )
		{
			throw new Error( "Syntax: /login [email] [password]" );
		}

		let login = args.shift();
		let pass  = args.shift();

		mp.events.call( "playerTryLogin", player.GetEntity(), login, pass );

		return true;
	}
}
