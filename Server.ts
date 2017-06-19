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
import "./SharedUtils";
import * as Config          from "nconf";

import { ServiceBase }      from "./Services/ServiceBase";
import { AccountService }   from "./Services/AccountService";
import { CommandService }   from "./Services/CommandService";
import { DatabaseService }  from "./Services/DatabaseService";
import { PlayerService }    from "./Services/PlayerService";
import { VehicleService }   from "./Services/VehicleService";
import { CharacterService } from "./Services/CharacterService";

export default class Server implements ServerInterface
{
	public static COUNTDOWN_NONE     = 0;
	public static COUNTDOWN_SHUTDOWN = 1;
	public static COUNTDOWN_RESTART  = 2;

	private static CountDown         = 0;
	private static CountDownType     = Server.COUNTDOWN_NONE;

	private DoPulseTimer             : NodeJS.Timer;
	private DebugTicks               : any;
	private services                 : Array< ServiceInterface >;

	public DatabaseService  : DatabaseService;
	public CommandService   : CommandService;
	public PlayerService    : PlayerService;
	public AccountService   : AccountService;
	public VehicleService   : VehicleService;

	public constructor()
	{
		Config.argv().env().defaults(
			{
				'NODE_ENV': 'development',
			}
		);

		let path = __dirname.split( '\\' ).slice( 0, -1 ).join( '/' );
		
		Config.file( { file: `${path}/Config/${Config.get( 'NODE_ENV' )}.json` } );

		this.services        = new Array< ServiceInterface >();
		this.DebugTicks      = {};

		this.DatabaseService = new DatabaseService( this );
		this.CommandService  = new CommandService( this );
		this.PlayerService   = new PlayerService( this );
		this.AccountService  = new AccountService( this );
		this.VehicleService  = new VehicleService( this );

		new CharacterService( this );

		this.StartAll();
	
		this.DoPulseTimer = setInterval( () => this.DoPulse(), 1000 );
	}

	private StartAll() : void
	{
		for( let manager of this.services )
		{
			let tick = new Date().getTime();

			let name = manager.constructor.name + ":";

			manager.State = ServiceState.None;

			manager.Start().then(
				( info ) =>
				{
					manager.State = ServiceState.OK;

					let tick_count = ( new Date().getTime() - tick ) / 1000;

					Console.WriteLine( `Starting %-70s [  ${Console.FgGreen}OK${Console.Reset}  ] % 5.3f ms`, name, tick_count );
				}
			).catch(
				( error : Error ) =>
				{
					manager.State = ServiceState.Error;

					Console.WriteLine( `Starting %-70s [${Console.FgRed}FAILED${Console.Reset}]`, name );

					if( error )
					{
						Console.WriteLine( '%s', error.stack || error );
					}
				}
			);
		}
	}

	private StopAll() : Promise< any >
	{
		let promises = [];

		for( let manager of this.services )
		{
			let promise = new Promise(
				( resolve, reject ) =>
				{
					if( manager.State != ServiceState.OK )
					{
						resolve();

						return;
					}

					let tick = new Date().getTime();

					let name = manager.constructor.name + ":";

					manager.Stop().then(
						( info ) =>
						{
							manager.State = ServiceState.None;

							let tick_count = ( new Date().getTime() - tick ) / 1000;

							Console.WriteLine( `Stopping %-70s [  ${Console.FgGreen}OK${Console.Reset}  ] % 5.3f ms`, name, tick_count );

							resolve();
						}
					).catch(
						( error : Error ) =>
						{
							Console.WriteLine( `Stopping %-70s [${Console.FgRed}FAILED${Console.Reset}]`, name );

							if( error )
							{
								Console.WriteLine( '%s', error.stack || error );
							}

							resolve();
						}
					);
				}
			);

			promises.push( promise );
		}

		return Promise.all( promises );
	}

	private DoPulse() : void
	{
		let date = new Date();
		let tick = date.getTime();

		for( let manager of this.services )
		{
			if( manager.GetState() != ServiceState.OK )
			{
				continue;
			}

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
						this.Restart();
					}
					else if( Server.CountDownType == Server.COUNTDOWN_SHUTDOWN )
					{
						this.Shutdown();
					}
				}
			}
		}

		this.DebugTicks[ "DoPulse" ] = ( ( new Date().getTime() - tick ) / 1000 );
	}
	
	public RegisterService( service : ServiceInterface ) : void
	{
		this.services.push( service );
	}

	public Restart() : void
	{
		this.StopAll().then( () => this.StartAll() );
	}

	public Shutdown() : void
	{
		this.StopAll().then( () => setTimeout( () => process.exit(), 2000 ) );
	}
}
