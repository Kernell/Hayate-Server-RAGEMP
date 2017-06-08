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

interface PasswordEncoderInterface
{
	EncodePassword( raw : string, salt : string ) : string;

	IsPasswordValid( encoded : string, raw : string, salt : string ) : boolean;
}
