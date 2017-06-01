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
import CommandManager     from "../Core/CommandManager";

export class Vehicle extends ConsoleCommand
{
	constructor( manager : CommandManager )
	{
		super( manager );

		this.Name = "vehicle";
	}

	public Execute( player : Entity.Player, args : string[] ) : Boolean
	{
		let option = args.shift();
		let method = "Option_" + option;

		if( this[ method ] )
		{
			this[ method ]( player, option, args );

			return true;
		}

		player.OutputChatBox( `Invalid option '${option}'` );

		return true;
	}

	private Option_spawn( player : Entity.Player, option : string, args : any[] ) : void
	{
		let plate = "ADM000";
		let color = new Color();

		let vehicle = new Entity.Vehicle( mp.joaat( "sultan" ), player.GetPosition(), player.GetRotation(), player.GetDimension(), color, plate );

		player.OutputChatBox( "vehicle created, ID: " + vehicle.GetID() );
	}

	private Option_undefined( player : Entity.Player, option : string, args : any[] )
	{
		player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );
	}
}
