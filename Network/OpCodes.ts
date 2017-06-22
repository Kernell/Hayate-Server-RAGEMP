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

import * as ServerPackets from "./Packets";

export class OpCodes
{
	public static Recv : Map< number, Function > = new Map< number, Function >();
	public static Send : Map< Function, number>  = new Map< Function, number >();

	public static Init() : void
	{
		// Chat
		this.Send.set( ServerPackets.ChatMessage,   0x5703 );
		this.Send.set( ServerPackets.ChatPrivate,   0xA082 );
		this.Send.set( ServerPackets.ChatInfo,      0xE321 );
	}
}
