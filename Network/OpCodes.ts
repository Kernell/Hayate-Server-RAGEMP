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

		// Character
		this.Recv.set( 0xE5E4, Packets.Client.RequestCharacterList );
		this.Recv.set( 0x6755, Packets.Client.CreateCharacter );
		this.Recv.set( 0x8844, Packets.Client.CheckCharacterName );
		this.Recv.set( 0xBC40, Packets.Client.DeleteCharacter );

		// Chat
		this.Send.set( Packets.Server.ChatMessage,   0x5703 );
		this.Send.set( Packets.Server.ChatPrivate,   0xA082 );
		this.Send.set( Packets.Server.ChatInfo,      0xE321 );
	}
}
