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

@ORM.Entity( "account_roles" )
export class AccountRole implements AccountRoleInterface
{
	@ORM.PrimaryGeneratedColumn()
	protected id : number;
	
	@ORM.Column()
	protected name : string;

	@ORM.Column( "json" )
	protected color : Color;
	
	@ORM.Column( { type: "simple_array", default: null, nullable: true } )
	protected permissions : string[];

	public constructor()
	{
		this.permissions = [];
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

	public GetColor() : Color
	{
		return this.color;
	}

	public SetColor( color : Color ) : void
	{
		this.color = color;
	}

	public IsGranted( permission : Permission|string ) : boolean
	{
		return this.id == 0 || this.permissions.indexOf( Permission.Developer.toString() ) != -1 || this.permissions.indexOf( permission.toString() ) != -1;
	}

	public SetPermission( permission : Permission, granted : boolean = true ) : void
	{
		if( granted )
		{
			this.AddPermission( permission );
		}
		else
		{
			this.RemovePermission( permission );
		}
	}

	public AddPermission( permission : Permission ) : void
	{
		if( this.permissions.indexOf( permission.toString() ) == -1 )
		{
			this.permissions.push( permission.toString() );
		}
	}

	public RemovePermission( permission : Permission ) : void
	{
		if( this.permissions.indexOf( permission.toString() ) != -1 )
		{
			this.permissions.push( permission.toString() );
		}
	}
}
