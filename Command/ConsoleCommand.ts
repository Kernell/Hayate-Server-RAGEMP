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

import CommandManager from "../Core/CommandManager";
import Player from "../Entity/Player";

export class ConsoleCommand
{
	protected Manager         : CommandManager;
	protected Name            : String;
	protected Restricted      : Boolean;
	protected CaseSensitive   : Boolean;

	constructor( manager : CommandManager )
	{
		this.Manager       = manager;
		this.Name          = "";
		this.Restricted    = false;
		this.CaseSensitive = true;
	}

	public Execute( player : Player, args : any[] ) : Boolean
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
