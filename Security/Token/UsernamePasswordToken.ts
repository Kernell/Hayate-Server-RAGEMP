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

export class UsernamePasswordToken implements TokenInterface
{
	protected user          : UserInterface|string;
	protected credentials   : string;
    protected authenticated : boolean = false;

	public constructor( user : UserInterface|string, credentials : string )
	{
		this.SetUser( user );

		this.credentials = credentials;
	}

	public GetUser() : UserInterface
	{
		return this.user as UserInterface;
	}

	public SetUser( user : UserInterface|string ) : void
	{
		this.user = user;
	}

	public GetUsername() : string
	{
		if( typeof this.user == "string" )
		{
			return this.user;
		}

		return this.user.GetName();
	}

	public IsAuthenticated() : boolean
	{
		return this.authenticated;
	}

	public SetAuthenticated( authenticated : boolean ) : void
    {
        this.authenticated = authenticated;
    }

	public GetCredentials() : string
    {
        return this.credentials;
    }

	public RemoveCredentials() : void
    {
        this.credentials = null;
    }
}
