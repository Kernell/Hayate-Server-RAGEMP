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

interface ServerInterface
{
	AccountService   : ServiceInterface;
	DatabaseService  : ServiceInterface;
	CommandService   : ServiceInterface;
	PlayerService    : ServiceInterface;
	VehicleService   : ServiceInterface;

	RegisterService  ( service : ServiceInterface ) : void;

	Restart          () : void;
	Shutdown         () : void;
}
