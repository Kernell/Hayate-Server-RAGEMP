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

interface Color
{
	Red   : number;
	Green : number;
	Blue  : number;
}

interface ColorConstructor
{
    readonly prototype : Color;

    new ( red ?: number, green ?: number, blue ?: number ) : Color;
}

declare const Color : ColorConstructor;

Color.prototype.constructor = function( red : number = 255, green : number = 255, blue : number = 255 )
{
	this.Red   = red;
	this.Green = green;
	this.Blue  = blue;
}

