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
			throw new Exception( "Имя пользователя может быть от 3 до 12 символов" );
		}

		if( /[^A-Za-z]/.test( value ) )
		{
			throw new Exception( "Имя пользователя содержит некорректные символы. Используйте символы латинского алфавита" );
		}

		return true;
	}
}
