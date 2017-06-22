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

export class ChatMessage extends RecvPacket
{
	protected message : string;
	protected type    : ChatType;

	public Read() : void
	{
		this.message = this.data.message;
		this.type    = this.data.type;
	}

	public async Process() : Promise< any >
	{
		PlayerLogic.ProcessChatMessage( this.connection, this.message, this.type );
	}
}
