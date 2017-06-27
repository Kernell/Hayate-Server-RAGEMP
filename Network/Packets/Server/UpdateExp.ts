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

import * as Entity      from "../../../Entity";
import { Server }       from "../../../Server";
import { ServerPacket } from "./ServerPacket";

export class UpdateExp extends ServerPacket
{
	protected player : Entity.Player;
	protected added  : number;
	protected npc    : Entity.Npc;

	public constructor( player : Entity.Player, added : number, npc : Entity.Npc = null )
	{
		super();

		this.player = player;
		this.added  = added;
		this.npc    = npc;
	}

	public ToJSON()
	{
		let exp      = this.player.GetExperience();
		let expNeed  = Server.PlayerService.GetExpNeed( this.player );
		let expShown = Server.PlayerService.GetExpShown( this.player );

		return { exp: exp, need: expNeed, shown: expShown };
	}
}
