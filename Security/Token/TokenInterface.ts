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

interface TokenInterface
{
	GetUser           () : UserInterface;
	SetUser           ( user : UserInterface|string ) : void;
	GetUsername       () : string;
	IsAuthenticated   () : boolean;
	SetAuthenticated  ( authenticated : boolean ) : void;
	GetCredentials    () : string;
	RemoveCredentials () : void;
}
