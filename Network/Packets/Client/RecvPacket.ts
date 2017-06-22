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

export abstract class RecvPacket implements IRecvPacket
{
	public GetName() : string
	{
		return this.constructor.name;
	}

	public abstract Process( connection : IConnection ) : void;
}
