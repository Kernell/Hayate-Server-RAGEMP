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
import { Request }      from "Logic/Request/Request";

export class RequestInvite extends ServerPacket
{
	private request : Request;

	public constructor( request : Request )
	{
		super();

		this.request = request;
	}

	public ToJSON()
	{
		let result =
		{
			id     : this.request.ID,
			type   : this.request.Type,
			owner  : this.request.Owner,
			target : this.request.Target,
		};

		return result;
	}
}
