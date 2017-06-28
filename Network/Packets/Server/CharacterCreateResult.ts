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

export class CharacterCreateResult extends ServerPacket
{
	protected result : number;

	public constructor( result : PlayerCreateResult )
	{
		super();

		this.result = result;
	}

	public ToJSON()
	{
		return { result: this.result };
	}
}
