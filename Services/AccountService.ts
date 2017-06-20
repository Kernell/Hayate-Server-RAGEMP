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

import * as ORM            from "typeorm";
import * as Entity         from "../Entity";
import { Server }          from "../Server";
import { PlayerService }   from "./PlayerService";
import { ServiceBase }     from "./ServiceBase";
import { DatabaseService } from "./DatabaseService";

import { AuthenticationProviderManager } from "../Security/Authentication/AuthenticationProviderManager";
import { AuthenticationProvider }        from "../Security/Authentication/AuthenticationProvider";
import { UsernamePasswordToken }         from "../Security/Token/UsernamePasswordToken";
import { UserEmailValidator }            from "../Security/Validator/UserEmailValidator";
import { UserNameValidator }             from "../Security/Validator/UserNameValidator";
import { UserPasswordValidator }         from "../Security/Validator/UserPasswordValidator";

export class AccountService extends ServiceBase implements AccountManagerInterface
{
	private roles                 : Entity.AccountRole[];

	private database              : DatabaseService                   = null;
	private repository            : ORM.Repository< AccountInterface >   = null;
	private repositoryRole        : ORM.Repository< Entity.AccountRole > = null;
	private authenticationManager : AuthenticationProviderManager     = null;

	public constructor()
	{
		super();

		this.roles      = [];

		this.database   = Server.DatabaseService as DatabaseService;

		this.RegisterEvent( "playerTryLogin", this.OnPlayerTryLogin );
		this.RegisterEvent( "playerLogin",    this.OnPlayerLogin );
		this.RegisterEvent( "playerLogout",   this.OnPlayerLogout );
		this.RegisterEvent( "playerRegister", this.OnPlayerRegister );
	}

	public async Start() : Promise< any >
	{
		this.repository     = this.database.GetRepository( Entity.Account );
		this.repositoryRole = this.database.GetRepository( Entity.AccountRole );

		this.authenticationManager = new AuthenticationProviderManager( [ new AuthenticationProvider( this ) ], true );

		return this.repositoryRole.find().then( roles => this.roles = roles );
	}

	public LoadByUsername( name : string ) : Promise< AccountInterface >
	{
		return this.repository.findOne( { name: name } );
	}

	public LoadByLogin( login : string ) : Promise< AccountInterface >
	{
		return this.repository.findOne( { email: login } );
	}

	private async OnPlayerTryLogin( player : PlayerInterface, login : string, password : string ) : Promise< any >
	{
		if( player.GetAccount() )
		{
			throw new Exception( "Вы уже авторизованы" );
		}

		let token = new UsernamePasswordToken( login, password, player.GetIP(), "N/A" );

		return this.authenticationManager.Authenticate( token ).then(
			( token : UsernamePasswordToken ) =>
			{
				player.Login( token );

				let user = token.GetAccount();

				user[ '_roles' ].map( roleId => this.roles[ roleId ] && user.AddRole( this.roles[ roleId ] ) );

				let repositoryAuth = this.database.GetRepository( Entity.AccountAuth );

				return repositoryAuth.persist( user[ 'tokens' ][ 0 ] );
			}
		);
	}

	private async OnPlayerLogin( player : PlayerInterface, user : AccountInterface ) : Promise< any >
	{
		let userId = user.GetID();

		for( let p of PlayerService.PlayersOnline )
		{
			if( p != player && p.GetAccount().GetID() == userId )
			{
				p.Logout();

				break;
			}
		}

		let repository = this.database.GetRepository( Entity.Character );

		return repository.find( { user_id: userId } ).then(
			( characters : Entity.Character[] ) =>
			{
				player.OutputChatBox( "Используйте /char create [name] для создания персонажа" );

				if( characters.length != 0 )
				{
					player.OutputChatBox( "Используйте /char login [id] для выбора персонажа" );

					for( let char of characters )
					{
						player.OutputChatBox( `ID: ${char.GetID()}, Name: ${char.GetName()}` );
					}
				}
			}
		);
	}

	private async OnPlayerLogout( player : PlayerInterface, user : AccountInterface ) : Promise< any >
	{
		return null;
	}

	private async OnPlayerRegister( player : PlayerInterface, name : string, email : string, password : string ) : Promise< any >
	{
		if( player.GetAccount() )
		{
			throw new Exception( "Вы уже авторизованы" );
		}

		let validatorEmail = new UserEmailValidator();
		let validatorName  = new UserNameValidator();
		let validatorPassw = new UserPasswordValidator();

		validatorName.Validate( name );
		validatorEmail.Validate( email );
		validatorPassw.Validate( password );

		let repository = this.database.GetRepository( Entity.Account );

		let countEmail = await repository.count( { email: email } );

		if( countEmail != 0 )
		{
			throw new Exception( "Пользователь с этим email уже существует" );
		}
						
		let countName  = await repository.count( { name: name } );

		if( countName != 0 )
		{
			throw new Exception( "Этот имя пользователя уже занято, попробуйте другое" );
		}

		let user = new Entity.Account();

		user.SetName( name );
		user.SetEmail( email );
		user.SetPassword( password );

		return repository.persist( user ).then(
			( user : AccountInterface ) =>
			{
				return this.OnPlayerTryLogin( player, email, password );
			}
		);
	}
}
