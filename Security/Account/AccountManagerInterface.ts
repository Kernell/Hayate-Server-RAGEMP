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

interface AccountManagerInterface
{
	LoadByUsername( name  : string ) : Promise< AccountInterface >;
	LoadByLogin   ( login : string ) : Promise< AccountInterface >;
}
