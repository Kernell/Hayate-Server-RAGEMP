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

import CommandManager from "./Core/CommandManager";
import Console        from "./Entity/Console";

export default class Server
{
	public static COUNTDOWN_NONE     = 0;
	public static COUNTDOWN_SHUTDOWN = 1;
	public static COUNTDOWN_RESTART  = 2;

	private static CountDown        = 0;
	private static CountDownType    = Server.COUNTDOWN_NONE;

	private DoPulseTimer : NodeJS.Timer;
	private DebugTicks : any;

	private Managers : Array< any >;

	private CommandManager : CommandManager;

	constructor()
	{
		this.Managers = new Array< any >();

		this.CommandManager = new CommandManager();

		for( let manager of this.Managers )
		{
			let tick = new Date().getTime();
				
			if( manager.Init() )
			{
				Console.WriteLine( `Starting %-34s [  ${Console.FgGreen}OK${Console.Reset}  ]  %20s ms`, manager.constructor.name + ":", ( ( new Date().getTime() - tick ) / 1000 ).toFixed( 3 ) );
			}
			else
			{
				Console.WriteLine( `Starting %-34s [${Console.FgRed}FAILED${Console.Reset}]`, manager.constructor.name + ":" );
			}
		}

		this.DoPulseTimer = setInterval( () => this.DoPulse(), 1000 );
	}

	private DoPulse() : void
	{
		let date = new Date();
		let tick = date.getTime();

		for( let manager of this.Managers )
		{
			let tick2 = new Date().getTime();
				
			manager.DoPulse( date );
				
			this.DebugTicks[ manager.constructor.name ] = ( ( new Date().getTime() - tick2 ) / 1000 );
		}

		if( Server.CountDown > 0 )
		{
			--Server.CountDown;
			
			if( Server.CountDownType != Server.COUNTDOWN_NONE )
			{
				if( Server.CountDown <= 10 || Server.CountDown % 60 == 0 )
				{
					let type = Server.CountDownType == Server.COUNTDOWN_SHUTDOWN ? "Выключение" : "Рестарт";
					
					Console.WriteLine( "%s сервера через %d:%02d", type, Server.CountDown % 3600 / 60, Server.CountDown % 60  );
				}
			
				if( Server.CountDown == 0 )
				{
					if( Server.CountDownType == Server.COUNTDOWN_RESTART )
					{
						Server.Restart();
					}
					else if( Server.CountDownType == Server.COUNTDOWN_SHUTDOWN )
					{
						Server.Shutdown();
					}
				}
			}
		}

		this.DebugTicks[ "DoPulse" ] = ( ( new Date().getTime() - tick ) / 1000 );
	}

	public static Restart() : void
	{
	}

	public static Shutdown() : void
	{
	}
}
