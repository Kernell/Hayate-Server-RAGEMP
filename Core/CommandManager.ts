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

import * as Command    from "../Command";
import * as Entity     from "../Entity";
import ManagerBase     from "./ManagerBase";
import DatabaseManager from "./DatabaseManager";

export default class CommandManager extends ManagerBase< Entity.Entity >
{
	private shudownTick : number = 0;
	private console     : Console;
	private Commands    : Array< Command.ConsoleCommand >;

	constructor( server : ServerInterface )
	{
		super( server );

		this.Dependency = server.DatabaseManager;

		this.console  = new Console();
		this.Commands = new Array< Command.ConsoleCommand >();

		this.Add( new Command.Interior ( server ) );
		this.Add( new Command.Character( server ) );
		this.Add( new Command.Player   ( server ) );
		this.Add( new Command.User     ( server ) );
		this.Add( new Command.Vehicle  ( server ) );
		this.Add( new Command.Login    ( server ) );
		this.Add( new Command.Register ( server ) );

		process.stdin.on( "data",     input          => this.OnLine( input.toString().trim() ) );
		process.stdin.on( "keypress", ( chunk, key ) => this.OnKey ( chunk, key ) );

		process.on( 'SIGINT', () => this.OnSigint() );

		mp.events.add(
			{
				playerCommand: ( player, line ) => this.OnPlayerLine( Entity.Player.FindOrCreate< Entity.Player >( player ), line ),
			}
		);
	}

	public Init() : Promise< any >
	{
		return super.Init().then(
			() =>
			{
				let repository = ( this.Dependency as DatabaseManager ).GetRepository( Entity.User );

				return repository.findOneById( 0 ).then(
					( user : Entity.User ) =>
					{
						if( user == null )
						{
							throw new Error( "root user is undefined" );
						}

						this.console[ 'user' ] = user;
					}
				);
			}
		);
	}

	protected Add( command : Command.ConsoleCommand ) : Boolean
	{
		if( command == this.GetCommand( command.GetName() ) )
		{
			return false;
		}

		this.Commands.push( command );

		return true;
	}

	protected Execute( player : PlayerInterface, commandName : String, argv : any[] ) : Boolean
	{
		let command = this.GetCommand( commandName );

		if( command != null )
		{
			if( command.IsRestricted() )
			{
				if( player.GetUser() == null )
				{
					return true;
				}

				if( !player.GetUser().IsGranted( 'command.' + command.GetName() ) )
				{
					player.OutputChatBox( `Access denied to command '${command.GetName()}'` );
				}
			}

			new Promise(
				( resolve, reject ) =>
                {
					resolve( command.Execute( player, argv ) );
                }
			).catch(
				( error ) =>
                {
					player.OutputChatBox( `<span style='color: #FF8800;'>${error}</span>` );
                }
			);

			return true;
		}

		return false;
	}

	protected Remove( commandName : String ) : Boolean
	{
		let bFound = false;

		let iter = 0;

		while( iter < this.Commands.length )
		{
			let command       = this.Commands[ iter ];
			let compareResult = false;

			if( command.IsCaseSensitive() )
			{
				compareResult = command.GetName() === commandName;
			}
			else
			{
				compareResult = command.GetName().toLowerCase() === commandName.toLowerCase();
			}

			if( compareResult )
			{
				this.Commands.splice( iter, 1 );

				bFound = true;
			}
			else
			{
				++iter;
			}
		}

		return bFound;
	}

	protected GetCommand( commandName : String ) : Command.ConsoleCommand
	{
		for( let command of this.Commands )
		{
			if( command.IsCaseSensitive() )
			{
				if( command.GetName() === commandName )
				{
					return command;
				}
			}
			else if( command.GetName().toLowerCase() === commandName.toLowerCase() )
			{
				return command;
			}
		}

		return null;
	}

	protected OnPlayerLine( player : Entity.Player, line : string )
	{
		let commandArgv = line.split( ' ' );
		let commandName = commandArgv.shift();

		let command = this.GetCommand( commandName );
		
		if( !this.Execute( player, commandName, commandArgv ) )
		{
			player.OutputChatBox( `<span style='color: #FF8800;'>${commandName}: command not found</span>` );
		}
	}

	protected OnLine( input : string ) : void
	{
		if( input.length == 0 )
		{
			return;
		}

		let commandArgv = input.split( ' ' );
		let commandName = commandArgv.shift();

		if( !this.Execute( this.console, commandName, commandArgv ) )
		{
			Console.WriteLine( `${Console.FgRed}%s: command not found${Console.Reset}`, commandName );
		}
	}

	protected OnKey( chunk : any, key : any ) : void
	{
		Console.WriteLine( chunk, key );
	}

	protected OnSigint()
	{
		let tick = new Date().getTime();

		if( tick - this.shudownTick < 1000 )
		{
			Console.WriteLine( "\nCtrl-C pressed. Server shutting down!\n" );

			setTimeout( () => this.Server.Shutdown(), 1000 );
		}
		else
		{
			this.shudownTick = tick;

			Console.WriteLine( "To shutdown, press Ctrl-C again" );
		}
	}
}
