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

const EventEmitter = require( "events" );

class Event
{
	public static EventEmitter = new EventEmitter();

	private eventEmitter;

	public constructor()
	{
		this.eventEmitter = new EventEmitter();
	}

	public AddListener( name : string, listener : Function ) : void
	{
		this.eventEmitter.addListener( name, listener );
	}

	public Call( name : string, ...args : any[] ) : void
	{
		this.eventEmitter.emit( name, ...args );
	}

	public static AddListener( name : string, listener : Function ) : void
	{
		Event.EventEmitter.addListener( name, listener );
	}

	public static Call( name : string, ...args : any[] ) : void
	{
		Event.EventEmitter.emit( name, ...args );
	}
}

module.exports = Event;
