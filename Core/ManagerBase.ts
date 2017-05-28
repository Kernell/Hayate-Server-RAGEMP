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
import { ManagerState } from "../SharedUtils/ManagerState";

export default class ManagerBase
{
	protected List  : any;
	public    State : ManagerState;

	constructor( server : Server )
	{
		server.RegisterManager( this );
		
		this.List        = {};
		this.State       = ManagerState.None;
	}
	
	public DestroyAll() : void
	{
		if( this.List )
		{
			for( let object of this.List )
			{
				object.Destroy();
			}
		}
	}
	
	public AddToList( object ) : void
	{
		this.List[ object.GetID() ] = object;
	}
	
	public RemoveFromList( object ) : void
	{
		this.List[ object.GetID() ] = null;
	}

	public Get( id : number ) : void
	{
		return this.List[ id ];
	}

	public GetState() : ManagerState
	{
		return this.State;
	}
	
	public GetAll()
	{
		return this.List;
	}

	public Init() : Promise< any >
	{
		return new Promise( ( resolve, reject ) => resolve() );
	}

	public DoPulse( date : Date ) : void
	{
	}
}
