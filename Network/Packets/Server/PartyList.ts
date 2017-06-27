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

export class PartyList extends ServerPacket
{
    protected players : Array< PlayerInterface >;

	public constructor( players : Array< PlayerInterface > )
	{
		super();

		this.players = players;
	}
	
	public ToJSON()
	{
		let players = [];

		for( let player of this.players )
		{
			let data =
			{
				isOnline : player.IsOnline(),
				id       : player.GetID(),
				level    : player.GetLevel(),
			//	class    : player.GetClass(),
				name     : player.GetName(),
			};

			players.push( data );
		}

		return { players: players };
	}
}
