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

import { ServerPacket } from "./ServerPacket";

export class CharacterNameCheckResult extends ServerPacket
{
	protected name   : string;
	protected result : number;

	public constructor( name : string, result : PlayerNameCheckResult )
	{
		super();

		this.name   = name;
		this.result = result;
	}

	public ToJSON()
	{
		return { name: this.name, result: this.result };
	}
}
