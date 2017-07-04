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

import * as ORM            from "typeorm";
import * as Entity         from "Entity";
import * as Packets        from "Network/Packets";
import { Server }          from "Server";
import { PlayerLogic }     from "Logic/PlayerLogic";
import { ServiceBase }     from "Services/ServiceBase";
import { PlayerService }   from "Services/PlayerService";
import { DatabaseService } from "Services/DatabaseService";

export class ChatService extends ServiceBase
{
	public async Start() : Promise< void >
	{
	}

	public async Stop() : Promise< void >
	{
	}

	public DoPulse() : void
	{
	}

	public ProcessMessage( connection : IConnection, message : string, type : ChatType ) : void
	{
		switch( type )
		{
			case ChatType.Notice:
			{
				break;
			}
			case ChatType.PrivateWhispered:
			{
				connection.Send( new Packets.Server.ChatMessage( connection.Player, message, type ) );
				
				break;
			}
			case ChatType.Guild:
			{
			//	Server.GuildService.HandleChatMessage( connection, message );
				
				break;
			}
			case ChatType.Party:
			{
				Server.PartyService.HandleChatMessage( connection.Player as Entity.Player, message );

				break;
			}
			case ChatType.Say:
			{
				Server.VisibleService.SendPacket( connection.Player as Entity.Player, new Packets.Server.ChatMessage( connection.Player, message, type ) );

				break;
			}
			default:
			{
				let packet = new Packets.Server.ChatMessage( connection.Player, message, type );
				
				PlayerService.GetAll().forEach( player => player.Connection.Send( packet ) );

				break;
			}
		}
	}

	public ProcessPrivateMessage( connection : IConnection, playerName : string, message : string ) : void
	{
		let player = PlayerService.GetByName( playerName );

		if( player == null )
		{
			connection.Send( new Packets.Server.ChatMessage( "Player not found", ChatType.Notice ) );

			return;
		}

		this.ProcessMessage( connection, message, ChatType.PrivateWhispered );

		player.Connection.Send( new Packets.Server.ChatPrivate( connection.Player.GetName(), player.GetName(), message ) );
	}

	public SendChatInfo( connection : IConnection, type : number, name : string ) : void
	{
		let player = PlayerService.GetByName( name.replace( "[GM]","" ) );

		if( player == null || player.GetID() == connection.Player.GetID() )
		{
			return;
		}

		connection.Send( new Packets.Server.ChatInfo( player, type ) );
	}
}
