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

export class CreateCharacter extends RecvPacket
{
	protected name : string;

	public Read() : void
	{
		this.name = this.data.name;
	}

	public async Process() : Promise< any >
	{
		return PlayerLogic.CreateCharacter( this.connection, this.name );
	}
}
