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
		/*** Client ***/

		// Auth
		this.Recv.set( 0xC644, Packets.Client.RequestAuth );
		this.Recv.set( 0x83E0, Packets.Client.CreateAccount );

		// Character
		this.Recv.set( 0xE5E4, Packets.Client.RequestCharacterList );
		this.Recv.set( 0x6755, Packets.Client.CreateCharacter );
		this.Recv.set( 0x8844, Packets.Client.CheckCharacterName );
		this.Recv.set( 0xBC40, Packets.Client.DeleteCharacter );
		this.Recv.set( 0x8D6A, Packets.Client.SelectCharacter );
		this.Recv.set( 0xBCC4, Packets.Client.EnterWorld );

		// Chat
		this.Recv.set( 0xFBE6, Packets.Client.ChatMessage );
		this.Recv.set( 0xE932, Packets.Client.ChatInfo );
		this.Recv.set( 0xA8FA, Packets.Client.ChatPrivate );
		this.Recv.set( 0xAF9D, Packets.Client.ChatBlock );

		// Party
		this.Recv.set( 0x86BD, Packets.Client.PartyLeave );
		this.Recv.set( 0x4F34, Packets.Client.PartyDisband );
		this.Recv.set( 0xF86C, Packets.Client.PartyKick );
		this.Recv.set( 0xBA24, Packets.Client.PartyPromote );

		/*** Server ***/

		// Auth
		this.Send.set( Packets.Server.AuthComplete,             0xC061 );

		// Character
		this.Send.set( Packets.Server.CharacterList,            0xB38E );
		this.Send.set( Packets.Server.CharacterNameCheckResult, 0xE315 );

		// Chat
		this.Send.set( Packets.Server.ChatMessage,              0x5703 );
		this.Send.set( Packets.Server.ChatPrivate,              0xA082 );
		this.Send.set( Packets.Server.ChatInfo,                 0xE321 );

		// Party
		this.Send.set( Packets.Server.PartyList,                0xBD9C );
		this.Send.set( Packets.Server.PartyRemoveMember,        0xE230 );
		this.Send.set( Packets.Server.PartyStats,               0xA908 );
		this.Send.set( Packets.Server.PartyLeave,               0xC5A1 );
		this.Send.set( Packets.Server.PartyMemberPosition,      0xACC1 );

		this.Send.set( Packets.Server.UpdateExp,                0x8FC7 );
	}
}
