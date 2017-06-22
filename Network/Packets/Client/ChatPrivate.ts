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

import { RecvPacket }  from "./RecvPacket";
import { Server }      from "../../../Server";
import { PlayerLogic } from "../../../Logic/PlayerLogic";

export class ChatPrivate extends RecvPacket
{
	protected message : string;
	protected name    : string;

	public Read() : void
	{
		this.name    = this.data.name;
		this.message = this.data.message;
	}

	public async Process() : Promise< any >
	{
		Server.ChatService.ProcessPrivateMessage( this.connection, this.name, this.message );
	}
}
