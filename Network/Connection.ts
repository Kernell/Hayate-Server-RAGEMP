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

import * as Entity from "../Entity";
import { OpCodes } from "./OpCodes";
import { AccountService } from "../Services/AccountService";

export class Connection implements IConnection
{
	public static Connections = new Array< Connection >();

	private _account : AccountInterface;
	private _player  : PlayerInterface;

	public get Account() : AccountInterface
	{
		return this._account;
	}

	public set Account( account : AccountInterface )
	{
		this._account = account;
		this._account.Connection = this;
	}

	public get Player() : PlayerInterface
	{
		return this._player;
	}

	public set Player( player : PlayerInterface )
	{
		this._player = player;
		this._player.Connection = this;

		player[ "entity" ] = this.client;
	}

	protected client : IServerClient;

	public constructor( client : IServerClient )
	{
		this.client = client;

		Connection.Connections.push( this );
	}

	public OnDisconnected( type : string, reason : string ) : void
	{
        AccountService.ClientDisconnected( this );

		this.client = null;

		if( this._account != null )
		{
            this._account.Connection = null;
		}

        if( this._player != null )
		{
            this._player.Connection = null;
		}

        this._account = null;
        this._player  = null;

		Connection.Connections.remove( this );
	}

	public OnMessageReceived( opcode : number, data : Object ) : void
	{
        if( OpCodes.Recv[ opcode ] == null )
		{
			Console.WriteLine( Console.FgYellow + "Unknown packet opcode 0x%X", opcode );

			return;
		}

		( new OpCodes.Recv[ opcode ]( this, data ) );
	}

	public Close() : void
	{
		this.client.kick( "Connection closed" );
	}

	public Send( packet : IServerPacket ) : void
	{
		let opcode : number = OpCodes.Send.get( packet.constructor );

		if( opcode == null )
        {
			throw new Error( "Unknown packet: " + packet.GetName() );
        }

		this.client.call( "SendPacket", opcode, packet.ToJSON() );
	}

	public Invoke( hash : string, ...args : any[] ) : void
	{
		this.client.invoke( hash, ...args );
	}

	public CallEvent( eventName : string, ...args : any[] ) : void
	{
		this.client.call( eventName, ...args );
	}

	public Notify( message : string ) : void
	{
		this.client.notify( message );
	}

	public Ping() : number
	{
		return this.client.ping;
	}

	public GetIP() : string
	{
		return this.client.ip;
	}
}
