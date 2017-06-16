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
import * as Config      from "nconf";
import Server           from "../../Server";
import ManagerBase      from "../../Core/ManagerBase";
import DatabaseManager  from "../../Core/DatabaseManager";
import * as Entity      from "../../Entity";

import { CharacterNameValidator } from "../../Security/Validator/CharacterNameValidator";

export class CharacterManager extends ManagerBase< Entity.Entity >
{
	private database        : DatabaseManager                      = null;
	private nameValidator   : CharacterNameValidator               = null;
	private repository      : ORM.Repository< CharacterInterface > = null;

	public constructor( server : ServerInterface )
	{
		super( server );

		this.database      = server.DatabaseManager as DatabaseManager;
		this.Dependency    = server.DatabaseManager;
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
				this.repository = this.database.GetRepository( Entity.Character );
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

		let user = player.GetUser();

		if( !user.IsGranted( Permission.UnlimitedCharacters ) )
		{
			let chars = await this.repository.count( { user_id: user.GetID() } );

			if( chars > Config.get( "characters:max_per_user" ) )
			{
				throw new Error( "Вы не можете создавать больше персонажей" );
			}
		}

		let chars = await this.repository.count( { name: name } );

		if( chars > 0 )
		{
			throw new Error( "Персонаж с таким именем уже существует" );
		}

		let char = new Entity.Character( player );

		char.SetUser( user );
		char.SetName( name );

		return this.repository.persist( char ).then( char => this.OnSelect( player, char ) );
	}

	public async OnSelect( player : PlayerInterface, character : CharacterInterface ) : Promise< any >
	{
		if( typeof character == "number" )
		{
			character = await this.repository.findOneById( character );

			character.SetPlayer( player );
		}

		player.SetCharacter( character );

		character.Spawn();

		Event.Call( "playerCharacterLogin", player.GetEntity(), character.GetID() );

		return null;
	}

	public async OnLogin( player : PlayerInterface, character : CharacterInterface ) : Promise< any >
	{
		return null;
	}

	public async OnLogout( player : PlayerInterface, character : CharacterInterface ) : Promise< any >
	{
		character.SetPosition( player.GetPosition() );
		character.SetRotation( player.GetRotation() );
		character.SetDimension( player.GetDimension() );

		this.repository.persist( character );

		player.SetCharacter( null );

		return null;
	}
}
