﻿/*********************************************************
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
import * as Entity      from "../../Entity";
import ManagerBase      from "../../Core/ManagerBase";
import DatabaseManager  from "../../Core/DatabaseManager";

import { AuthenticationProviderManager } from "../Authentication/AuthenticationProviderManager";
import { AuthenticationProvider }        from "../Authentication/AuthenticationProvider";
import { UsernamePasswordToken }         from "../Token/UsernamePasswordToken";
import { UserEmailValidator }            from "../Validator/UserEmailValidator";
import { UserNameValidator }             from "../Validator/UserNameValidator";
import { UserPasswordValidator }         from "../Validator/UserPasswordValidator";

export default class UserManager extends ManagerBase< any > implements UserManagerInterface
{
	private roles                 : Entity.UserRole[];

	private database              : DatabaseManager                   = null;
	private repository            : ORM.Repository< UserInterface >   = null;
	private repositoryRole        : ORM.Repository< Entity.UserRole > = null;
	private authenticationManager : AuthenticationProviderManager     = null;

	public constructor( server : ServerInterface )
	{
		super( server );

		this.roles      = [];

		this.database   = server.DatabaseManager as DatabaseManager;
		this.Dependency = server.DatabaseManager;

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
				this.repository     = this.database.GetRepository( Entity.User );
				this.repositoryRole = this.database.GetRepository( Entity.UserRole );

				this.authenticationManager = new AuthenticationProviderManager( [ new AuthenticationProvider( this ) ], true );

				return this.repositoryRole.find().then( roles => this.roles = roles );
			}
		);
	}

	public LoadByUsername( name : string ) : Promise< UserInterface >
	{
		return this.repository.findOne( { name: name } );
	}

	public LoadByLogin( login : string ) : Promise< UserInterface >
	{
		return this.repository.findOne( { email: login } );
	}

	private async OnPlayerTryLogin( player : PlayerInterface, login : string, password : string ) : Promise< any >
	{
		if( player.GetUser() )
		{
			throw new Error( "Вы уже авторизованы" );
		}

		let token = new UsernamePasswordToken( login, password, player.GetIP(), "N/A" );

		return this.authenticationManager.Authenticate( token ).then(
			( token : UsernamePasswordToken ) =>
			{
				player.Login( token );

				let user = token.GetUser();

				user[ '_roles' ].map( roleId => this.roles[ roleId ] && user.AddRole( this.roles[ roleId ] ) );

				let repositoryAuth = this.database.GetRepository( Entity.UserAuth );

				return repositoryAuth.persist( user[ 'tokens' ][ 0 ] );
			}
		);
	}

	private async OnPlayerLogin( player : PlayerInterface, user : UserInterface ) : Promise< any >
	{
		let userId = user.GetID();

		for( let p of this.List.values() )
		{
			if( p != player && p.GetUser().GetID() == userId )
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

	private async OnPlayerLogout( player : PlayerInterface, user : UserInterface ) : Promise< any >
	{
		return null;
	}

	private async OnPlayerRegister( player : PlayerInterface, name : string, email : string, password : string ) : Promise< any >
	{
		if( player.GetUser() )
		{
			throw new Error( "Вы уже авторизованы" );
		}

		let validatorEmail = new UserEmailValidator();
		let validatorName  = new UserNameValidator();
		let validatorPassw = new UserPasswordValidator();

		validatorName.Validate( name );
		validatorEmail.Validate( email );
		validatorPassw.Validate( password );

		let repository = this.database.GetRepository( Entity.User );

		let countEmail = await repository.count( { email: email } );

		if( countEmail != 0 )
		{
			throw new Error( "Пользователь с этим email уже существует" );
		}
						
		let countName  = await repository.count( { name: name } );

		if( countName != 0 )
		{
			throw new Error( "Этот имя пользователя уже занято, попробуйте другое" );
		}

		let user = new Entity.User();

		user.SetName( name );
		user.SetEmail( email );
		user.SetPassword( password );

		return repository.persist( user ).then(
			( user : UserInterface ) =>
			{
				return this.OnPlayerTryLogin( player, email, password );
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
