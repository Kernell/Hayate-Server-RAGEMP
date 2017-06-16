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
	protected guid          : GUID;
	protected ip            : string;
	protected deviceId      : string;
    protected authenticated : boolean = false;

	public constructor( token : UsernamePasswordToken );
	public constructor( user : UserInterface|string, credentials : string, ip : string, deviceId : string );

	public constructor( user : UsernamePasswordToken|UserInterface|string, credentials ?: string, ip ?: string, deviceId ?: string )
	{
		if( user instanceof UsernamePasswordToken )
		{
			let token = user;

			user        = token.user;
			ip          = token.ip;
			deviceId    = token.deviceId;
			credentials = token.credentials;
		}

		this.SetUser( user );

		this.guid        = new GUID();
		this.ip          = ip;
		this.deviceId    = deviceId;
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

	public GetGUID() : GUID
	{
		return this.guid;
	}

	public GetIP() : string
	{
		return this.ip;
	}

	public GetDeviceID() : string
	{
		return this.deviceId;
	}
}
