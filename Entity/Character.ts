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
import { Player } from "./Player";
import { User }   from "./User";

@ORM.Entity( "characters" )
export class Character
{
	@ORM.PrimaryGeneratedColumn()
	protected id  : number;
	
	@ORM.ManyToOne( type => User, user => user.characters )
	@ORM.JoinColumn( { name: "user_id" } )
	public user : User = null;

	@ORM.Column( "int" )
	protected level : number;

	@ORM.Column( "int" )
	protected model : number;

	@ORM.Column()
	protected position : string;

	@ORM.Column()
	protected rotation : string;

	@ORM.Column( "int" )
	protected dimension : number;

	@ORM.Column()
	protected name : string;
	
	@ORM.Column()
	protected lastname : string;
	
	@ORM.Column( "bigint" )
	protected money : number;
	
	@ORM.Column( "float" )
	protected health : number;

	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : string;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : string;

	protected entity : mp.Player = null;
	protected player : Player    = null;

	public constructor( player : Player )
	{
		if( player )
		{
			this.player = player;
			this.entity = player.GetEntity() as mp.Player;
		}
	}

	public GetUserID() : User
	{
		return this.user;
	}
}
