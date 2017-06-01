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

	public GetPosition() : any
	{
		return this.entity.position;
	}

	public GetRotation() : any
	{
		return this.entity.rotation;
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
