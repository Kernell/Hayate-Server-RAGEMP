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
import * as Entity                from "../Entity";
import { ServiceBase }            from "./ServiceBase";
import { DatabaseService }        from "./DatabaseService";
import { CharacterNameValidator } from "../Security/Validator/CharacterNameValidator";

export class PlayerService extends ServiceBase
{
	private playerExperience : [ { Level : number, Experience : number } ];
	private repository       : ORM.Repository< Entity.Player >      = null;

	private static playersOnline = new Array< Entity.Player >();

	public static GetAll() : Array< Entity.Player >
	{
		return this.playersOnline;
	}
	
	public static GetByID( id : number ) : Entity.Player
	{
		return this.Find( player => player.GetID() == id );
	}

	public static GetByName( name : string ) : Entity.Player
	{
		return this.Find( player => player.GetName() == name );
	}

	public static Find( predicate: ( player : Entity.Player, index : number, obj : Array< Entity.Player > ) => boolean ) : Entity.Player
	{
		return this.playersOnline.find( predicate );
	}

	public static ValidateName( name : string ) : void
	{
		let nameValidator = new CharacterNameValidator();

		nameValidator.Validate( name );
	}

	public async Start() : Promise< any >
	{
		this.playerExperience = require( "../../Config/playerExperience.json" );
		this.repository       = DatabaseService.GetRepository( Entity.Player );
	}

	public async InitPlayer( player : Entity.Player ) : Promise< any >
	{
		let level = 1;
		let exp   = player.GetExperience();

		while( level < this.playerExperience.length && exp >= this.playerExperience[ level ].Experience )
		{
			++level;
		}

		player.SetLevel( level );

		PlayerService.playersOnline.push( player );
	}

	public PlayerEnterWorld( player : Entity.Player ) : void
	{
	}

	public PlayerEndGame( player : Entity.Player ) : void
	{
		player.SetPosition( player.GetPosition() );
		player.SetRotation( player.GetRotation() );
		player.SetDimension( player.GetDimension() );

		this.repository.persist( player );

		PlayerService.playersOnline.remove( player );
	}

	public CreateCharacter( connection : IConnection, name : string ) : void
	{
		let player = new Entity.Player();

		player.SetName( name );

        connection.Account.Players.push( player );

		this.repository.persist( player );
	}

	public PlayerDeath( player : Entity.Player, reason : string, killer : Entity.Player ) : void
	{
		player.Spawn( new Vector3( -425.517, 1123.620, 325.8544 ), new Vector3(), 0 );
	}
}
