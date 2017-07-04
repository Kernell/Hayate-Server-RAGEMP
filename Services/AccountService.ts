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
import * as Entity         from "Entity";
import * as Network        from "Network";
import { PlayerLogic }     from "Logic/PlayerLogic";
import { PlayerService }   from "Services/PlayerService";
import { ServiceBase }     from "Services/ServiceBase";
import { DatabaseService } from "Services/DatabaseService";

import { AuthenticationProvider } from "Security/Authentication/AuthenticationProvider";
import { UsernamePasswordToken }  from "Security/Token/UsernamePasswordToken";
import { UserEmailValidator }     from "Security/Validator/UserEmailValidator";
import { UserNameValidator }      from "Security/Validator/UserNameValidator";
import { UserPasswordValidator }  from "Security/Validator/UserPasswordValidator";

export class AccountService extends ServiceBase implements AccountManagerInterface
{
	private roles                  : Entity.AccountRole[];

	private database               : DatabaseService                      = null;
	private repository             : ORM.Repository< Entity.Account >     = null;
	private repositoryRole         : ORM.Repository< Entity.AccountRole > = null;
	private repositoryAuth         : ORM.Repository< Entity.AccountAuth > = null;
	private authenticationProvider : AuthenticationProvider               = null;

	public constructor()
	{
		super();

		this.roles = [];
	}

	public async Start() : Promise< void >
	{
		this.repository     = DatabaseService.GetRepository( Entity.Account );
		this.repositoryRole = DatabaseService.GetRepository( Entity.AccountRole );
		this.repositoryAuth = DatabaseService.GetRepository( Entity.AccountAuth );

		this.authenticationProvider = new AuthenticationProvider( this );

		this.roles = await this.repositoryRole.find();
	}

	public async Stop() : Promise< void >
	{
	}

	public DoPulse() : void
	{
	}

	public LoadByUsername( name : string ) : Promise< AccountInterface >
	{
		return this.repository.findOne( { name: name } );
	}

	public LoadByLogin( login : string ) : Promise< AccountInterface >
	{
		return this.repository.findOne( { email: login } );
	}

	public async TryAuthorize( connection : IConnection, accountName : string, password : string ) : Promise< any >
	{
		if( connection.Account != null )
		{
			throw new Exception( "Вы уже авторизованы" );
		}

		let token = new UsernamePasswordToken( accountName, password, connection.GetIP(), "N/A" );

		return this.Authorize( token ).then(
			( account : Entity.Account ) =>
			{
				account[ '_roles' ].forEach( roleId => this.roles[ roleId ] && account.AddRole( this.roles[ roleId ] ) );

				this.Authorized( connection, account );

				let auth = new Entity.AccountAuth();

				auth.SetAccount( account );
				auth.SetDeviceID( token.GetDeviceID() );
				auth.SetIP( token.GetIP() );
				auth.SetToken( token.GetGUID().toString() );

				return this.repositoryAuth.persist( auth );
			}
		);
	}

	private async Authorize( token : TokenInterface ) : Promise< AccountInterface >
	{
        let authorizedToken : TokenInterface = null;

		try
		{
			authorizedToken = await this.authenticationProvider.Authenticate( token );
		}
		catch( e )
		{
			throw new Exception( e );
		}

        return authorizedToken.GetAccount();
	}

	private async Authorized( connection : IConnection, account : AccountInterface ) : Promise< any >
	{
		let player = PlayerService.Find( player => player == connection.Player || player.GetAccount().GetID() == account.GetID() );

		if( player != null )
		{
			player.Connection.Close();
		}

		connection.Account         = account;
		connection.Account.Players = await DatabaseService.GetRepository( Entity.Player ).find();

		connection.Send( new Network.Packets.Server.AuthComplete() );
	}

	public static ExitPlayer( connection : IConnection ) : void
    {
		PlayerLogic.PlayerEndGame( connection, connection.Player as Entity.Player );
    }

	public static ClientDisconnected( connection : IConnection ) : void
	{
		PlayerLogic.PlayerEndGame( connection, connection.Player as Entity.Player );
	}

	public async Register( connection : IConnection, name : string, email : string, password : string ) : Promise< any >
	{
		if( connection.Account != null )
		{
			throw new Exception( "Вы уже авторизованы" );
		}

		let validatorEmail = new UserEmailValidator();
		let validatorName  = new UserNameValidator();
		let validatorPassw = new UserPasswordValidator();

		validatorName.Validate( name );
		validatorEmail.Validate( email );
		validatorPassw.Validate( password );

		let countEmail = await this.repository.count( { email: email } );

		if( countEmail != 0 )
		{
			throw new Exception( "Пользователь с этим email уже существует" );
		}
						
		let countName  = await this.repository.count( { name: name } );

		if( countName != 0 )
		{
			throw new Exception( "Этот имя пользователя уже занято, попробуйте другое" );
		}

		let account = new Entity.Account();

		account.SetName( name );
		account.SetEmail( email );
		account.SetPassword( password );

		return this.repository.persist( account );
	}
}
