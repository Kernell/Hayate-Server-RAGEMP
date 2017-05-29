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
		let option = args.shift();

		switch( option )
		{
			case "spawn":
			{
				const position = new mp.Vector3( 192, 168, 0 );

				console.log( position );

				let vehicle = EVehicle.FindOrCreate< EVehicle >( mp.vehicles.new( mp.joaat( "sultan" ), position ) );
				
				vehicle.SetPlate( "TEST" );

				player.OutputChatBox( "vehicle created, ID: " + vehicle.GetID() + " with number plate " + vehicle.GetPlate() );
				
				break;
			}
			default:
			{
				player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );

				break;
			}
		}

		return true;
	}
}
