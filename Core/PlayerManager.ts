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

import * as Entity      from "../Entity";
import Server           from "../Server";
import ManagerBase      from "./ManagerBase";
import DatabaseManager  from "./DatabaseManager";

export default class PlayerManager extends ManagerBase< Entity.Player >
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
						// Native events
						playerJoin  : ( player )                     => this.OnPlayerJoin ( Entity.Player.FindOrCreate< Entity.Player >( player ) ),
						playerQuit  : ( player, reason, kickReason ) => this.OnPlayerQuit ( Entity.Player.FindOrCreate< Entity.Player >( player ), reason, kickReason ),
						playerDeath : ( player, reason, killer )     => this.OnPlayerDeath( Entity.Player.FindOrCreate< Entity.Player >( player ), reason, killer ),
						playerSpawn : ( player )                     => this.OnPlayerSpawn( Entity.Player.FindOrCreate< Entity.Player >( player ) ),
						playerChat  : ( player, text )               => this.OnPlayerChat ( Entity.Player.FindOrCreate< Entity.Player >( player ), text ),

						// Gamemode events
						playerTryLogin : ( player, login, password ) => this.OnPlayerTryLogin( Entity.Player.FindOrCreate< Entity.Player >( player ), login, password ),
						playerLogin    : ( player, userId )          => this.OnPlayerLogin   ( Entity.Player.FindOrCreate< Entity.Player >( player ), userId ),
						playerLogout   : ( player, userId )          => this.OnPlayerLogout  ( Entity.Player.FindOrCreate< Entity.Player >( player ), userId ),
					}
				);
			}
		).then(
			() =>
			{
				for( let player of mp.players.toArray() )
				{
					this.OnPlayerJoin( Entity.Player.FindOrCreate< Entity.Player >( player ) );
				}
			}
		);
	}

	private OnPlayerJoin( player : Entity.Player ) : void
	{
		this.AddToList( player );

		player.OutputChatBox( "<span style='color: #FF8000;'>Use /login for sign in or /register to sign up</span>" );
	}

	private OnPlayerQuit( player : Entity.Player, reason : string, kickReason : string ) : void
	{
		this.RemoveFromList( player );

		player.Destroy();
	}

	private OnPlayerDeath( player : Entity.Player, reason : string, killer : mp.Player ) : void
	{
		let char = player.GetCharacter();

		if( char )
		{
			char.Spawn( new Vector3( -425.517, 1123.620, 325.8544 ) );
			char.SetDimension( 0 );
		}
	}

	private OnPlayerSpawn( player : Entity.Player )
	{
	}

	private OnPlayerChat( player : Entity.Player, text : string ) : void
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

	private OnPlayerTryLogin( player : Entity.Player, login : string, password : string ) : void
	{
		if( player.GetUser() )
		{
			return player.OutputChatBox( "Вы уже авторизированны" );
		}

		let repository = this.Server.DatabaseManager.GetRepository( Entity.User );

		repository.findOne( { email: login } ).then(
			( user : Entity.User ) =>
			{
				if( user == null )
				{
					return player.OutputChatBox( "Неверный логин или пароль" );
				}

				if( !user.CheckPassword( password ) )
				{
					return player.OutputChatBox( "Неверный логин или пароль" );
				}

				player.Login( user );
			}
		);
	}

	private OnPlayerLogin( player : Entity.Player, userId : number ) : void
	{
		for( let p of this.List.values() )
		{
			if( p != player && p.GetUser().GetID() == userId )
			{
				p.Logout();

				break;
			}
		}

		let repository = this.Server.DatabaseManager.GetRepository( Entity.Character );

		repository.find( { user_id: userId } ).then(
			( characters : Entity.Character[] ) =>
			{
				player.OutputChatBox( "Используйте /char create [name] [lastname] для создания персонажа" );

				if( characters.length != 0 )
				{
					player.OutputChatBox( "Используйте /char login [id] для выбора персонажа" );

					for( let char of characters )
					{
						player.OutputChatBox( `ID: ${char.GetID()}, Name: ${char.GetFullName()}` );
					}
				}
			}
		);
	}

	private OnPlayerLogout( player : Entity.Player, userId : number ) : void
	{
	}
}
