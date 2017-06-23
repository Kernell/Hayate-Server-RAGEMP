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

export class SelectCharacter extends RecvPacket
{
	protected playerId : number;

	public Read() : void
	{
		this.playerId = this.data.playerId;
	}

	public async Process() : Promise< any >
	{
		PlayerLogic.PlayerSelected( this.connection, this.playerId );
	}
}
