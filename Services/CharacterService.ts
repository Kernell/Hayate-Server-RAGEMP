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

import * as ORM                   from "typeorm";
import * as Config                from "nconf";
import * as Entity                from "../Entity";
import { ServiceBase }            from "./ServiceBase";
import { DatabaseService }        from "./DatabaseService";
import { CharacterNameValidator } from "../Security/Validator/CharacterNameValidator";

export class CharacterService extends ServiceBase
{
	private database        : DatabaseService                      = null;
	private nameValidator   : CharacterNameValidator               = null;
	private repository      : ORM.Repository< CharacterInterface > = null;

	public constructor( server : ServerInterface )
	{
		super( server );

		this.database      = server.DatabaseService as DatabaseService;
		this.Dependency    = server.DatabaseService;
		this.nameValidator = new CharacterNameValidator();

		this.RegisterEvent( "playerCharacterCreate", this.OnCreate );
		this.RegisterEvent( "playerCharacterSelect", this.OnSelect );
		this.RegisterEvent( "playerCharacterLogin",  this.OnLogin );
		this.RegisterEvent( "playerCharacterLogout", this.OnLogout );
	}

	public Start() : Promise< any >
	{
		return super.Start().then(
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
				throw new Exception( "Вы не можете создавать больше персонажей" );
			}
		}

		let chars = await this.repository.count( { name: name } );

		if( chars > 0 )
		{
			throw new Exception( "Персонаж с таким именем уже существует" );
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

		Event.Call( "playerCharacterLogin", player, character );

		return null;
	}

	public async OnLogin( player : PlayerInterface, character : CharacterInterface ) : Promise< any >
	{
		return null;
	}

	public async OnLogout( player : PlayerInterface, character : CharacterInterface ) : Promise< any >
	{
		character.SetPosition( character.GetPosition() );
		character.SetRotation( character.GetRotation() );
		character.SetDimension( character.GetDimension() );

		await this.repository.persist( character );

		player.SetCharacter( null );

		return null;
	}
}
