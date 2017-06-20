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
	GetAccount        () : AccountInterface;
	SetAccount        ( account : AccountInterface|string ) : void;
	GetUsername       () : string;
	IsAuthenticated   () : boolean;
	SetAuthenticated  ( authenticated : boolean ) : void;
	GetCredentials    () : string;
	RemoveCredentials () : void;
}
