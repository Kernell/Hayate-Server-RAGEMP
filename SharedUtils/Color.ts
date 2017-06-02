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

interface Color extends Object
{
	Red   : number;
	Green : number;
	Blue  : number;
}

interface ColorConstructor extends ObjectConstructor
{
    new ( red ?: number, green ?: number, blue ?: number ) : Color;
}

declare const Color : ColorConstructor;