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

export class ConsoleCommand
{
	protected Server          : ServerInterface;
	protected Name            : String;
	protected Restricted      : Boolean;
	protected CaseSensitive   : Boolean;

	constructor( server : ServerInterface )
	{
		this.Server        = server;
		this.Name          = "";
		this.Restricted    = false;
		this.CaseSensitive = true;
	}

	public Execute( player : PlayerInterface, args : string[] ) : Promise< any >
	{
		let option = args.shift();
		let method = "Option_" + option;

		if( this[ method ] )
		{
			if( this.Restricted && method != null && !player.GetUser().IsGranted( 'command.' + this.Name + '.' + option ) )
			{
				throw new Error( `Access denied to command '${this.Name} ${option}'` );
			}

			return this[ method ]( player, option, args );
		}

		throw new Error( `Invalid option '${option}'` );
	}

	public GetName() : String
	{
		return this.Name;
	}

	public Info() : String|null
	{
		return null;
	}

	public IsRestricted() : Boolean
	{
		return this.Restricted;
	}

	public IsCaseSensitive() : Boolean
	{
		return this.CaseSensitive;
	}
}
