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

class Color
{
	public Red   : number;
	public Green : number;
	public Blue  : number;

	public constructor( red : number = 255, green : number = 255, blue : number = 255 )
	{
		this.Red   = red;
		this.Green = green;
		this.Blue  = blue;
	}
}

module.exports = Color;
