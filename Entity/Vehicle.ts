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

import { Entity } from "./Entity";

@ORM.Entity( "vehicles" )
export class Vehicle extends Entity
{
	@ORM.PrimaryGeneratedColumn()
	protected id  : number;

	@ORM.Column( "bigint" )
	protected model : VehicleModel;

	@ORM.Column( "json" )
	protected position : Vector3;

	@ORM.Column( "json" )
	protected rotation : Vector3;

	@ORM.Column( "int" )
	protected dimension : number;

	@ORM.Column( "json" )
	protected color : Color;

	@ORM.Column()
	protected plate : string;

	@ORM.Column( { name: "default_position", type: "json" } )
	protected defaultPosition : Vector3;

	@ORM.Column( { name: "default_rotation", type: "json" } )
	protected defaultRotation : Vector3;

	@ORM.Column( { name: "default_dimension", type: "int" } )
	protected defaultDimension : number;

	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : string;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : string;

	protected entity : mp.Vehicle;

	constructor( entity : mp.Entity );

	constructor( model : VehicleModel, position : Vector3, rotation : Vector3, dimension : number, color : Color, plate : string );

	constructor( modelOrEntity : any, position ?: Vector3, rotation ?: Vector3, dimension ?: number, color ?: Color, plate ?: string )
	{
		if( position == null )
		{
			super( modelOrEntity );

			return;
		}

		super( mp.vehicles.new( modelOrEntity, position, null, dimension ) );

		this.model            = modelOrEntity;
		this.position         = position;
		this.rotation         = rotation;
		this.dimension        = dimension;
		this.color            = color;
		this.plate            = plate;
		this.defaultPosition  = position;
		this.defaultRotation  = rotation;
		this.defaultDimension = dimension;

		this.entity.rotation    = this.rotation;
		this.entity.numberPlate = this.plate;

		this.entity.setColourRGB( this.color.Red, this.color.Green, this.color.Blue, this.color.Red, this.color.Green, this.color.Blue );
	}

	public Create() : void
	{
		this.entity = mp.vehicles.new( this.model, this.position, this.rotation, this.dimension );

		this.entity.rotation    = this.rotation;
		this.entity.numberPlate = this.plate;

		this.entity.setColourRGB( this.color.Red, this.color.Green, this.color.Blue, this.color.Red, this.color.Green, this.color.Blue );
	}

	public GetID() : number
	{
		return this.id;
	}

	public GetName() : string
	{
		return VehicleModel[ this.entity.model ];
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