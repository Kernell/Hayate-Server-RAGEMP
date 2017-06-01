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

global.Color = class Color
{
	constructor( red, green, blue )
	{
		this.Red   = red || 255;
		this.Green = green || 255;
		this.Blue  = blue || 255;
	}
}
