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

import * as Entity     from "../../../Entity";
import { RecvPacket }  from "./RecvPacket";
import { Server }      from "../../../Server";
import { PlayerLogic } from "../../../Logic/PlayerLogic";

export class PartyKick extends RecvPacket
{
	protected playerId : number;

	public Read() : void
	{
		this.playerId = this.data.playerId;
	}

	public async Process() : Promise< any >
	{
		Server.PartyService.KickPlayer( this.connection.Player as Entity.Player, this.playerId );
	}
}
