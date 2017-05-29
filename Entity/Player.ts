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

import Entity from "./Entity";

export default class Player extends Entity
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

	public Spawn( position : mp.Vector3 ) : void
	{
		this.entity.spawn( position );
	}
}
