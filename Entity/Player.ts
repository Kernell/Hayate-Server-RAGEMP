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

import { Entity }  from "./Entity";
import { Vehicle } from "./Vehicle";

export class Player extends Entity
{
	protected entity : mp.Player;

	public GetName() : string
	{
		return this.entity.name;
	}

	public OutputChatBox( text : string ) : void
	{
		this.entity.outputChatBox( text );
	}

	public Spawn( position : Vector3 ) : void
	{
		this.entity.spawn( position );
	}

	public GetRotation() : Vector3
	{
		return new Vector3( 0, 0, this.entity.heading );
	}

	public IsInVehicle() : boolean
	{
		return this.entity.vehicle != null;
	}

	public GetVehicle() : Vehicle
	{
		return Vehicle.FindOrCreate< Vehicle >( this.entity.vehicle );
	}
}
