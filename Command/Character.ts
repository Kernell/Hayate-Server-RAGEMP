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

export class Character extends ConsoleCommand
{
	constructor()
	{
		super();

		this.Name = "char";
	}

	private Option_login( player : PlayerInterface, option : string, args : any[] ) : void
	{
		let id = Number( args.shift() ) || null;

		if( id == null )
		{
			throw new Exception( "Syntax: /char login [id]" );
		}

		Event.Call( "playerCharacterSelect", player, id );
	}

	private Option_create( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 1 )
		{
			throw new Exception( "Syntax: /char create [name]" );
		}

		let name = args.shift();

		Event.Call( "playerCharacterCreate", player, name );
	}

	private Option_undefined( player : PlayerInterface, option : string, args : any[] )
	{
		player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );
	}
}
