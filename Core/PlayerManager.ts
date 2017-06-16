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

import * as Entity                       from "../Entity";
import ManagerBase                       from "./ManagerBase";
import DatabaseManager                   from "./DatabaseManager";

export default class PlayerManager extends ManagerBase< Entity.Player >
{
	constructor( server : ServerInterface )
	{
		super( server );

		this.Dependency = server.UserManager;

		this.RegisterEvent( "playerJoin",     this.OnPlayerJoin );
		this.RegisterEvent( "playerQuit",     this.OnPlayerQuit );
		this.RegisterEvent( "playerDeath",    this.OnPlayerDeath );
		this.RegisterEvent( "playerSpawn",    this.OnPlayerSpawn ); 
		this.RegisterEvent( "playerChat",     this.OnPlayerChat );
	}

	public Init() : Promise< any >
	{
		return super.Init().then(
			() =>
			{
				for( let player of mp.players.toArray() )
				{
					this.OnPlayerJoin( Entity.Player.FindOrCreate< Entity.Player >( player ) );
				}
			}
		);
	}

	private OnPlayerJoin( player : Entity.Player ) : Promise< any >
	{
		this.AddToList( player );

		player.OutputChatBox( "<span style='color: #FF8000;'>Use /login for sign in or /register to sign up</span>" );

		return null;
	}

	private OnPlayerQuit( player : Entity.Player, reason : string, kickReason : string ) : Promise< any >
	{
		mp.events.call( "playerCharacterLogout", player.GetEntity() );

		this.RemoveFromList( player );

		player.Destroy();
	
		return null;
	}

	private OnPlayerDeath( player : Entity.Player, reason : string, killer : Entity.Player ) : Promise< any >
	{
		const char = player.GetCharacter();

		if( char )
		{
			char.Spawn( new Vector3( -425.517, 1123.620, 325.8544 ), new Vector3(), 0 );
		}

		return null;
	}

	private OnPlayerSpawn( player : Entity.Player ) : Promise< any >
	{
		return null;
	}

	private OnPlayerChat( player : Entity.Player, text : string ) : Promise< any >
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

		return null;
	}
}
