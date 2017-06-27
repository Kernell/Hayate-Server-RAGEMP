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

export class PartyDisband extends RecvPacket
{
	public Read() : void
	{
	}

	public async Process() : Promise< any >
	{
		Server.PartyService.Disband( this.connection.Player as Entity.Player );
	}
}
