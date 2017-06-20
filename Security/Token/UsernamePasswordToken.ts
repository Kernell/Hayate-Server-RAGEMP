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
	protected account       : AccountInterface|string;
	protected credentials   : string;
	protected guid          : GUID;
	protected ip            : string;
	protected deviceId      : string;
    protected authenticated : boolean = false;

	public constructor( token : UsernamePasswordToken );
	public constructor( account : AccountInterface|string, credentials : string, ip : string, deviceId : string );

	public constructor( account : UsernamePasswordToken|AccountInterface|string, credentials ?: string, ip ?: string, deviceId ?: string )
	{
		if( account instanceof UsernamePasswordToken )
		{
			let token = account;

			account     = token.account;
			ip          = token.ip;
			deviceId    = token.deviceId;
			credentials = token.credentials;
		}

		this.SetAccount( account );

		this.guid        = new GUID();
		this.ip          = ip;
		this.deviceId    = deviceId;
		this.credentials = credentials;
	}

	public GetAccount() : AccountInterface
	{
		return this.account as AccountInterface;
	}

	public SetAccount( account : AccountInterface|string ) : void
	{
		this.account = account;
	}

	public GetUsername() : string
	{
		if( typeof this.account == "string" )
		{
			return this.account;
		}

		return this.account.GetName();
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
