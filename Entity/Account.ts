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
import * as Entity       from "../Entity";

@ORM.Entity( "accounts" )
export class Account implements AccountInterface
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

	@ORM.Column( { name: "roles", type: "simple_array", default: null, nullable: true } )
	protected _roles : number[];
	
	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : Date;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : Date;

	protected roles : Map< number, AccountRoleInterface >;

	public Players : Array< Entity.Player > = new Array< Entity.Player >();

	public Connection : IConnection;

	public get IsOnline() : boolean
	{
		return this.Connection != null;
	}

	public constructor()
	{
		this.roles = new Map< number, AccountRoleInterface >();
	}

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

	public GetRoles() : Map< number, AccountRoleInterface >
	{
		return this.roles;
	}

	public AddRole( role : AccountRoleInterface ) : void
	{
		if( this._roles.indexOf( role.GetID() ) == -1 )
		{
			this._roles.push( role.GetID() );
		}

		this.roles.set( role.GetID(), role );
	}

	public RemoveRole( role : AccountRoleInterface ) : void
	{
		this._roles.splice( this._roles.indexOf( role.GetID() ), 1 );

		this.roles.delete( role.GetID() );
	}

	public IsGranted( permission : Permission|string ) : boolean
	{
		if( this.id == 0 )
		{
			return true;
		}

		for( let role of this.roles.values() )
		{
			if( role.IsGranted( permission ) )
			{
				return true;
			}
		}

		return false;
	}
}
