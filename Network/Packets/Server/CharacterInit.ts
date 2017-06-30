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

export class CharacterInit extends ServerPacket
{
	protected player : Entity.Player;
	
	public constructor( player : Entity.Player )
	{
		super();

		this.player = player;
	}

	public ToJSON()
	{
		let data =
		{
			online   : this.player.IsOnline(),
			id       : this.player.GetID(),
			name     : this.player.GetName(),
			model    : this.player.GetModel(),
			level    : this.player.GetLevel(),
			exp      : this.player.GetExperience(),
			expNeed  : Server.PlayerService.GetExpNeed( this.player ),
			expShown : Server.PlayerService.GetExpShown( this.player ),
		};

		return data;
	}
}
