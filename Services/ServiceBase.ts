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

import * as Entity      from "../Entity";

type EventCallback = ( ...params : any[] ) => Promise< any >;
type EventType     = { name: string, callback: Function };
type EventsArray   = [ EventType ];

export class ServiceBase implements ServiceInterface
{
	protected Server     : ServerInterface;
	protected Dependency : ServiceInterface;
	public    State      : ServiceState;

	constructor( server : ServerInterface )
	{
		server.RegisterService( this );
		
		this.Server      = server;
		this.Dependency  = null;
		this.State       = ServiceState.None;
	}

	protected RegisterEvent( event : string, handler: EventCallback )
	{
		let callback = ( player : PlayerInterface, ...params : any[] ) =>
		{
			this.EventHandler( event, handler, player, ...params );
		};

		Event.AddListener( event, callback );
	}

	protected WrapEvent( event : string, handler: EventCallback )
	{
		let callback = ( player : mp.Entity, ...params : any[] ) =>
		{
			let typeName = player.type[ 0 ].toUpperCase() + player.type.substring( 1 );

			let type = typeName == "Console" ? Console : Entity[ typeName ];

			this.EventHandler( event, handler, type.FindOrCreate( player ), ...params );
		};

		mp.events.add( event, callback );
	}

	protected EventHandler( event : string, handler: EventCallback, source : PlayerInterface, ...params : any[] )
	{
		let new_params = [];

		for( let param of params )
		{
			let value = param;

			if( typeof param == "object" && param.type != null )
			{
				let type = param.type[ 0 ].toUpperCase() + param.type.substr( 1, param.type.length );

				value = Entity[ type ].FindOrCreate( param );
			}

			new_params.push( value );
		}

		let promise = handler.call( this, source, ...new_params );

		if( promise != null )
		{
			promise.catch(
				( error : Error ) =>
				{
					if( error instanceof Exception )
					{
						source.OutputChatBox( `<span style='color: #FF8800;'>${error.message}</span>` );
					}
					else
					{
						source.OutputChatBox( "<span style='color: #FF8800;'>Что-то пошло не так. Мы работаем над тем, чтобы исправить это как можно скорее. Вы сможете попробовать снова спустя какое-то время</span>" );

						Console.WriteLine( Console.FgRed + '%s' + Console.Reset, error.stack );
					}
				}
			);
		}
	}
	
	public GetState() : ServiceState
	{
		return this.State;
	}
	
	public Start() : Promise< any >
	{
		return new Promise(
			( resolve, reject ) =>
			{
				if( this.Dependency != null )
				{
					let timeout = () =>
					{
						if( this.Dependency.GetState() == ServiceState.OK )
						{
							return resolve();
						}

						if( this.Dependency.GetState() == ServiceState.Error )
						{
							return reject();
						}
				
						setTimeout( timeout, 100 );
					};

					return timeout();
				}

				return resolve();
			}
		);
	}

	public Stop() : Promise< any >
	{
		return new Promise( ( resolve, reject ) => resolve() );
	}

	public DoPulse( date : Date ) : void
	{
	}
}
