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

import * as Config                from "nconf";
import * as ORM                   from "typeorm";
import * as Entity                from "../Entity";
import * as ServerPackets         from "../Network/Packets/Server";
import { ServiceBase }            from "./ServiceBase";
import { DatabaseService }        from "./DatabaseService";
import { PlayerLogic }            from "../Logic/PlayerLogic";

type RespawnPoint = { Position : Vector3, Rotation : Vector3, Dimension : number };

export class PlayerService extends ServiceBase
{
	private playerExperience : [ { Level : number, Experience : number } ];
	private respawnPoints    : RespawnPoint[];
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

	public static async CheckName( name : string ) : Promise< PlayerNameCheckResult >
	{
		if( name.length < 3 )
		{
			return PlayerNameCheckResult.MinimumLengthError;
		}

		if( name.length > 16 )
		{
			return PlayerNameCheckResult.MaximumLengthError;
		}

		name = name.toUpperCase();

		for( let i = 0; i < name.length; ++i )
		{
			if( name[ i ] == ' ' )
			{
				return PlayerNameCheckResult.SpacesInName;
			}
		}

		if( /[^A-ZА-Я0-9]/.test( name ) )
		{
			return PlayerNameCheckResult.UnavaliableLetter;
		}

		if( !/[^0-9]/.test( name ) )
		{
			return PlayerNameCheckResult.UnavaliableLetter;
		}

		if( !/[^A-Z0-9]/.test( name ) == !/[^А-Я0-9]/.test( name ) )
		{
			return PlayerNameCheckResult.MultipleLanguages;
		}

		let count = await DatabaseService.GetRepository( Entity.Player ).count( { name: name } );

		if( count > 0 )
		{
			return PlayerNameCheckResult.NotAcceptableName;
		}

		return PlayerNameCheckResult.Ok;
	}

	public GetExperience( level : number ) : number
	{
		return this.playerExperience[ level - 1 ].Experience;
	}

	public GetExpShown( player : Entity.Player ) : number
    {
		let level = player.GetLevel();
		let exp   = player.GetExperience();

        if( level == this.playerExperience.length - 1 )
		{
            return this.playerExperience[ level ].Experience;
		}

        return exp - this.playerExperience[ level - 1 ].Experience;
    }

    public GetExpNeed( player : Entity.Player ) : number
    {
		let level = player.GetLevel();
		let exp   = player.GetExperience();

        if( level == this.playerExperience.length - 1 )
		{
            return this.playerExperience[ level ].Experience;
		}

        return this.playerExperience[ level ].Experience - this.playerExperience[ level - 1 ].Experience;
    }

	public async Start() : Promise< void >
	{
		this.playerExperience = require( "../../Config/playerExperience.json" );
		this.repository       = DatabaseService.GetRepository( Entity.Player );
		let respawnPoints     = require( "../../Config/respawnPoints.json" );

		this.respawnPoints = [];

		for( let point of respawnPoints )
		{
			let newPoint =
			{
				Position  : new Vector3( point.Position[ 0 ], point.Position[ 1 ], point.Position[ 2 ] ),
				Rotation  : new Vector3( point.Rotation[ 0 ], point.Rotation[ 1 ], point.Rotation[ 2 ] ),
				Dimension : point.Dimension,
			};

			this.respawnPoints.push( newPoint as RespawnPoint );
		}
	}

	public async Stop() : Promise< void >
	{
	}

	public DoPulse() : void
	{
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
		player.Spawn();
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
		player.Connection.Send( new ServerPackets.CharacterDeath() );
	}

	public Resurrect( player : Entity.Player, type : number ) : void
	{
		let respawnPoint = this.GetRespawnPoint( player );

		if( respawnPoint == null )
		{
			return;
		}

		player.Spawn( respawnPoint.Position, respawnPoint.Rotation, respawnPoint.Dimension );
	}

	public GetRespawnPoint( player : Entity.Player ) : RespawnPoint
	{
		let respawnPoint : RespawnPoint = null;

		let position = player.GetPosition();
		let distance = Number.MAX_VALUE;

		for( let point of this.respawnPoints )
		{
			let dist = position.Distance( point.Position );

			if( dist < distance )
			{
				distance     = dist;
				respawnPoint = point;
			}
		}

		return respawnPoint;
	}

	public AddExperience( player : Entity.Player, value : number, npc : Entity.Npc = null ) : void
	{
		if( player.GetLevel() >= Config.get( "gameplay:level_cap" ) )
		{
			return;
		}
        
		this.SetExp( player, player.GetExperience() + value, npc );
	}

	public SetExp( player : Entity.Player, add : number, npc : Entity.Npc ) : void
    {
		let maxLevel = this.playerExperience.length - 1;

		let maxExp = this.playerExperience[ maxLevel - 1 ].Experience;

		let level = 1;

		if( add > maxExp )
		{
			add = maxExp;
		}

		while( ( level + 1 ) != maxLevel && add >= this.playerExperience[ level ].Experience )
		{
			++level;
		}

		let added = add - player.GetExperience();

		if( level != player.GetLevel() )
		{
			player.SetLevel( level );
			player.SetExperience( add );

			PlayerLogic.LevelUp( player );
		}
		else
		{
			player.SetExperience( add );
		}

		player.Connection.Send( new ServerPackets.UpdateExp( player, added, npc ) );
    }
}
