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

import * as ORM    from "typeorm";
import * as Crypto from "crypto";

import { Character } from "./Character";

@ORM.Entity( "users" )
export class User
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
	
	@ORM.Column( { type: "datetime", name: "loggedin_at" } )
	protected loggedInAt : Date;

	@ORM.Column( { type: "datetime", name: "loggedout_at" } )
	protected loggedOutAt : Date;

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

	public SetPassword( password : string )
	{
		this.salt     = User.GenerateSalt();
		this.password = User.HashPassword( password, this.salt );
	}

	public GetLoggedInDate() : Date
	{
		return this.loggedInAt;
	}

	public UpdateLoggedInDate() : void
	{
		this.loggedInAt = new Date();
	}

	public GetLoggedOutDate() : Date
	{
		return this.loggedOutAt;
	}

	public UpdateLoggedOutDate() : void
	{
		this.loggedOutAt = new Date();
	}

	public GetCreatedDate() : Date
	{
		return this.createdAt
	}

	public CheckPassword( password : string ) : boolean
	{
		return User.CheckPassword( password, this.password, this.salt );
	}

	public static GeneratePassword( length : number = 12, specialChars : boolean = false, extraSpecialChars : boolean = false ) : string
	{
		let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		if( specialChars )
		{
			chars += "!@#$%^&*()";
		}
			
		if( extraSpecialChars )
		{
			chars = chars + "-_ []{}<>~`+=,.;:/?|";
		}

		let password = "";
			
		for( let i = 1; i < length; ++i )
		{
			password += chars.charAt( Math.floor( Math.random() * chars.length ) );
		}

		return password;
	}

	public static GenerateSalt( length : number = 16 ) : string
	{
		let random = ( min : number, max : number ) : number => Math.floor( Math.random() * ( max - min ) ) + min;

		let salt = "";
			
		for( let i = 1; i < length; ++i )
		{
			let rand = random( 33, 127 );

			salt += String.fromCharCode( rand );
		}
			
		return salt;
	}

	public static HashPassword( password : string, salt : string = null ) : string
	{
		if( salt == null )
		{
			salt = this.GenerateSalt();
		}

		let passHash = Crypto.createHash( "sha512" ).update( password ).digest( "hex" );
		let saltHash = Crypto.createHash( "sha512" ).update( salt ).digest( "hex" );

		return Crypto.createHash( "sha256" ).update( passHash + saltHash ).digest( "hex" );
	}

	public static CheckPassword( password : string, passwordHashed : string, salt : string ) : boolean
	{
		if( password.length == 0 || passwordHashed.length < 64 || salt.length == 0 )
		{
			return false;
		}
			
		return this.HashPassword( password, salt ) == passwordHashed;
	}

	public static IsValidEmail( email : string ) : boolean
	{
		if( email.length < 4 || email.length > 32 )
		{
			return false;
		}

		let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return regexp.test( email ); 
	}

	public static IsValidName( name : string ) : boolean
	{
		if( name.length < 3 || name.length > 32 )
		{
			return false;
		}

		return !/[^A-Za-z]/.test( name );
	}
}
