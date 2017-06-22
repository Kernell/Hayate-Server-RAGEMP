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

export class ChatInfo extends RecvPacket
{
	protected message : string;
	protected type    : number; // 1 - whisper, friend, block, report; other - whisper, friend, follow

	public Read() : void
	{
		this.message = this.data.message;
		this.type    = this.data.type;
	}

	public async Process() : Promise< any >
	{
		Server.ChatService.SendChatInfo( this.connection, this.type, this.message );
	}
}
