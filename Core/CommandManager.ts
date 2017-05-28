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

import * as Command   from "../Command";
import Console        from "../Entity/Console";
import ManagerBase    from "./ManagerBase";
import Server         from "../Server";

export default class CommandManager extends ManagerBase
{
	private Commands : Array< Command.ConsoleCommand >;

	constructor( server : Server )
	{
		super( server );

		this.Commands = new Array< Command.ConsoleCommand >();

		this.Add( new Command.User( this ) );

		process.stdin.on( "data",     input          => this.OnLine( input.toString().trim() ) );
		process.stdin.on( "keypress", ( chunk, key ) => this.OnKey ( chunk, key ) );

		process.on( 'SIGINT', () => this.OnSigint() );

		mp.events.add( { playerCommand: ( player, line ) => this.OnPlayerLine( player, line ) } );
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

	protected Execute( player : any, commandName : String, argv : any[] ) : Boolean
	{
		let command = this.GetCommand( commandName );

		if( command != null )
		{
			for( let i in argv )
			{
				let int = parseFloat( argv[ i ] );

				argv[ i ] = isNaN( int ) ? argv[ i ] : int;
			}

			command.Execute( player, argv );

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

	protected OnPlayerLine( player : mp.Player, line : string )
	{
		let commandArgv = line.split( ' ' );
		let commandName = commandArgv.shift();

		let command = this.GetCommand( commandName );

		if( !this.Execute( player, commandName, commandArgv ) )
		{
			player.outputChatBox( `${commandName}: command not found` );
		}
	}

	protected OnLine( input : string ) : void
	{
		let player = new Console(); // TEST ONLY!!!

		let commandArgv = input.split( ' ' );
		let commandName = commandArgv.shift();

		let command = this.GetCommand( commandName );

		if( !this.Execute( player, commandName, commandArgv ) )
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
		process.exit();
	}
}
