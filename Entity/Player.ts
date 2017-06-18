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

import { Entity }                from "./Entity";
import { User }                  from "./User";
import { UsernamePasswordToken } from "../Security/Token/UsernamePasswordToken";

export class Player extends Entity implements PlayerInterface
{
	protected user   : UserInterface;
	protected char   : CharacterInterface;
	protected entity : mp.Player;

	public constructor( entity : mp.Entity )
	{
		super( entity )

		this.char = null;
	}

	public GetUser() : UserInterface
	{
		return this.user;
	}

	public GetCharacter() : CharacterInterface
	{
		return this.char;
	}

	public SetCharacter( char : CharacterInterface )
	{
		this.char = char;
	}

	public GetName() : string
	{
		return this.entity.name;
	}

	public GetPing() : number
	{
		return this.entity.ping;
	}

	public GetIP() : string
	{
		return this.entity.ip;
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

	public Kick( reason : string ) : void
	{
		this.entity.kick( reason );
	}

	public Ban( reason : string ) : void
	{
		this.entity.ban( reason );
	}

	public Login( token : UsernamePasswordToken ) : void
	{
		let user = token.GetUser() as User;
		
		user.Login( token );

		this.user = user;

		Event.Call( "playerLogin", this, user );
	}

	public Logout() : void
	{
		Event.Call( "playerLogout", this, this.user );

		this.user = null;
	}
}
