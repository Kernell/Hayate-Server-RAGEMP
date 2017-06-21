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

import * as ServerPacket from "../../Network/Packets";

export class AdminCommand
{
	protected name          : string;
	protected restricted    : boolean;

	constructor()
	{
		this.name          = this.constructor.name.toLowerCase();
		this.restricted    = false;
	}

	public Execute( connection : IConnection, args : string[] ) : Promise< any >
	{
		let option = args.shift();
		let method = "Option_" + option;

		if( this[ method ] )
		{
			if( this.restricted && method != null && !connection.Account.IsGranted( 'command.' + this.name + '.' + option ) )
			{
				throw new Exception( `Access denied to command '${this.name} ${option}'` );
			}

			return this[ method ]( connection, option, args );
		}

		throw new Exception( `Invalid option '${option}'` );
	}

	public Alert( connection : IConnection, chatMessage : string ) : void
    {
        connection.Send( new ServerPacket.ChatMessage( chatMessage, ChatType.System ) );
    }

	public GetName() : string
	{
		return this.name;
	}

	public IsRestricted() : boolean
	{
		return this.restricted;
	}
}
