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

import * as Entity       from "Entity";
import * as Requests     from "Logic/Request/Requests";
import { RecvPacket }    from "./RecvPacket";
import { Server }        from "Server";
import { PlayerService } from "Services/PlayerService";

export class RequestSend extends RecvPacket
{
	protected request : Requests.Request;

	public Read() : void
	{
		let type = this.data.type as RequestType;

		switch( type )
		{
			case RequestType.PartyInvite:
			{
				let target = PlayerService.GetByName( this.data.name );

				if( target == null )
				{
					Log.Warning( "Player with name '%s' not found", this.data.name );

					return;
				}

				this.request = new Requests.Party( target );

				break;
			}
			default:
			{
				Log.Error( "Invalid system request %d", type );

				break;
			}
		}
	}

	public async Process() : Promise< any >
	{
		if( this.request == null )
		{
			return;
		}

		this.request.Owner = this.connection.Player as Entity.Player;

		if( this.request.IsValid() )
		{
			Server.RequestLogic.AddRequest( this.request );
		}
	}
}
