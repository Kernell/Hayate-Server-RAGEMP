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

export class RequestCancel extends RecvPacket
{
	private id : GUID;

	public Read() : void
	{
		this.id = new GUID( this.data.id as string );
	}

	public async Process() : Promise< any >
	{
		let request = Server.RequestLogic.GetRequest( this.id );

		if( request == null )
		{
			return;
		}

		if( request.Owner != this.connection.Player )
		{
			return;
		}

		Server.RequestLogic.RemoveRequest( request );
	}
}
