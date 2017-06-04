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

import { Player }       from "../Entity/Player";
import { Console }      from "../Entity/Console";
import Server           from "../Server";
import ManagerBase      from "./ManagerBase";
import DatabaseManager  from "./DatabaseManager";

export default class PlayerManager extends ManagerBase< Player >
{
	constructor( server : Server )
	{
		super( server );

		this.Dependency = server.DatabaseManager;
	}

	public Init() : Promise< any >
	{
		return super.Init().then(
			() =>
			{
				mp.events.add(
					{
						playerJoin  : ( player )                     => this.OnPlayerJoin ( Player.FindOrCreate< Player >( player ) ),
						playerQuit  : ( player, reason, kickReason ) => this.OnPlayerQuit ( Player.FindOrCreate< Player >( player ), reason, kickReason ),
						playerDeath : ( player, reason, killer )     => this.OnPlayerDeath( Player.FindOrCreate< Player >( player ), reason, killer ),
						playerSpawn : ( player )                     => this.OnPlayerSpawn( Player.FindOrCreate< Player >( player ) ),
						playerChat  : ( player, text )               => this.OnPlayerChat ( Player.FindOrCreate< Player >( player ), text ),
					}
				);
			}
		).then(
			() =>
			{
				for( let player of mp.players.toArray() )
				{
					this.OnPlayerJoin( Player.FindOrCreate< Player >( player ) );
				}
			}
		);
	}

	private OnPlayerJoin( player : Player ) : void
	{
		this.AddToList( player );

		player.SetModel( mp.joaat( "player_one" ) );
		player.Spawn( new Vector3( -425.517, 1123.620, 325.8544 ) );
		player.SetDimension( 0 );
	}

	private OnPlayerQuit( player : Player, reason : string, kickReason : string ) : void
	{
		this.RemoveFromList( player );

		player.Destroy();
	}

	private OnPlayerDeath( player : Player, reason : string, killer : mp.Player ) : void
	{
		player.Spawn( new Vector3( -425.517, 1123.620, 325.8544 ) );
		player.SetDimension( 0 );
	}

	private OnPlayerSpawn( player : Player )
	{
	}

	private OnPlayerChat( player : Player, text : string ) : void
	{
		text = text
			.replace( /&/g, "&amp;" )
			.replace( />/g, "&gt;" )
			.replace( /</g, "&lt;" )
			.replace( /"/g, "&quot;" )
			.replace( /'/g, "&#039;" );

		const line = `<span style='color: #E4C1C0;'>[Мир] ${player.GetName()}: ${text}</span>`;

		for( let player of this.GetAll() )
		{
			player.OutputChatBox( line );
		}
	}
}
