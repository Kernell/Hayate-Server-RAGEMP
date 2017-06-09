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
import Server                            from "../Server";
import ManagerBase                       from "./ManagerBase";
import DatabaseManager                   from "./DatabaseManager";
import { UserProvider }                  from "../Security/User/UserProvider";
import { AuthenticationProviderManager } from "../Security/Authentication/AuthenticationProviderManager";
import { AuthenticationProvider }        from "../Security/Authentication/AuthenticationProvider";
import { UsernamePasswordToken }         from "../Security/Token/UsernamePasswordToken";
import { UserEmailValidator }            from "../Security/Validator/UserEmailValidator";
import { UserNameValidator }             from "../Security/Validator/UserNameValidator";
import { UserPasswordValidator }         from "../Security/Validator/UserPasswordValidator";

export default class PlayerManager extends ManagerBase< Entity.Player >
{
	private authenticationManager : AuthenticationProviderManager;

	constructor( server : Server )
	{
		super( server );

		this.Dependency = server.DatabaseManager;
		this.authenticationManager = null;
	}

	public Init() : Promise< any >
	{
		return super.Init().then(
			() =>
			{
				let repository   = this.Server.DatabaseManager.GetRepository( Entity.User );
				let userProvider = new UserProvider( repository );

				this.authenticationManager = new AuthenticationProviderManager( [ new AuthenticationProvider( userProvider ) ], true );
			}
		).then(
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

						playerRegister : ( player, name, login, password ) => this.OnPlayerRegister( Entity.Player.FindOrCreate< Entity.Player >( player ), name, login, password ),
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
			return player.OutputChatBox( "Вы уже авторизованы" );
		}

		let token = new UsernamePasswordToken( login, password );

		this.authenticationManager.Authenticate( token ).then(
			( token : TokenInterface ) =>
			{
				player.Login( token.GetUser() as Entity.User );
			}
		).catch(
			( error : Error ) =>
			{
				return player.OutputChatBox( error.message );
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

	private async OnPlayerRegister( player : Entity.Player, name : string, email : string, password : string ) : Promise< void >
	{
		if( player.GetUser() )
		{
			return player.OutputChatBox( "Вы уже авторизованы" );
		}

		let validatorEmail = new UserEmailValidator();
		let validatorName  = new UserNameValidator();
		let validatorPassw = new UserPasswordValidator();

		try
		{
			validatorName.Validate( name );
			validatorEmail.Validate( email );
			validatorPassw.Validate( password );
		}
		catch( e )
		{
			return player.OutputChatBox( e );
		}

		let repository = this.Server.DatabaseManager.GetRepository( Entity.User );

		let countEmail = await repository.count( { email: email } );

		if( countEmail != 0 )
		{
			return player.OutputChatBox( "Пользователь с этим email уже существует" );
		}
						
		let countName  = await repository.count( { name: name } );

		if( countName != 0 )
		{
			return player.OutputChatBox( "Этот имя пользователя уже занято, попробуйте другое" );
		}

		let user = new Entity.User();

		user.SetName( name );
		user.SetEmail( email );
		user.SetPassword( password );

		return repository.persist( user ).then(
			( user ) =>
			{
				player.Login( user );
			}
		).catch(
			( error : Error ) =>
			{
				console.log( error.stack );

				player.OutputChatBox( "Произошла ошибка базы данных" );
			}
		);
	}
}
