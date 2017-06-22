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

export class CharacterList extends ServerPacket
{
	protected connection : IConnection;

	public constructor( connection : IConnection )
	{
		super();

		this.connection = connection;
	}

	public ToJSON()
	{
		let result = [];

		this.connection.Account.Players.forEach(
			( player, index, array ) =>
			{
				if( player.IsDeleted() )
				{
					return;
				}

				result.push(
					{
						id         : player.GetID(),
						level      : player.GetLevel(),
						experience : player.GetExperience(),
						model      : player.GetModel(),
						name       : player.GetName(),
						createdAt  : player.GetCreatedAt(),
					}
				);
			}
		);

		return result;
	}
}
