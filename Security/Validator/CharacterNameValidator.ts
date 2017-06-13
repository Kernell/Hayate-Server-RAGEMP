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

export class CharacterNameValidator
{
	public Validate( name : string ) : boolean
	{
		if( name.length < 3 || name.length > 16 )
		{
			throw new Error( "Имя персонажа может быть от 3 до 16 символов" );
		}

		name = name.toUpperCase();

		if( /[^A-ZА-Я0-9]/.test( name ) )
		{
			throw new Error( "Имя персонажа содержит некорректные символы" );
		}

		if( !/[^A-Z]/.test( name ) == !/[^А-Я]/.test( name ) )
		{
			throw new Error( "Имя персонажа может быть только на одном языке" );
		}

		return true;
	}
}
