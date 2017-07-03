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

import * as Entity      from "../../../Entity";
import { Server }       from "../../../Server";
import { ServerPacket } from "./ServerPacket";

export class SystemMessage extends ServerPacket
{
	private message : string;

	public constructor( message : string )
	{
		super();

		this.message = message;
	}

	public ToJSON()
	{
		return { message: this.message };
	}
}
