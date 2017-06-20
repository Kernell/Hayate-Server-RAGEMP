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

import { ServiceBase }      from "./Services/ServiceBase";
import { AccountService }   from "./Services/AccountService";
import { CommandService }   from "./Services/CommandService";
import { DatabaseService }  from "./Services/DatabaseService";
import { PlayerService }    from "./Services/PlayerService";
import { CharacterService } from "./Services/CharacterService";
import { VehicleService }   from "./Services/VehicleService";

export class Server
{
	public static DatabaseService    : DatabaseService;
	public static CommandService     : CommandService;
	public static PlayerService      : PlayerService;
	public static CharacterService   : CharacterService;
	public static AccountService     : AccountService;
	public static VehicleService     : VehicleService;

	public static COUNTDOWN_NONE     = 0;
	public static COUNTDOWN_SHUTDOWN = 1;
	public static COUNTDOWN_RESTART  = 2;

	private static CountDown         = 0;
	private static CountDownType     = Server.COUNTDOWN_NONE;

	private static services          : Array< ServiceInterface > = new Array< ServiceInterface >();

	private static doPulseTimer      : NodeJS.Timer;
	private static debugTicks        : { [ name : string ] : number };

	public static Main() : void
	{
		Config.argv().env().defaults(
			{
				'NODE_ENV': 'development',
			}
		);

		let path = __dirname.split( '\\' ).slice( 0, -1 ).join( '/' );
		
		Config.file( { file: `${path}/Config/${Config.get( 'NODE_ENV' )}.json` } );

		Server.debugTicks      = {};

		Server.DatabaseService  = new DatabaseService();
		Server.AccountService   = new AccountService();
		Server.CommandService   = new CommandService();
		Server.PlayerService    = new PlayerService();
		Server.CharacterService = new CharacterService();
		Server.VehicleService   = new VehicleService();

		Server.StartAll();
	
		Server.doPulseTimer = setInterval( () => this.DoPulse(), 1000 );
	}

	public static RegisterService( service : ServiceInterface ) : void
	{
		this.services.push( service );
	}

	private static async StartAll() : Promise< any >
	{
		for( let service of Server.services )
		{
			let tick = new Date().getTime();
			let name = service.constructor.name + ":";

			service.State = ServiceState.None;
			
			Console.Write( `Starting %-70s`, name );

			try
			{
				await service.Start();

				service.State = ServiceState.OK;

				let tick_count = ( new Date().getTime() - tick ) / 1000;

				Console.Write( `[  ${Console.FgGreen}OK${Console.Reset}  ] % 5.3f ms\n`, tick_count );
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
	}

	private static async StopAll() : Promise< any >
	{
		for( let service of Server.services )
		{
			if( service.State != ServiceState.OK )
			{
				continue;
			}

			let tick = new Date().getTime();
			let name = service.constructor.name + ":";

			Console.Write( `Stopping %-70s`, name );

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
		this.StopAll().then( () => setTimeout( () => process.exit(), 1000 ) );
	}
}
