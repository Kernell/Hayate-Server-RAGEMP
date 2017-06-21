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

export class ChatPrivate extends ServerPacket
{
	protected sender  : string;
    protected sended  : string;
    protected message : string;

	public constructor( sender : string, targetName : string, message : string )
	{
		super();

		this.sender  = sender;
		this.sended  = targetName;
		this.message = message;
	}

	public ToJSON()
	{
		return { sender: this.sender, sended: this.sended, message : this.message };
	}
}
