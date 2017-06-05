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

import { Entity }     from "./Entity";
import { Character }  from "./Character";

export class Player extends Entity
{
	protected char   : Character;
	protected entity : mp.Player;

	public constructor( entity : mp.Entity )
	{
		super( entity )

		this.char = null;
	}

	public CreateCharacter( id )
	{
		this.char = new Character( this );
	}

	public GetCharacter() : Character
	{
		return this.char;
	}

	public GetName() : string
	{
		return this.entity.name;
	}

	public OutputChatBox( text : string ) : void
	{
		this.entity.outputChatBox( text );
	}
}
