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

import { Character } from "./Character";

@ORM.Entity( "users" )
export class User
{
	@ORM.PrimaryGeneratedColumn()
	protected id  : number;

	@ORM.Column()
	protected name : string;

	@ORM.OneToMany( type => Character, character => character.user )
    public characters : Character[] = [];

	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : string;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : string;

	public GetID() : number
	{
		return this.id;
	}

	public GetCharacters() : Character[]
	{
		return this.characters;
	}
}
