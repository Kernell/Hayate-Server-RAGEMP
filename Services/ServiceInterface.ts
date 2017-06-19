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

interface ServiceInterface
{
	State         : ServiceState;

	GetState      ()                           : ServiceState;
	Start         ()                           : Promise< any >;
	Stop          ()                           : Promise< any >;
	DoPulse       ( date : Date )              : void;
}
