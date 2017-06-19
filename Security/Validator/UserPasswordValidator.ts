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

export class UserPasswordValidator
{
	public constructor()
	{
	}

	public Validate( value : string ) : boolean
	{
		if( value.length < 6 || value.length > 64 )
		{
			throw new Exception( "Используйте пароль длинной от 6 до 32 символов" );
		}

		return true;
	}
}
