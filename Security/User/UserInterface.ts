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

interface UserInterface
{
	GetID              () : number;
	GetName            () : string;
	GetEmail           () : string;
	GetPassword        () : string;
	GetSalt            () : string;
	GetCreatedDate     () : Date;
	GetRoles           () : Map< number, UserRoleInterface >;
	AddRole            ( role : UserRoleInterface ) : void;
	RemoveRole         ( role : UserRoleInterface ) : void;
	IsGranted          ( permission : Permission ) : boolean;
	IsGranted          ( permission : string )     : boolean;
}
