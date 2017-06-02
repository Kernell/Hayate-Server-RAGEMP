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

import * as ORM       from "typeorm";

import { Entity } from "./Entity";

@ORM.Entity( "vehicles" )
export class Vehicle extends Entity
{
	@ORM.PrimaryGeneratedColumn()
	protected id  : number;

	@ORM.Column( "int" )
	protected model : mp.VehicleModel;

	@ORM.Column()
	protected position : Object;

	@ORM.Column()
	protected rotation : Object;

	@ORM.Column( "int" )
	protected dimension : number;

	@ORM.Column()
	protected color : Color;

	@ORM.Column()
	protected plate : string;

	@ORM.Column( { name: "default_position" } )
	protected defaultPosition : Object;

	@ORM.Column( { name: "default_rotation" } )
	protected defaultRotation : Object;

	@ORM.Column( { name: "default_dimension", type: "int" } )
	protected defaultDimension : Object;

	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : string;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : string;

	protected entity : mp.Vehicle;

	constructor( entity : mp.Entity );

	constructor( model : mp.VehicleModel, position : mp.Vector3, rotation : mp.Vector3, dimension : number, color : Color, plate : string );

	constructor( modelOrEntity : any, position ?: mp.Vector3, rotation ?: mp.Vector3, dimension ?: number, color ?: Color, plate ?: string )
	{
		if( position == null )
		{
			super( modelOrEntity );

			return;
		}

		super( mp.vehicles.new( modelOrEntity, position, rotation, dimension ) );

		this.model            = modelOrEntity;
		this.position         = position;
		this.rotation         = rotation;
		this.dimension        = dimension;
		this.color            = color;
		this.plate            = plate;
		this.defaultPosition  = position;
		this.defaultRotation  = rotation;
		this.defaultDimension = dimension;

		this.entity.rotation    = this.rotation as mp.Vector3;
		this.entity.numberPlate = this.plate;

		this.entity.setColourRGB( this.color.Red, this.color.Green, this.color.Blue, 0, 0, 0 );
	}

	public GetID() : number
	{
		return this.id;
	}

	public GetPlate() : string
	{
		return this.entity.numberPlate;
	}

	public SetPlate( text : string ) : void
	{
		this.plate = this.entity.numberPlate = text;
	}

	public GetColor() : Color
	{
		return this.color;
	}
}