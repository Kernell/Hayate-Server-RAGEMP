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
import { Player } from "../Entity/Player";

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

	public Execute( player : Player, args : string[] ) : Boolean
	{
		return false;
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
