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

const printf = require( "printf" );

class Console extends IdentifiedPool implements PlayerInterface
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

	private user : UserInterface;

	constructor()
	{
		let entity =
		{
			id   : 0,
			type : "console"
		};

		super( entity as mp.Entity );
	}

	public Destroy() : void
	{
		throw new Error();
	}

	public IsValid() : boolean
	{
		return true;
	}

	public GetEntity() : mp.Entity
	{
		return this.entity;
	}

	public GetType() : string
	{
		return this.entity.type;
	}

	public GetModel() : number
	{
		return 0;
	}

	public SetModel() : void
	{
	}

	public GetAlpha() : number
	{
		return 255;
	}

	public SetAlpha( alpha : number ) : void
	{
	}

	public GetCharacter() : CharacterInterface
	{
		return null;
	}

	public SetCharacter( char : CharacterInterface )
	{
	}

	public GetID() : number
	{
		return this.entity.id;
	}
	
	public GetName() : string
	{
		return "Console";
	}
	
	public GetUser() : UserInterface
	{
		return this.user;
	}

	public GetPing() : number
	{
		return 0;
	}

	public GetIP() : string
	{
		return "127.0.0.1";
	}

	public GetPosition() : Vector3
	{
		return new Vector3( 0, 0, 0 );
	}

	public SetPosition( position : Vector3 ) : void
	{
	}

	public GetRotation() : Vector3
	{
		return new Vector3( 0, 0, 0 );
	}

	public SetRotation( rotation : Vector3 ) : void
	{
	}

	public GetDimension() : number
	{
		return 0;
	}

	public SetDimension( dimension : number ) : void
	{
	}

	public OutputChatBox( text : string ) : void
	{
		console.log( text );
	}

	public Login( token : TokenInterface ) : void
	{
		this.user = token.GetUser();
	}

	public Logout() : void
	{
		this.user = null;
	}

	public static Write( buffer : string, ...params : any[] ) : void
	{
		process.stdout.write( printf( buffer, ...params ) );
	}

	public static WriteLine( line : String, ...params : any[] ) : void
	{
		console.log( printf( line, ...params ) );
	}
}

module.exports = Console;
