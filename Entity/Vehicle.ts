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

import Entity from "./Entity";

@ORM.Entity( "vehicles" )
export default class Vehicle extends Entity
{
	@ORM.PrimaryGeneratedColumn()
	protected id  : number;

	@ORM.Column( "int" )
	protected model : number;

	@ORM.Column()
	protected position : string;

	@ORM.Column()
	protected rotation : string;

	@ORM.Column( "int" )
	protected dimension : number;

	@ORM.Column()
	protected color : string;

	@ORM.Column()
	protected plate : string;

	@ORM.Column( { name: "default_position" } )
	protected defaultPosition : string;

	@ORM.Column( { name: "default_rotation" } )
	protected defaultRotation : string;

	@ORM.Column( { name: "default_interior", type: "int" } )
	protected defaultInterior : number;

	@ORM.Column( { name: "default_dimension", type: "int" } )
	protected defaultDimension : number;

	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : string;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : string;

	protected entity : mp.Vehicle;

	constructor( model : number, position : mp.Vector3, rotation : mp.Vector3, dimension : number, color : any, plate : string )
	{
		super( mp.vehicles.new( model, position, rotation, dimension ) );

		this.entity.rotation    = rotation;
		this.entity.numberPlate = plate;

		this.entity.setColourRGB( color.red, color.green, color.blue, 0, 0, 0 );
	}

	public GetPlate() : string
	{
		return this.entity.numberPlate;
	}

	public SetPlate( text : string ) : void
	{
		this.entity.numberPlate = text;
	}

	public GetColor() : any
	{
		return this.color;
	}
}