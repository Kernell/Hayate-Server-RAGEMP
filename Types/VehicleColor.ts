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

class VehicleColor
{
	public constructor( color1 ?: Color, color2 ?: Color )
	{
		this[ 0 ] = color1 || new Color();
		this[ 1 ] = color2 || new Color();
	}
}

module.exports = VehicleColor;
