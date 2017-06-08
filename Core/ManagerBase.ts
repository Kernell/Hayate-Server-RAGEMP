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

export default class ManagerBase< TEntity extends Entity > implements ManagerInterface
{
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
		);
	}

	public DoPulse( date : Date ) : void
	{
	}
}
