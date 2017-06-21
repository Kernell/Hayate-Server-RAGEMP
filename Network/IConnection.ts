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

interface IConnection
{
	Account    : AccountInterface;
	Player     : PlayerInterface;

	Close      () : void;
	Send       ( packet : IServerPacket ) : void;
	Invoke     ( hash : string, ...args : any[] ) : void;
	CallEvent  ( eventName : string, ...args : any[] ) : void;
	Notify     ( message : string ) : void;
	Ping       () : number;
	GetIP      () : string;
}
