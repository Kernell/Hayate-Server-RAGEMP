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

import Entity from "../Entity/Entity";

export enum ManagerState
{
	None,
	OK,
	Error,
}

export interface IManager
{
	State         : ManagerState;

	DestroyAll    ()                  : void;
	AddToList     ( object : Entity ) : void;
	RemoveFromList( object : Entity ) : void;
	Get           ( id : number )     : Entity;
	GetState      ()                  : ManagerState;
	GetAll        ()                  : IterableIterator< Entity >;
	Init          ()                  : Promise< any >;
	DoPulse       ( date : Date )     : void;
}
