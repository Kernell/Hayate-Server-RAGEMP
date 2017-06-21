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

import * as Entity         from "../../Entity";
import { Server }          from "../../Server";
import { DatabaseService } from "../../Services/DatabaseService";
import * as ServerPacket   from "../../Network/Packets";

import { AdminCommand }    from "./AdminCommand";
import { Interior }        from "./Commands/Interior";
import { Player }          from "./Commands/Player";
import { Vehicle }         from "./Commands/Vehicle";

export class AdminLogic
{
	private shutdown    : boolean = false;
	private shudownTick : number = 0;
	private console     : Console;
	private Commands    : Array< AdminCommand >;

	constructor()
	{
		this.console  = new Console();
		this.Commands = new Array< AdminCommand >();

		process.stdin.on( "data", input => this.ProcessChatMessage( this.console, "/" + input.toString().trim() ) );

		process.on( 'SIGINT', () => this.OnSigint() );
	}

	public async Start() : Promise< any >
	{
		let repository = DatabaseService.GetRepository( Entity.Account );

		let account = await repository.findOneById( 0 );

		if( account == null )
		{
			throw new Error( "root account is undefined" );
		}

		this.console.Account = account;

		this.Add( new Interior () );
		this.Add( new Player   () );
		this.Add( new Vehicle  () );
	}

	protected Add( command : AdminCommand ) : boolean
	{
		if( command == this.GetCommand( command.GetName() ) )
		{
			return false;
		}

		this.Commands.push( command );

		return true;
	}

	public ProcessChatMessage( connection : IConnection, line : string ) : boolean
	{
		if( line.length <= 1 )
		{
			return false;
		}

		if( line[ 0 ] != "/" && line[ 0 ] != "!" )
		{
			return false;
		}

		line = line.substring( 1 );

		let commandArgv = line.split( ' ' );

		if( commandArgv.length == 0 )
		{
			return false;
		}

		let commandName = commandArgv.shift();

		if( !this.Execute( connection, commandName, commandArgv ) )
		{
			connection.Send( new ServerPacket.ChatMessage( `${commandName}: command not found`, ChatType.Notice ) );
		}

		return true;
	}

	protected Execute( connection : IConnection, commandName : string, argv : any[] ) : boolean
	{
		let command = this.GetCommand( commandName );

		if( command != null )
		{
			if( command.IsRestricted() )
			{
				if( connection.Account == null )
				{
					return true;
				}

				if( !connection.Account.IsGranted( 'command.' + command.GetName() ) )
				{
					connection.Send( new ServerPacket.ChatMessage( `Access denied to command '${command.GetName()}'`, ChatType.Notice ) );
				}
			}

			new Promise(
				( resolve, reject ) =>
                {
					resolve( command.Execute( connection, argv ) );
                }
			).catch(
				( error : Error ) =>
                {
					if( error instanceof Exception )
					{
						connection.Send( new ServerPacket.ChatMessage( `${error.message}`, ChatType.Notice ) );
					}
					else
					{
						let msg = "Что-то пошло не так. Мы работаем над тем, чтобы исправить это как можно скорее. Вы сможете попробовать снова спустя какое-то время";

						connection.Send( new ServerPacket.ChatMessage( msg, ChatType.Notice ) );

						Console.WriteLine( Console.FgRed + '%s' + Console.Reset, error.stack );
					}
                }
			);

			return true;
		}

		return false;
	}

	protected Remove( commandName : string ) : boolean
	{
		let command = this.GetCommand( commandName );

		if( command == null )
		{
			return false;
		}

		this.Commands.remove( command );

		return true;
	}

	protected GetCommand( commandName : string ) : AdminCommand
	{
		return this.Commands.find( command => command.GetName() == commandName.toLowerCase() );
	}

	protected OnSigint()
	{
		if( this.shutdown )
		{
			return;
		}

		let tick = new Date().getTime();

		if( tick - this.shudownTick < 1000 )
		{
			this.shutdown = true;

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
