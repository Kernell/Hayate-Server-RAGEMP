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

import * as ORM       from "typeorm";

export class UserProvider implements UserProviderInterface
{
	protected repository : ORM.Repository< UserInterface >;

	public constructor( repository : ORM.Repository< UserInterface > )
	{
		this.repository = repository;
	}

	public LoadUserByUsername( name : string ) : Promise< UserInterface >
	{
		return this.repository.findOne( { name: name } );
	}

	public LoadUserByLogin( login : string ) : Promise< UserInterface >
	{
		return this.repository.findOne( { email: login } );
	}

	protected GetRepository()
	{
		return this.repository;
	}
}
