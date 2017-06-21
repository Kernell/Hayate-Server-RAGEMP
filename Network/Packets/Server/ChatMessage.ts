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

export class ChatMessage extends ServerPacket
{
    protected player   : PlayerInterface;
    protected message  : string;
    protected type     : ChatType;

	public constructor( player : PlayerInterface, message : string, type : ChatType );
	public constructor( message : string, type : ChatType );

	public constructor( ...args : any[] )
	{
		super();

		if( args.length == 3 )
		{
			this.player  = args.shift();
			this.message = args.shift();
			this.type    = args.shift();
		}
		else if( args.length == 2 )
		{
			this.message = args.shift();
			this.type    = args.shift();
		}
	}

	public ToJSON() : Object
	{
		return { player: this.player, message: this.message, type: this.type };
	}
}
