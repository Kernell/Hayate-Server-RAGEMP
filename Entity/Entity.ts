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

import IdentifiedPool from "../SharedUtils/IdentifiedPool";

export class Entity extends IdentifiedPool
{
	public Destroy() : void
	{
		this.entity.destroy();

		this.Dispose();
	}

	public GetID() : number
	{
		return this.entity.id;
	}

	public GetEntity() : mp.Entity
	{
		return this.entity;
	}

	public GetType() : string
	{
		return this.entity.type;
	}

	public GetModel() : number
	{
		return this.entity.model;
	}

	public GetAlpha() : number
	{
		return this.entity.alpha;
	}

	public GetPosition() : Vector3
	{
		return new Vector3( this.entity.position.x, this.entity.position.y, this.entity.position.z );
	}

	public GetRotation() : Vector3
	{
		return new Vector3( this.entity.rotation.x, this.entity.rotation.y, this.entity.rotation.z );
	}

	public GetDimension() : number
	{
		return this.entity.dimension;
	}

	public SetModel( model : number ) : void
	{
		this.entity.model = model;
	}
}
