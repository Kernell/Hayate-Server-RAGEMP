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

import { Server } from "Server";

export abstract class ServiceBase implements ServiceInterface
{
	public State : ServiceState;

	public constructor()
	{
		Server.RegisterService( this );

		this.State = ServiceState.None;
	}
	
	public GetState() : ServiceState
	{
		return this.State;
	}
	
	public abstract async Start() : Promise< void >;
	public abstract async Stop() : Promise< void >;
	public abstract DoPulse( date : Date ) : void;
}
