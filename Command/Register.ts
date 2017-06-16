﻿/*********************************************************
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

import { ConsoleCommand } from "./ConsoleCommand";

export class Register extends ConsoleCommand
{
	constructor( server : ServerInterface )
	{
		super( server );

		this.Name = "register";
	}

	public Execute( player : PlayerInterface, args : any[] ) : Boolean
	{
		if( args.length < 3 )
		{
			throw new Error( "Syntax: /register [name] [email] [password]" );
		}

		let name     = args.shift();
		let email    = args.shift();
		let password = args.shift();

		Event.Call( "playerRegister", player, name, email, password );

		return true;
	}
}
