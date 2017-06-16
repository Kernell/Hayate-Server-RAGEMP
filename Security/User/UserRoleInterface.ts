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

interface UserRoleInterface
{
	GetID            () : number;
	GetName          () : string;
	GetColor         () : Color;
	IsGranted        ( permission : Permission|string ) : boolean;
	SetPermission    ( permission : Permission, granted ?: boolean ) : void;
	AddPermission    ( permission : Permission ) : void;
	RemovePermission ( permission : Permission ) : void;
}
