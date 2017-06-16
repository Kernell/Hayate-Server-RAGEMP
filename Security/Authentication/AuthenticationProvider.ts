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

import { UserPasswordEncoder }   from "../Encoders/UserPasswordEncoder";
import { UserEmailValidator }    from "../Validator/UserEmailValidator";
import { UserNameValidator }     from "../Validator/UserNameValidator";
import { UserPasswordValidator } from "../Validator/UserPasswordValidator";
import { UsernamePasswordToken } from "../Token/UsernamePasswordToken";

export class AuthenticationProvider implements AuthenticationProviderInterface
{
	protected encoder      : UserPasswordEncoder;
	protected userProvider : UserManagerInterface;

	public constructor( userProvider : UserManagerInterface )
	{
		this.userProvider = userProvider;
		this.encoder      = new UserPasswordEncoder();
	}

	public async Authenticate( token : TokenInterface ) : Promise< TokenInterface >
	{
		let username = token.GetUsername();

		let user = await this.RetrieveUser( username, token );

		if( user == null )
		{
			throw new Error( "User not found" );
		}

		if( this.CheckAuthentication( user, token ) )
		{
			let authenticatedToken = new UsernamePasswordToken( user, token.GetCredentials(), ( token as UsernamePasswordToken ).GetIP(), ( token as UsernamePasswordToken ).GetDeviceID() );

			authenticatedToken.SetAuthenticated( true );

			return authenticatedToken;
		}

		throw new Error( "Invalid login or password" );
	}

	public async RetrieveUser( username : string, token : TokenInterface ) : Promise< UserInterface >
	{
		let user = token.GetUser();

		if( typeof user != "object" )
		{
			user = await this.userProvider.LoadByUsername( username );
		}

		if( typeof user != "object" )
		{
			user = await this.userProvider.LoadByLogin( username );
		}

		return user;
	}

	protected CheckAuthentication( user : UserInterface, token : TokenInterface ) : boolean
	{
		let username = token.GetUsername();
		let password = token.GetCredentials();

		if( password == '' )
		{
            throw new Error( 'The presented password must not be empty' );
        }

		return this.encoder.IsPasswordValid( user.GetPassword(), password, user.GetSalt() );
	}

	public Supports( token : TokenInterface ) : boolean
	{
		return true;
	}

    public OnAuthenticationSuccess( token : TokenInterface, providerKey : string ) : void
    {
    }

    public OnAuthenticationFailure( exception : Error ) : void
    {
    }
}
