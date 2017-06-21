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
import * as Entity        from "../../../Entity";
import * as ServerPacket  from "../../../Network/Packets";
import { AdminCommand }   from "../AdminCommand";

export class Interior extends AdminCommand
{
	private interiors : [ { name : string, position : number[] } ];

	constructor()
	{
		super();

		this.interiors = require( '../../../../Config/interiors.json' );

		this.restricted = true;
	}

	private Option_show( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

		let id = args.shift();

		let interior = this.interiors[ id ];

		if( interior )
		{
			let position = new Vector3( interior.position[ 0 ], interior.position[ 1 ], interior.position[ 2 ] );
			
			connection.Player.SetPosition( position );

			connection.Send( new ServerPacket.ChatMessage( "Location ID: " + id + ", Name: " + interior.name, ChatType.Notice ) );
		}
	}

	private Option_undefined( connection : IConnection, option : string, args : any[] )
	{
		throw new Exception( "Syntax: /" + this.name + " <option>" );
	}
}
