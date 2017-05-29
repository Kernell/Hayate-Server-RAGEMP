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
import { ManagerState, IManager } from "./Core/IManager";

import Console          from "./Entity/Console";
import ManagerBase      from "./Core/ManagerBase";
import CommandManager   from "./Core/CommandManager";
import DatabaseManager  from "./Core/DatabaseManager";
import PlayerManager    from "./Core/PlayerManager";
import VehicleManager   from "./Core/VehicleManager";

export default class Server
{
	public static COUNTDOWN_NONE     = 0;
	public static COUNTDOWN_SHUTDOWN = 1;
	public static COUNTDOWN_RESTART  = 2;

	private static CountDown         = 0;
	private static CountDownType     = Server.COUNTDOWN_NONE;

	private DoPulseTimer             : NodeJS.Timer;
	private DebugTicks               : any;
	private Managers                 : Array< IManager >;

	public DatabaseManager : DatabaseManager;
	public CommandManager  : CommandManager;
	public PlayerManager   : PlayerManager;
	public VehicleManager  : VehicleManager;

	constructor()
	{
		this.Managers   = new Array< any >();
		this.DebugTicks = {};

		this.DatabaseManager = new DatabaseManager( this );
		this.CommandManager  = new CommandManager( this );
		this.PlayerManager   = new PlayerManager( this );
		this.VehicleManager  = new VehicleManager( this );

		setTimeout( () => this.Initialize(), 500 );
	}

	public Initialize() : void
	{
		for( let manager of this.Managers )
		{
			let tick = new Date().getTime();

			let name = ( manager.constructor.name + ":" ).pad( 70 );

			manager.State = ManagerState.None;

			manager.Init().then(
				( info ) =>
				{
					manager.State = ManagerState.OK;

					let tick_count = ( ( new Date().getTime() - tick ) / 1000 ).toFixed( 3 );

					Console.WriteLine( `Starting %s [  ${Console.FgGreen}OK${Console.Reset}  ]  %s ms`, name, tick_count.pad( 5, ' ', true ) );
				}
			).catch(
				( error ) =>
				{
					manager.State = ManagerState.Error;

					Console.WriteLine( `Starting %s [${Console.FgRed}FAILED${Console.Reset}]`, name );
				}
			);
		}

		this.DoPulseTimer = setInterval( () => this.DoPulse(), 1000 );
	}

	public RegisterManager( manager : IManager )
	{
		this.Managers.push( manager );
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
