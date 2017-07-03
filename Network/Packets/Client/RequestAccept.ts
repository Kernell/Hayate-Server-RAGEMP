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

export class RequestAccept extends RecvPacket
{
	private id : GUID;

	public Read() : void
    {
		this.id = new GUID( this.data.id as string );
    }

	public async Process() : Promise< any >
    {
		Server.RequestLogic.ProcessRequest( this.id, false, this.connection.Player as Entity.Player );
    }
}
