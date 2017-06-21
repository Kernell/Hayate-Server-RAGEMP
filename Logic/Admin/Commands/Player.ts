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

export class Player extends AdminCommand
{
	constructor()
	{
		super();

		this.restricted = true;
	}

	private Option_model( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

		connection.Player.SetModel( parseInt( args[ 0 ] ) || mp.joaat( args[ 0 ] ) );
	}

	private Option_clothes( connection : IConnection, option : string, args : any[] ): void
	{
		if( connection.Player == null )
		{
			return;
		}

		if( args.length < 3 )
		{
			connection.Send( new ServerPacket.ChatMessage( "Syntax: /" + this.name + " clothes [component] [drawable] [texture] [palette = 0]", ChatType.Notice ) );

			return;
		}

		let componentNumber : number = parseInt( args.shift() );
		let drawable        : number = parseInt( args.shift() );
		let texture         : number = parseInt( args.shift() );
		let palette         : number = parseInt( args.shift() ) || 0;

		connection.Player.SetClothes( componentNumber, drawable, texture, palette );
	}

	private Option_prop( connection : IConnection, option : string, args : any[] ): void
	{
		if( connection.Player == null )
		{
			return;
		}

		if( args.length < 3 )
		{
			connection.Send( new ServerPacket.ChatMessage( "Syntax: /" + this.name + " prop [prop] [drawable] [texture]", ChatType.Notice ) );

			return;
		}

		let prop     : number = parseInt( args.shift() );
		let drawable : number = parseInt( args.shift() );
		let texture  : number = parseInt( args.shift() );

		connection.Player.SetProp( prop, drawable, texture );
	}

	private Option_haircolor( connection : IConnection, option : string, args : any[] ): void
	{
		if( connection.Player == null )
		{
			return;
		}

		if( args.length < 2 )
		{
			connection.Send( new ServerPacket.ChatMessage( "Syntax: /" + this.name + " haircolor [first] [second]", ChatType.Notice ) );

			return;
		}

		let firstColor  : number = parseInt( args.shift() );
		let secondColor : number = parseInt( args.shift() );

		connection.Player.SetHairColor( firstColor, secondColor );
	}

	private Option_undefined( connection : IConnection, option : string, args : any[] )
	{
		throw new Exception( "Syntax: /" + this.name + " <option>" );
	}
}
