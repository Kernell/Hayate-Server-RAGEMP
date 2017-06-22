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
}
