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

import * as ORM from "typeorm";

export default class Entity
{
	protected id        : number;
	protected entity    : mp.Entity;

	constructor( id : number, entity : mp.Entity )
	{
		this.id     = id;
		this.entity = entity;
	}

	public GetID() : number
	{
		return this.id;
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
