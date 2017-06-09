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
import { Console }        from "../Entity/Console";
import * as Entity        from "../Entity";
import Server             from "../Server";

export class Character extends ConsoleCommand
{
	constructor( server : Server )
	{
		super( server );

		this.Name = "char";
	}

	private Option_login( player : Entity.Player, option : string, args : any[] ) : void
	{
		let id = Number( args.shift() ) || null;

		if( id == null )
		{
			throw new Error( "Syntax: /char login [id]" );
		}

		mp.events.call( "playerCharacterSelect", player.GetEntity(), id );
	}

	private Option_create( player : Entity.Player, option : string, args : any[] ) : void
	{
		if( args.length < 2 )
		{
			throw new Error( "Syntax: /char create [name] [lastname]" );
		}

		let name     = args.shift();
		let lastname = args.shift();

		mp.events.call( "playerCharacterCreate", player.GetEntity(), name, lastname );
	}

	private Option_undefined( player : Entity.Player, option : string, args : any[] )
	{
		player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );
	}
}
