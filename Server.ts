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

import "reflect-metadata";

import * as Config          from "nconf";
import { ScsServer }        from "./ScsServer";
import { ServiceBase }      from "./Services/ServiceBase";
import { AccountService }   from "./Services/AccountService";
import { ChatService }      from "./Services/ChatService";
import { DatabaseService }  from "./Services/DatabaseService";
import { PlayerService }    from "./Services/PlayerService";
import { VehicleService }   from "./Services/VehicleService";
import { AdminLogic }       from "./Logic/Admin/AdminLogic";

export class Server
{
	public static ScsServer          : ScsServer;

	public static DatabaseService    : DatabaseService;
	public static PlayerService      : PlayerService;
	public static AccountService     : AccountService;
	public static ChatService        : ChatService;
	public static VehicleService     : VehicleService;
	public static AdminLogic         : AdminLogic;

	public static COUNTDOWN_NONE     = 0;
	public static COUNTDOWN_SHUTDOWN = 1;
	public static COUNTDOWN_RESTART  = 2;

	private static CountDown         = 0;
	private static CountDownType     = Server.COUNTDOWN_NONE;

	private static services          : Array< ServiceInterface > = new Array< ServiceInterface >();

	private static doPulseTimer      : NodeJS.Timer;
	private static debugTicks        : { [ name : string ] : number };

	public static async Main() : Promise< void >
	{
		let tick = new Date().getTime();

		Config.argv().env().defaults(
			{
				'NODE_ENV': 'development',
			}
		);

		let path = __dirname.split( '\\' ).slice( 0, -1 ).join( '/' );
		
		Config.file( { file: `${path}/Config/${Config.get( 'NODE_ENV' )}.json` } );

		Server.debugTicks      = {};

		Server.ScsServer        = new ScsServer();

		Server.DatabaseService  = new DatabaseService();
		Server.AccountService   = new AccountService();
		Server.ChatService      = new ChatService();
		Server.PlayerService    = new PlayerService();
		Server.VehicleService   = new VehicleService();

		Server.AdminLogic       = new AdminLogic();

		Console.WriteLine( "-----------------------------------------------------------------------------" );

		try
		{
			await Server.StartAll();
		}
		catch( e )
		{
			Console.WriteLine( `${Console.FgRed}%s${Console.Reset}`, e.stack );
		}

		Server.ScsServer.BeginListening();

		Console.WriteLine( "-----------------------------------------------------------------------------" );
		Log.Trace        ( "Server started in %5.3f ms", ( new Date().getTime() - tick ) / 1000 );
		Console.WriteLine( "-----------------------------------------------------------------------------" );
	
		Server.doPulseTimer = setInterval( () => this.DoPulse(), 1000 );
	}

	public static RegisterService( service : ServiceInterface ) : void
	{
		this.services.push( service );
	}

	private static async StartAll() : Promise< any >
	{
		let getTime = () =>
		{
			let date = new Date();

			let h  = date.getHours();
			let i  = date.getMinutes();
			let s  = date.getSeconds();
			let ms = date.getMilliseconds();

			return printf( "%02d:%02d:%02d.%04d", h, i, s, ms );
		}

		for( let service of Server.services )
		{
			let tick = new Date().getTime();
			let name = service.constructor.name + ":";

			service.State = ServiceState.None;
			
			Console.Write( `%s | Starting %-35s`, getTime(), name );

			try
			{
				await service.Start();

				service.State = ServiceState.OK;

				let tick_count = ( new Date().getTime() - tick ) / 1000;

				Console.Write( `[  ${Console.FgGreen}OK${Console.Reset}  ] %5.3f ms\n`, tick_count );
			}
			catch( error )
			{
				service.State = ServiceState.Error;

				Console.Write( `[${Console.FgRed}FAILED${Console.Reset}]\n` );

				if( error )
				{
					Console.WriteLine( '%s', error.stack || error );
				}
			}
		}

		await Server.AdminLogic.Start();
	}

	private static async StopAll() : Promise< any >
	{
		let getTime = () =>
		{
			let date = new Date();

			let h  = date.getHours();
			let i  = date.getMinutes();
			let s  = date.getSeconds();
			let ms = date.getMilliseconds();

			return printf( "%02d:%02d:%02d.%04d", h, i, s, ms );
		}

		for( let service of Server.services )
		{
			if( service.State != ServiceState.OK )
			{
				continue;
			}

			let tick = new Date().getTime();
			let name = service.constructor.name + ":";

			Console.Write( `%s | Stopping %-35s`, getTime(), name );

			try
			{
				await service.Stop();

				service.State = ServiceState.None;

				let tick_count = ( new Date().getTime() - tick ) / 1000;

				Console.Write( `[  ${Console.FgGreen}OK${Console.Reset}  ] % 5.3f ms\n`, tick_count );
			}
			catch( error )
			{
				Console.Write( `[${Console.FgRed}FAILED${Console.Reset}]\n` );

				if( error )
				{
					Console.WriteLine( '%s', error.stack || error );
				}
			}
		}
	}

	private static DoPulse() : void
	{
		let date = new Date();
		let tick = date.getTime();

		for( let service of Server.services )
		{
			if( service.GetState() != ServiceState.OK )
			{
				continue;
			}

			let tick2 = new Date().getTime();
			
			service.DoPulse( date );
			
			this.debugTicks[ service.constructor.name ] = ( ( new Date().getTime() - tick2 ) / 1000 );
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
						this.Restart();
					}
					else if( Server.CountDownType == Server.COUNTDOWN_SHUTDOWN )
					{
						this.Shutdown();
					}
				}
			}
		}

		this.debugTicks[ "DoPulse" ] = ( ( new Date().getTime() - tick ) / 1000 );
	}

	public static Restart() : void
	{
		this.StopAll().then( () => this.StartAll() );
	}

	public static Shutdown() : void
	{
		Server.ScsServer.ShutdownServer();

		this.StopAll().then( () => setTimeout( () => process.exit(), 1000 ) );
	}
}
