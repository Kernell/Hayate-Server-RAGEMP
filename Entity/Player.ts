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
import { User }       from "./User";

export class Player extends Entity
{
	protected user   : User;
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

	public GetUser() : User
	{
		return this.user;
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

	public Invoke( hash : string, ...args : any[] ) : void
	{
		this.entity.invoke( hash, ...args );
	}

	public Call( eventName : string, ...args : any[] ) : void
	{
		this.entity.call( eventName, ...args );
	}

	public Notify( message : string ) : void
	{
		this.entity.notify( message );
	}

	public Login( user : User ) : void
	{
		this.user = user;

		this.Call( "playerLogin", user.GetID() );
	}

	public Logout() : void
	{
		this.Call( "playerLogout", this.user.GetID() );

		this.user = null;
	}
}
