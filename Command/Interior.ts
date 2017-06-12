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

import * as printf        from "printf";
import * as Config        from "nconf";
import { ConsoleCommand } from "./ConsoleCommand";
import * as Entity        from "../Entity";
import Server             from "../Server";

export class Interior extends ConsoleCommand
{
	private interiors : [ { name : string, position : number[] } ];

	constructor( server : Server )
	{
		super( server );

		this.interiors = require( '../../Config/interiors.json' );

		this.Name = "interior";
	}

	private Option_show( player : PlayerInterface, option : string, args : any[] ) : void
	{
		let id = args.shift();

		let interior = this.interiors[ id ];

		if( interior )
		{
			let position = new Vector3( interior.position[ 0 ], interior.position[ 1 ], interior.position[ 2 ] );
			
			player.SetPosition( position );

			player.OutputChatBox( "Location ID: " + id + ", Name: " + interior.name );
		}
	}

	private Option_undefined( player : PlayerInterface, option : string, args : any[] )
	{
		player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );
	}
}
