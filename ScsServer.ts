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

import * as Entity    from "./Entity";
import { Server }     from "./Server";
import { Connection } from "./Network/Connection";

export class ScsServer
{
	private connections : { [ id : number ] : Connection };

	public constructor()
	{
		this.connections = {};
	}

	public BeginListening() : void
	{
		mp.players.toArray().forEach( ( client : IServerClient ) => this.OnConnected( client ) );

		mp.events.add( "playerJoin",       ( client : IServerClient ) => this.OnConnected( client ) );
		mp.events.add( "playerQuit",       ( client : IServerClient, type : string, reason : string ) => this.OnDisconnected( client, type, reason ) );
		mp.events.add( "playerPacketSend", ( client : IServerClient, opcode : number, data : any ) => this.OnMessageReceived( client, opcode, data ) );

		mp.events.add( "playerDeath",      ( client : IServerClient, reason : string, killer : IServerClient ) => this.OnPlayerDeath( client, reason, killer ) );

		mp.events.add( "playerEnteredVehicle", ( client : IServerClient, vehicle : mp.Vehicle ) => this.OnPlayerEnterVehicle( client, vehicle ) );
		mp.events.add( "playerExitVehicle",    ( client : IServerClient ) => this.OnPlayerExitVehicle( client ) );
	}

	public ShutdownServer() : void
	{
		mp.players.toArray().forEach( ( client : IServerClient ) => this.OnDisconnected( client, "", "" ) );
	}

	private OnConnected( client : IServerClient ) : void
	{
		if( this.connections[ client.id ] != null )
		{
			throw new Error( "This connection already added" );
		}
	
		this.connections[ client.id ] = new Connection( client );
	}

	private OnDisconnected( client : IServerClient, type : string, reason : string ) : void
	{
		let connection = this.connections[ client.id ];

		if( connection != null )
		{
			connection.OnDisconnected( type, reason );

			delete this.connections[ client.id ];
		}
	}

	private OnMessageReceived( client : IServerClient, opcode : number, data : any ) : void
	{
		let connection = this.connections[ client.id ];

		if( connection != null )
		{
			connection.OnMessageReceived( opcode, data );
		}
	}

	private OnPlayerDeath( client : IServerClient, reason : string, killer : mp.Entity ) : void
	{
		let connection = this.connections[ client.id ];
		
		if( connection != null )
		{
			let killerConnection = null;
			
			if( killer.type == "player" )
			{
				killerConnection = this.connections[ killer.id ];
			}

			Server.PlayerService.PlayerDeath( connection.Player as Entity.Player, reason, killerConnection ? killerConnection.Player as Entity.Player : null );
		}
	}

	private OnPlayerEnterVehicle( client : IServerClient, vehicle : mp.Vehicle )
    {
		let connection = this.connections[ client.id ];
		
		if( connection != null )
		{
			Server.VehicleService.PlayerEnterVehicle( connection.Player, Entity.Vehicle.FindOrCreate< Entity.Vehicle >( vehicle ) );
		}
    }

	private OnPlayerExitVehicle( client : IServerClient ) : void
    {
		let connection = this.connections[ client.id ];
		
		if( connection != null )
		{
			Server.VehicleService.PlayerExitVehicle( connection.Player );
		}
    }
}
