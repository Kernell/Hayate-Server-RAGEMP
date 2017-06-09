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

type EventCallback = ( ...params : any[] ) => Promise< any >;
type EventType     = { name: string, callback: Function };
type EventsArray   = [ EventType ];

export default class PlayerManager extends ManagerBase< Entity.Player >
{
	private authenticationManager : AuthenticationProviderManager;
	private events : EventsArray;

	constructor( server : Server )
	{
		super( server );

		this.events = [] as EventsArray;
		this.Dependency = server.DatabaseManager;
		this.authenticationManager = null;

		// Native events
		this.RegisterEvent( "playerJoin",     this.OnPlayerJoin );
		this.RegisterEvent( "playerQuit",     this.OnPlayerQuit );
		this.RegisterEvent( "playerDeath",    this.OnPlayerDeath );
		this.RegisterEvent( "playerSpawn",    this.OnPlayerDeath ); 
		this.RegisterEvent( "playerChat",     this.OnPlayerChat );
				
		// Gamemode events
		this.RegisterEvent( "playerTryLogin", this.OnPlayerTryLogin );
		this.RegisterEvent( "playerLogin",    this.OnPlayerLogin );
		this.RegisterEvent( "playerLogout",   this.OnPlayerLogout );
		this.RegisterEvent( "playerRegister", this.OnPlayerRegister );
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
				for( let event of this.events )
				{
					mp.events.add( event.name, event.callback );
				}
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

	private RegisterEvent( event : string, handler: EventCallback )
	{
		let e = { name: event, callback: ( player, ...params : any[] ) => this.EventHandler( event, handler, Entity.Player.FindOrCreate< Entity.Player >( player ), ...params ) };

		this.events.push( e );
	}

	private EventHandler( event : string, handler: EventCallback, source : Entity.Player, ...params : any[] )
	{
		let new_params = [];

		for( let param of params )
		{
			let value = param;

			if( typeof param == "object" && param.type != null )
			{
				let type = param.type[ 0 ].toUpperCase() + param.type.substr( 1, param.type.length );

				value = Entity[ type ].FindOrCreate( param );
			}

			new_params.push( value );
		}

		let promise = handler.call( this, source, ...new_params );

		if( promise != null )
		{
			promise.catch(
				( e : Error ) =>
				{
					source.OutputChatBox( e.message );
				}
			);
		}
	}

	private OnPlayerJoin( player : Entity.Player ) : Promise< any >
	{
		this.AddToList( player );

		player.OutputChatBox( "<span style='color: #FF8000;'>Use /login for sign in or /register to sign up</span>" );

		return null;
	}

	private OnPlayerQuit( player : Entity.Player, reason : string, kickReason : string ) : Promise< any >
	{
		this.RemoveFromList( player );

		player.Destroy();
	
		return null;
	}

	private OnPlayerDeath( player : Entity.Player, reason : string, killer : mp.Player ) : Promise< any >
	{
		let char = player.GetCharacter();

		if( char )
		{
			char.Spawn( new Vector3( -425.517, 1123.620, 325.8544 ) );
			char.SetDimension( 0 );
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

	private OnPlayerTryLogin( player : Entity.Player, login : string, password : string ) : Promise< any >
	{
		if( player.GetUser() )
		{
			throw new Error( "Вы уже авторизованы" );
		}

		let token = new UsernamePasswordToken( login, password );

		return this.authenticationManager.Authenticate( token ).then(
			( token : TokenInterface ) =>
			{
				player.Login( token.GetUser() as Entity.User );
			}
		);
	}

	private OnPlayerLogin( player : Entity.Player, userId : number ) : Promise< any >
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

		return repository.find( { user_id: userId } ).then(
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

	private OnPlayerLogout( player : Entity.Player, userId : number ) : Promise< void >
	{
		return null;
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
