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
		return value.length >= 8 && value.length <= 64;
	}
}
