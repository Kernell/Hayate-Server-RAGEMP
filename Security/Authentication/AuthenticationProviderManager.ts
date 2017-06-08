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

export class AuthenticationProviderManager implements AuthenticationManagerInterface
{
	private providers         : [ AuthenticationProviderInterface ];
	private removeCredentials : boolean;

	public constructor( providers : [ AuthenticationProviderInterface ], removeCredentials : boolean = true )
    {
        this.providers         = providers;
        this.removeCredentials = removeCredentials;
    }

	public async Authenticate( token : TokenInterface ) : Promise< TokenInterface >
	{
		let lastException = null;
        let result : TokenInterface = null;

        for( let provider of this.providers )
		{
			if( !provider.Supports( token ) )
			{
				continue;
			}

			try
			{
				result = await provider.Authenticate( token );

				if( result != null )
				{
					break;
				}
			}
			catch( e )
			{
				lastException = e;
			}
		}

		if( result != null )
		{
            if( this.removeCredentials )
			{
                result.RemoveCredentials();
            }

            return result;
        }

		if( lastException == null )
		{
			lastException = new Error( "No Authentication Provider found for token of class " + token.constructor.name );
		}

		throw lastException;
	}
}
