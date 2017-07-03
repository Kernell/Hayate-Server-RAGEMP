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

import { Player }         from "Entity/Player";
import { Request }        from "./Request";
import { Server }         from "Server";
import * as ServerPackets from "Network/Packets/Server";

export class RequestLogic
{
	private Requests : Map< GUID, Request > = new Map< GUID, Request >();

	public constructor()
	{
	}

	public GetRequest( id : GUID ) : Request
	{
		return this.Requests.get( id ) || null;
	}

	public AddRequest( request : Request ) : void
	{
		if( request.Owner.Requests.find( i => i.Type == request.Type ) != null )
		{
			// TODO: System notice

			return;
		}

		request.Owner.Requests.push( request );

		this.SendRequest( request );
	}

	public SendRequest( request : Request ) : void
	{
		if( this.Requests.has( request.ID ) )
		{
			return;
		}

		this.Requests.set( request.ID, request );

		switch( request.Type )
		{
			case RequestType.PartyInvite:
			case RequestType.GuildInvite:
			{
				request.Owner.Connection.Send( new ServerPackets.RequestInvite( request ) );

				break;
			}
			case RequestType.GuildCreate:
			{
				break;
			}
		}

		this.RemoveTimedOutRequest( request );
	}

	public ProcessRequest( id : GUID, accepted : boolean, target : Player ) : void
	{
		let request = this.Requests.get( id );

		if( request == null )
		{
			return;
		}

		if( request.Target != target )
		{
			return;
		}

		request.InProgress = true;

		try
		{
			if( !request.Owner.IsOnline() )
			{
				// TODO: System notice

				return;
			}

			if( accepted )
			{
				request.Accept();
			}
			else
			{
				request.Reject();
			}
		}
		catch( e )
		{
			Log.Error( "Request (%s) exception: %s", RequestType[ request.Type ], e.stack );
		}
		finally
		{
			this.RemoveRequest( request );
		}
	}

	private async RemoveTimedOutRequest( request : Request ) : Promise< void >
	{
		if( request.Timeout == 0 )
		{
			return;
		}

		await Promise.Delay( request.Timeout );

		if( !request.InProgress )
		{
			this.RemoveRequest( request );
		}
	}

	public RemoveRequest( request : Request ) : void
	{
		if( request == null )
		{
			return;
		}

		request.Owner.Requests.remove( request );

		if( this.Requests.has( request.ID ) )
		{
			this.Requests.delete( request.ID );

			request.Owner.Connection.Send( new ServerPackets.RequestHide( request ) );

			if( request.Target != null && request.Target.IsOnline() )
			{
				request.Target.Connection.Send( new ServerPackets.RequestHide( request ) );
			}
		}

		for( let item of request.Owner.Requests )
		{
			if( item.Type == request.Type )
			{
				this.SendRequest( item );

				break;
			}
		}
	}
}
