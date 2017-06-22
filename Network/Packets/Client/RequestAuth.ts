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

import { RecvPacket } from "./RecvPacket";
import { Server }     from "../../../Server";

export class RequestAuth extends RecvPacket
{
	protected accountName : string;
	protected password    : string;

	public Read() : void
	{
		this.accountName = this.data.accountName;
		this.password    = this.data.password;
	}

	public async Process() : Promise< any >
	{
		return Server.AccountService.TryAuthorize( this.connection, this.accountName, this.password );
	}
}
