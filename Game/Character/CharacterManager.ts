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

import * as ORM         from "typeorm";
import Server           from "../../Server";
import ManagerBase      from "../../Core/ManagerBase";
import DatabaseManager  from "../../Core/DatabaseManager";
import * as Entity      from "../../Entity";

import { CharacterNameValidator } from "../../Security/Validator/CharacterNameValidator";

export class CharacterManager extends ManagerBase< Entity.Entity >
{
	protected nameValidator : CharacterNameValidator;
	protected repository : ORM.Repository< CharacterInterface >;

	public constructor( server : Server )
	{
		super( server );

		this.Dependency    = server.DatabaseManager;
		this.repository    = null;
		this.nameValidator = new CharacterNameValidator();

		this.RegisterEvent( "playerCharacterCreate", this.OnCreate );
		this.RegisterEvent( "playerCharacterSelect", this.OnSelect );
		this.RegisterEvent( "playerCharacterLogin",  this.OnLogin );
		this.RegisterEvent( "playerCharacterLogout", this.OnLogout );
	}

	public Init() : Promise< any >
	{
		return super.Init().then(
			() =>
			{
				this.repository = ( this.Dependency as DatabaseManager ).GetRepository( Entity.Character );
			}
		);
	}

	protected GetRepository() : ORM.Repository< CharacterInterface >
	{
		return this.repository;
	}

	public async OnCreate( player : PlayerInterface, name : string ) : Promise< any >
	{
		this.nameValidator.Validate( name );

		let chars = await this.repository.count( { name: name } );

		if( chars > 0 )
		{
			throw new Error( "Персонаж с таким именем уже существует" );
		}

		Console.WriteLine( "Created character, ID: %d, Name %q", 0, name );

		return null;
	}

	public async OnSelect( player : PlayerInterface, characterId : number ) : Promise< any >
	{
		return null;
	}

	public async OnLogin( player : PlayerInterface, characterId : number ) : Promise< any >
	{
		return null;
	}

	public async OnLogout( player : PlayerInterface ) : Promise< any >
	{
		return null;
	}
}
