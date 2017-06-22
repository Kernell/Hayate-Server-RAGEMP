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

class Console implements IConnection
{
	public static Reset      = "\x1b[0m";
	
	public static Bright     = "\x1b[1m";
	public static Dim        = "\x1b[2m";
	public static Underscore = "\x1b[4m";
	public static Blink      = "\x1b[5m";
	public static Reverse    = "\x1b[7m";
	public static Hidden     = "\x1b[8m";

	public static FgBlack    = "\x1b[30m";
	public static FgRed      = "\x1b[31m";
	public static FgGreen    = "\x1b[32m";
	public static FgYellow   = "\x1b[33m";
	public static FgBlue     = "\x1b[34m";
	public static FgMagenta  = "\x1b[35m";
	public static FgCyan     = "\x1b[36m";
	public static FgWhite    = "\x1b[37m";

	public static BgBlack    = "\x1b[40m";
	public static BgRed      = "\x1b[41m";
	public static BgGreen    = "\x1b[42m";
	public static BgYellow   = "\x1b[43m";
	public static BgBlue     = "\x1b[44m";
	public static BgMagenta  = "\x1b[45m";
	public static BgCyan     = "\x1b[46m";
	public static BgWhite    = "\x1b[47m";

	private _account : AccountInterface;
	private _player  : PlayerInterface;

	public get Account() : AccountInterface
	{
		return this._account;
	}

	public set Account( account : AccountInterface )
	{
		this._account = account;
		this._account.Connection = this;
	}

	public get Player() : PlayerInterface
	{
		return this._player;
	}

	public set Player( player : PlayerInterface )
	{
		this._player = player;
		this._player.Connection = this;

		player[ "entity" ] = this.client;
	}

	protected client : IServerClient;

	public Close() : void
	{
	}

	public Send( packet : IServerPacket ) : void
	{
		if( packet.constructor.name == "ChatMessage" )
		{
			let p = packet.ToJSON();

			let color = () =>
			{
				switch( p.type )
				{
					case ChatType.Notice: return Console.FgRed;
					default: '';
				}
			}

			Console.WriteLine( `${color()}%s${Console.Reset}`, p.message );
		}
	}

	public Invoke( hash : string, ...args : any[] ) : void
	{
	}

	public CallEvent( eventName : string, ...args : any[] ) : void
	{
	}

	public Notify( message : string ) : void
	{
	}

	public Ping() : number
	{
		return 0;
	}

	public GetIP() : string
	{
		return "127.0.0.1";
	}

	public static Write( buffer : string, ...params : any[] ) : void
	{
		process.stdout.write( printf( buffer, ...params ) );
	}

	public static WriteLine( line : String, ...params : any[] ) : void
	{
		console.log( printf( line + Console.Reset, ...params ) );
	}
}

module.exports = Console;
