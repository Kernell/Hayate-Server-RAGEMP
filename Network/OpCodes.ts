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
	public static Recv : Map< number, string > = new Map< number, string >();
	public static Send : Map< string, number>  = new Map< string, number >();

	public static Init() : void
	{
		// Chat
		this.Send.set( typeof ServerPackets.ChatMessage,   0x5703 );
		this.Send.set( typeof ServerPackets.ChatPrivate,   0xA082 );
		this.Send.set( typeof ServerPackets.ChatInfo,      0xE321 );
	}
}
