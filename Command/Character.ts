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
import Server             from "../Server";

export class Character extends ConsoleCommand
{
	constructor( server : Server )
	{
		super( server );

		this.Name = "char";
	}

	private Option_login( player : PlayerInterface, option : string, args : any[] ) : void
	{
		let id = Number( args.shift() ) || null;

		if( id == null )
		{
			throw new Error( "Syntax: /char login [id]" );
		}

		mp.events.call( "playerCharacterSelect", player.GetEntity(), id );
	}

	private Option_create( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 1 )
		{
			throw new Error( "Syntax: /char create [name]" );
		}

		let name = args.shift();

		mp.events.call( "playerCharacterCreate", player.GetEntity(), name );
	}

	private Option_undefined( player : PlayerInterface, option : string, args : any[] )
	{
		player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );
	}
}
