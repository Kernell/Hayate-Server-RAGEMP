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

interface PlayerInterface extends EntityInterface
{
	GetCharacter() : CharacterInterface;
	SetCharacter( char : CharacterInterface );

	GetID() : number;
	GetName() : string;
	GetUser() : UserInterface;
	GetPing() : number;
	GetIP() : string;
	GetPosition() : Vector3;
	GetRotation() : Vector3;
	GetDimension() : number;
	OutputChatBox( text : string ) : void;
	Login( user : UserInterface ) : void;
	Logout() : void;
}
