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

import * as ORM          from "typeorm";

@ORM.Entity( "users" )
export class User implements UserInterface
{
	@ORM.PrimaryGeneratedColumn()
	protected id  : number;

	@ORM.Column( { unique: true, length: 64 } )
	protected name : string;

	@ORM.Column( { unique: true, length: 64 } )
	protected email : string;

	@ORM.Column()
	protected password : string;

	@ORM.Column()
	protected salt : string;
	
	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : Date;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : Date;

	public GetID() : number
	{
		return this.id;
	}

	public GetName() : string
	{
		return this.name;
	}

	public SetName( name : string ) : void
	{
		this.name = name;
	}

	public GetEmail() : string
	{
		return this.email;
	}

	public SetEmail( email : string ) : void
	{
		this.email = email;
	}

	public GetPassword() : string
	{
		return this.password;
	}

	public SetPassword( password : string )
	{
		this.password = password;
	}

	public GetSalt() : string
	{
		return this.salt;
	}

	public SetSalt( salt : string )
	{
		this.salt = salt;
	}

	public GetCreatedDate() : Date
	{
		return this.createdAt
	}
}
