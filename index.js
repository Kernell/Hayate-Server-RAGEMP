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

process._debugProcess( process.pid );

// Костыль
Vector3      = global.Vector3      = require( './bin/Types/Vector3' );
VehicleModel = global.VehicleModel = require( './bin/Types/VehicleModel' );

global.Color = function object( red = 255, green = 255, blue = 255 )
{
	this.Red   = red;
	this.Green = green;
	this.Blue  = blue;
}

let Server = require( "./bin/Server" ).default;

new Server();
