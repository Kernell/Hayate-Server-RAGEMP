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
	DatabaseManager  : ManagerInterface;
	CommandManager   : ManagerInterface;
	PlayerManager    : ManagerInterface;
	UserManager      : ManagerInterface;
	VehicleManager   : ManagerInterface;

	Initialize       () : void;
	RegisterManager  ( manager : ManagerInterface ) : void;
	Restart          () : void;
	Shutdown         () : void;
}
