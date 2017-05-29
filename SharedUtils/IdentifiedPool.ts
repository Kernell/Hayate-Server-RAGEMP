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

import Entity from "../Entity/Entity";

export default class IdentifiedPool
{
	protected static readonly Instances : Array< IdentifiedPool > = new Array< IdentifiedPool >();

	protected entity : mp.Entity;

	protected constructor( entity : mp.Entity )
	{
		this.entity = entity;

		IdentifiedPool.Instances.push( this );
	}

	protected Dispose( disposing : boolean ) : void
	{
		IdentifiedPool.Instances.slice( IdentifiedPool.Instances.indexOf( this ), 1 );
	}

	public static Find( entity : mp.Entity ) : any
	{
		this.Instances.find( i => i.entity == entity );
	}

	public static Create< T extends Entity >( entity : mp.Entity ) : T
	{
		return ( new Entity( entity ) ) as T;
	}

	public static FindOrCreate< T extends Entity >( entity : mp.Entity ) : T
	{
		return this.Find( entity ) || this.Create< T >( entity );
	}
}
