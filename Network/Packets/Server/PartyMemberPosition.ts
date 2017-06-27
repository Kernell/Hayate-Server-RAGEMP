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

export class PartyMemberPosition extends ServerPacket
{
	protected player : PlayerInterface;

	public constructor( player : PlayerInterface )
	{
		super();

		this.player = player;
	}

	public ToJSON()
	{
		let pos = this.player.GetPosition();

		return { id: this.player.GetID(), x: pos.x, y: pos.y, z: pos.z, dimension: this.player.GetDimension() };
	}
}
