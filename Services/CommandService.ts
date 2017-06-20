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

import * as Command        from "../Command";
import * as Entity         from "../Entity";
import { Server }          from "../Server";
import { ServiceBase }     from "./ServiceBase";
import { DatabaseService } from "./DatabaseService";

export class CommandService extends ServiceBase
{
	private shudownTick : number = 0;
	private console     : Console;
	private Commands    : Array< Command.ConsoleCommand >;

	constructor()
	{
		super();

		this.console  = new Console();
		this.Commands = new Array< Command.ConsoleCommand >();

		process.stdin.on( "data",     input          => this.OnLine( input.toString().trim() ) );
		process.stdin.on( "keypress", ( chunk, key ) => this.OnKey ( chunk, key ) );

		process.on( 'SIGINT', () => this.OnSigint() );

		mp.events.add(
			{
				playerCommand: ( player, line ) => this.OnPlayerLine( Entity.Player.FindOrCreate< Entity.Player >( player ), line ),
			}
		);
	}

	public async Start() : Promise< any >
	{
		let repository = Server.DatabaseService.GetRepository( Entity.Account );

		let account = await repository.findOneById( 0 );

		if( account == null )
		{
			throw new Error( "root account is undefined" );
		}

		this.console[ 'account' ] = account;

		this.Add( new Command.Interior () );
		this.Add( new Command.Character() );
		this.Add( new Command.Player   () );
		this.Add( new Command.Vehicle  () );
		this.Add( new Command.Login    () );
		this.Add( new Command.Register () );

		return null;
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
				if( player.GetAccount() == null )
				{
					return true;
				}

				if( !player.GetAccount().IsGranted( 'command.' + command.GetName() ) )
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
				( error : Error ) =>
                {
					if( error instanceof Exception )
					{
						player.OutputChatBox( `<span style='color: #FF8800;'>${error.message}</span>` );
					}
					else
					{
						player.OutputChatBox( "<span style='color: #FF8800;'>Что-то пошло не так. Мы работаем над тем, чтобы исправить это как можно скорее. Вы сможете попробовать снова спустя какое-то время</span>" );

						Console.WriteLine( Console.FgRed + '%s' + Console.Reset, error.stack );
					}
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

			setTimeout( () => Server.Shutdown(), 1000 );
		}
		else
		{
			this.shudownTick = tick;

			Console.WriteLine( "To shutdown, press Ctrl-C again" );
		}
	}
}
