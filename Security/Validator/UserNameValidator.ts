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

export class UserNameValidator
{
	public constructor()
	{
	}

	public Validate( value : string ) : boolean
	{
		if( value.length < 3 || value.length > 32 )
		{
			return false;
		}

		return !/[^A-Za-z]/.test( value );
	}
}
