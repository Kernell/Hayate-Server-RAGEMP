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

import { ServerPacket } from "./ServerPacket";

export class PartyLeave extends ServerPacket
{
	protected player : PlayerInterface;

	public constructor( player : PlayerInterface )
	{
		super();
		
		this.player = player;
	}

	public ToJSON()
	{
		return { id: this.player.GetID(), name: this.player.GetName() };
	}
}
