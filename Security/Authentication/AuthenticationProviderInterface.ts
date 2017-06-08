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

interface AuthenticationProviderInterface
{
	Authenticate( token : TokenInterface ) : Promise< TokenInterface >;

	RetrieveUser( username : string, token : TokenInterface ) : Promise< UserInterface >;

	Supports( token : TokenInterface ) : boolean;
}
