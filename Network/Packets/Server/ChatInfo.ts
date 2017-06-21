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

export class ChatInfo extends ServerPacket
{
	protected player : PlayerInterface;
	protected type   : number; // 1 - whisper, friend, block, report; other - whisper, friend, follow

	public constructor( player : PlayerInterface, type : number )
	{
		super();

		this.player = player;
		this.type   = type;
	}

	public ToJSON()
	{
		return { player: this.player, type: this.type };
	}
}
