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

	constructor( model, position, rotation, dimension, color, plate )
	{
		let id     = 0;
		let entity = mp.vehicles.new( 123, position );

		super( id, entity );
	}

	public GetPlate() : string
	{
		return this.plate;
	}

	public GetColor() : any
	{
		return this.color;
	}
}