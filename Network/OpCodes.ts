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

import * as Packets from "./Packets";

export class OpCodes
{
	public static Recv : Map< number, Function > = new Map< number, Function >();
	public static Send : Map< Function, number>  = new Map< Function, number >();

	public static Init() : void
	{
		// Auth
		this.Recv.set( 0xC644, Packets.Client.RequestAuth );

		// Chat
		this.Send.set( Packets.Server.ChatMessage,   0x5703 );
		this.Send.set( Packets.Server.ChatPrivate,   0xA082 );
		this.Send.set( Packets.Server.ChatInfo,      0xE321 );
	}
}
