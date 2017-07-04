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

import * as Entity      from "Entity";
import { Server }       from "Server";
import { ServerPacket } from "./ServerPacket";

export class CharacterLevelUp extends ServerPacket
{
	protected player : Entity.Player;
	
	public constructor( player : Entity.Player )
	{
		super();

		this.player = player;
	}

	public ToJSON()
	{
		return { level: this.player.GetLevel() };
	}
}
