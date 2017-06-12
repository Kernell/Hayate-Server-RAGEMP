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

import Server     from "../Server";

export class ConsoleCommand
{
	protected Server          : Server;
	protected Name            : String;
	protected Restricted      : Boolean;
	protected CaseSensitive   : Boolean;

	constructor( server : Server )
	{
		this.Server        = server;
		this.Name          = "";
		this.Restricted    = false;
		this.CaseSensitive = true;
	}

	public Execute( player : PlayerInterface, args : string[] ) : Boolean
	{
		let option = args.shift();
		let method = "Option_" + option;

		if( this[ method ] )
		{
			this[ method ]( player, option, args );

			return true;
		}

		player.OutputChatBox( `Invalid option '${option}'` );

		return true;
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
