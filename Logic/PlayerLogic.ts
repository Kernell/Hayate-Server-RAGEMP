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

import * as Config                from "nconf";
import * as Entity                from "../Entity";
import * as Packets               from "../Network/Packets";
import { Server }                 from "../Server";
import { PlayerService }          from "../Services/PlayerService";
import { DatabaseService }        from "../Services/DatabaseService";

export class PlayerLogic
{
	public static async CheckName( connection : IConnection, name : string ) : Promise< any >
	{
		PlayerService.ValidateName( name );

		let count = await DatabaseService.GetRepository( Entity.Player ).count( { name: name } );

		if( count > 0 )
		{
			throw new Exception( "Это имя уже занято" );
		}
	}

	public static async PlayerSelected( connection : IConnection, playerId : number ) : Promise< any >
	{
		connection.Player = connection.Account.Players.find( player => player.GetID() == playerId );

		if( connection.Player == null )
		{
			throw new Error( "Invalid player id " + playerId );
		}

		connection.Player.Connection = connection;

		return Server.PlayerService.InitPlayer( connection.Player as Entity.Player );
	}

	public static async RemovePlayer( connection : IConnection, playerId : number ) : Promise< any >
	{
		let player = connection.Account.Players.find( player => player.GetID() == playerId );

		if( player == null )
		{
			throw new Error( "Invalid player id " + playerId );
		}

		player.Delete();

		DatabaseService.GetRepository( Entity.Player ).persist( player as Entity.Player );

		//Server.PartyService.LeaveParty( player );
		//Server.GuildService.LeaveGuild( player, player.GetGuild() );

		connection.Account.Players.remove( player );

		//Server.FeedbackService.SendCharRemove( connection );
	}
	
	public static async CreateCharacter( connection : IConnection, name : string ) : Promise< any >
	{
		if( !connection.Account.IsGranted( Permission.UnlimitedCharacters ) )
		{
			if( connection.Account.Players.length > Config.get( "characters:max_per_user" ) )
			{
				throw new Exception( "Вы не можете создавать больше персонажей" );
			}
		}

		this.CheckName( connection, name );

		Server.PlayerService.CreateCharacter( connection, name );
	}

	public static async CharacterList( connection : IConnection ) : Promise< void >
	{
		connection.Send( new Packets.Server.CharacterList( connection ) );
	}
	
	public static PlayerEnterWorld( player : Entity.Player ) : void
	{
		//Server.MapService.PlayerEnterWorld( player );
		Server.PlayerService.PlayerEnterWorld( player );
		//Server.ControllerService.PlayerEnterWorld( player );

		//Server.PartyService.UpdateParty( player.GetParty() );
		//Server.GuildService.OnPlayerEnterWorld( player );

		//Server.DuelService.PlayerLeaveWorld( player );
	}

	public static PlayerEndGame( player : Entity.Player ) : void
    {
        if( player == null )
		{
			return;
		}

		Server.PlayerService.PlayerEndGame( player );
        //Server.MapService.PlayerLeaveWorld( player );
        //Server.ControllerService.PlayerEndGame( player );

        //Server.PartyService.UpdateParty( player.GetParty() );

        //Server.DuelService.PlayerLeaveWorld( player );
    }

	public static ProcessChatMessage( connection : IConnection, message : string, type : ChatType ) : void
    {
		message = message
			.replace( /&/g, "&amp;" )
			.replace( />/g, "&gt;" )
			.replace( /</g, "&lt;" )
			.replace( /"/g, "&quot;" )
			.replace( /'/g, "&#039;" );

        if( Server.AdminLogic.ProcessChatMessage( connection, message ) )
		{
            return;
		}

        Server.ChatService.ProcessMessage( connection, message, type );
    }
}
