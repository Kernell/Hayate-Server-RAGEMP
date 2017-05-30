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

	protected Dispose() : void
	{
		IdentifiedPool.Instances.slice( IdentifiedPool.Instances.indexOf( this ), 1 );

		this.entity = null;
	}

	public static Find( entity : mp.Entity ) : any
	{
		this.Instances.find( i => i.entity == entity );
	}

	public static Create( entity : mp.Entity ) : IdentifiedPool
	{
		return new this( entity );
	}

	public static FindOrCreate( entity : mp.Entity ) : IdentifiedPool
	{
		return this.Find( entity ) || this.Create( entity );
	}
}
