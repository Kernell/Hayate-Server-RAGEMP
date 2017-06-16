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

interface ManagerInterface
{
	State         : ManagerState;

	DestroyAll    ()                           : void;
	AddToList     ( object : EntityInterface ) : void;
	RemoveFromList( object : EntityInterface ) : void;
	Get           ( id : number )              : EntityInterface;
	GetState      ()                           : ManagerState;
	GetAll        ()                           : IterableIterator< EntityInterface >;
	Init          ()                           : Promise< any >;
	Stop          ()                           : Promise< any >;
	DoPulse       ( date : Date )              : void;
}
