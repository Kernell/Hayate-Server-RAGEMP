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
import { Console }        from "../Entity/Console";
import * as Entity        from "../Entity";
import Server             from "../Server";

export class Player extends ConsoleCommand
{
	constructor( server : Server )
	{
		super( server );

		this.Name = "player";
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

	private Option_model( player : Entity.Player, option : string, args : any[] ) : void
	{
		player.SetModel( parseInt( args[ 0 ] ) || mp.joaat( args[ 0 ] ) );
	}

	private Option_clothes( player : Entity.Player, option : string, args : any[] ): void
	{
		if( args.length < 3 )
		{
			player.OutputChatBox( "Syntax: /" + this.Name + " clothes [component] [drawable] [texture] [palette = 0]" );

			return;
		}

		let componentNumber : number = parseInt( args.shift() );
		let drawable        : number = parseInt( args.shift() );
		let texture         : number = parseInt( args.shift() );
		let palette         : number = parseInt( args.shift() ) || 0;

		player[ "entity" ].setClothes( componentNumber, drawable, texture, palette );
	}

	private Option_prop( player : Entity.Player, option : string, args : any[] ): void
	{
		if( args.length < 3 )
		{
			player.OutputChatBox( "Syntax: /" + this.Name + " prop [prop] [drawable] [texture]" );

			return;
		}

		let prop     : number = parseInt( args.shift() );
		let drawable : number = parseInt( args.shift() );
		let texture  : number = parseInt( args.shift() );

		player[ "entity" ].setProp( prop, drawable, texture );
	}

	private Option_haircolor( player : Entity.Player, option : string, args : any[] ): void
	{
		if( args.length < 2 )
		{
			player.OutputChatBox( "Syntax: /" + this.Name + " haircolor [first] [second]" );

			return;
		}

		let firstColor  : number = parseInt( args.shift() );
		let secondColor : number = parseInt( args.shift() );

		player[ "entity" ].setHairColour( firstColor, secondColor );
	}

	private Option_undefined( player : Entity.Player, option : string, args : any[] )
	{
		player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );
	}
}
