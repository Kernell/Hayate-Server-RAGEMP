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

class IdentifiedPool
{
	protected static readonly Instances : Array< IdentifiedPool > = new Array< IdentifiedPool >();

	protected entity : mp.Entity;

	protected constructor( entity : mp.Entity )
	{
		this.entity = entity;

		IdentifiedPool.Instances.push( this );
	}

	protected Dispose() : void
	{
		IdentifiedPool.Instances.slice( IdentifiedPool.Instances.indexOf( this ), 1 );

		this.entity = null;
	}

	public static Find< T extends IdentifiedPool >( entity : mp.Entity ) : T
	{
		return this.Instances.find( i => i.entity == entity ) as T;
	}

	public static Create< T extends IdentifiedPool >( entity : mp.Entity ) : T
	{
		return new this( entity ) as T;
	}

	public static FindOrCreate< T extends IdentifiedPool >( entity : mp.Entity ) : T
	{
		return this.Find< T >( entity ) || this.Create< T >( entity );
	}
}

module.exports = IdentifiedPool;
