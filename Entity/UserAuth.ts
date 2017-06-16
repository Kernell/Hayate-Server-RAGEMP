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
import * as Entity from "../Entity";

@ORM.Entity( "user_auth" )
export class UserAuth
{
	@ORM.PrimaryGeneratedColumn()
	protected id : number;

	@ORM.ManyToOne( type => Entity.User, user => user[ "tokens" ] )
	@ORM.JoinColumn( { name: "user_id" } )
	protected user : Entity.User;
	
	@ORM.Column( { name: "device_id" } )
	protected deviceId : string;
	
	@ORM.Column()
	protected token : string;
	
	@ORM.Column()
	protected ip : string;
	
	@ORM.CreateDateColumn()
	protected date : Date;

	public GetID() : number
	{
		return this.id;
	}

	public GetUser() : Entity.User
	{
		return this.user;
	}

	public GetDeviceID() : string
	{
		return this.deviceId;
	}

	public GetToken() : string
	{
		return this.token;
	}

	public GetIP() : string
	{
		return this.ip;
	}

	public GetDate() : Date
	{
		return this.date;
	}

	public SetUser( user : Entity.User ) : void
	{
		this.user = user;
	}

	public SetDeviceID( deviceId : string ) : void
	{
		this.deviceId = deviceId;
	}

	public SetToken( token : string ) : void
	{
		this.token = token;
	}

	public SetIP( ip : string ) : void
	{
		this.ip = ip;
	}

	public SetDate( date : Date ) : void
	{
		this.date = date;
	}
}
