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

export class UserEmailValidator
{
	public constructor()
	{
	}

	public Validate( value : string ) : boolean
	{
		if( value.length < 4 || value.length > 32 )
		{
			throw new Error( "Пожалуйста, введите корректный email" );
		}

		let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if( !regexp.test( value ) )
		{
			throw new Error( "Пожалуйста, введите корректный email" );
		}

		return true; 
	}
}
