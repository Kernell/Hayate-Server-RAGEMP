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
import Player             from "../Entity/Player";
import Console            from "../Entity/Console";
import EVehicle           from "../Entity/Vehicle";
import CommandManager     from "../Core/CommandManager";

export class Vehicle extends ConsoleCommand
{
	constructor( manager : CommandManager )
	{
		super( manager );

		this.Name = "vehicle";
	}

	public Execute( player : Player, args : any[] ) : Boolean
	{
		let option : string = args.shift();

		if( this[ option ] )
		{
			this[ option ]( player, args );

			return true;
		}

		player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );

		return true;
	}

	private spawn( player : Player, args : any[] ) : void
	{
		let plate = "ADM000";
		let color = { red: 255, green: 255, blue: 255 };

		let vehicle = new EVehicle( mp.joaat( "sultan" ), player.GetPosition(), player.GetRotation(), player.GetDimension(), color, plate );

		player.OutputChatBox( "vehicle created, ID: " + vehicle.GetID() );
	}
}
