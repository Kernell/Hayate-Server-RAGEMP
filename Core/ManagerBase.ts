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

import Server from "../Server";
import { Entity } from "../Entity/Entity";
import { Player } from "../Entity/Player";

type EventCallback = ( ...params : any[] ) => Promise< any >;
type EventType     = { name: string, callback: Function };
type EventsArray   = [ EventType ];

export default class ManagerBase< TEntity extends Entity > implements ManagerInterface
{
	private events       : EventsArray;
	protected Server     : Server;
	protected Dependency : ManagerInterface;
	protected List       : Map< number, TEntity >;
	public    State      : ManagerState;

	constructor( server : Server )
	{
		server.RegisterManager( this );
		
		this.Server      = server;
		this.Dependency  = null;
		this.List        = new Map< number, TEntity >();
		this.State       = ManagerState.None;

		this.events      = [] as EventsArray;
	}

	protected RegisterEvent( event : string, handler: EventCallback )
	{
		let e =
		{
			name: event,
			callback: ( player, ...params : any[] ) => this.EventHandler( event, handler, Player.FindOrCreate< Player >( player ), ...params )
		};

		this.events.push( e );
	}

	protected EventHandler( event : string, handler: EventCallback, source : Player, ...params : any[] )
	{
		let new_params = [];

		for( let param of params )
		{
			let value = param;

			if( typeof param == "object" && param.type != null )
			{
				let type = param.type[ 0 ].toUpperCase() + param.type.substr( 1, param.type.length );

				value = Entity[ type ].FindOrCreate( param );
			}

			new_params.push( value );
		}

		let promise = handler.call( this, source, ...new_params );

		if( promise != null )
		{
			promise.catch(
				( e : Error ) =>
				{
					source.OutputChatBox( e.message );
				}
			);
		}
	}
	
	public DestroyAll() : void
	{
		for( let iter of this.List.values() )
		{
			iter.Destroy();
		}

		this.List.clear();
	}
	
	public AddToList( object : TEntity ) : void
	{
		this.List.set( object.GetID(), object );
	}
	
	public RemoveFromList( object : TEntity ) : void
	{
		this.List.delete( object.GetID() );
	}

	public Get( id : number ) : TEntity
	{
		return this.List.get( id );
	}

	public GetState() : ManagerState
	{
		return this.State;
	}
	
	public GetAll() : IterableIterator< TEntity >
	{
		return this.List.values();
	}

	public Init() : Promise< any >
	{
		return new Promise(
			( resolve, reject ) =>
			{
				if( this.Dependency != null )
				{
					let timeout = () =>
					{
						if( this.Dependency.GetState() == ManagerState.OK )
						{
							return resolve();
						}

						if( this.Dependency.GetState() == ManagerState.Error )
						{
							return reject();
						}
				
						setTimeout( timeout, 100 );
					};

					return timeout();
				}

				return resolve();
			}
		).then(
			() =>
			{
				for( let event of this.events )
				{
					mp.events.add( event.name, event.callback );
				}
			}
		);
	}

	public DoPulse( date : Date ) : void
	{
	}
}
