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
	
	@ORM.Column( { name: "user_id" } )
	protected userId : number
	
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

	public GetUserID() : number
	{
		return this.userId;
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

	public SetUserID( userId : number ) : void
	{
		this.userId = userId;
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
