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

export default class ManagerBase
{
	protected List;

	constructor( server : Server )
	{
		server.RegisterManager( this );
		
		this.List = {};
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
	
	public GetAll()
	{
		return this.List;
	}

	public Init() : Boolean
	{
		return true;
	}

	public DoPulse( date : Date ) : void
	{
	}
}
