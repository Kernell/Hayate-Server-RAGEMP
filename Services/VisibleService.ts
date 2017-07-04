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

import * as ORM            from "typeorm";
import { Npc }             from "Entity/Npc";
import { Player }          from "Entity/Player";
import { Vehicle }         from "Entity/Vehicle";
import { Server }          from "Server";
import { ServiceBase }     from "Services/ServiceBase";
import { PlayerService }   from "Services/PlayerService";

export class VisibleService extends ServiceBase
{
	public static readonly VisibleDistance = 20.0;

	public SendPacket( entity : Npc,     packet : IServerPacket ) : void;
	public SendPacket( entity : Player,  packet : IServerPacket ) : void;
	public SendPacket( entity : Vehicle, packet : IServerPacket ) : void;

	public SendPacket( entity : Npc|Player|Vehicle, packet : IServerPacket ) : void
	{
		if( entity instanceof Player )
		{
			if( entity.IsOnline() )
			{
				entity.Connection.Send( packet );
			}
		}

		let position = entity.GetPosition();

		for( let player of PlayerService.GetAll() )
		{
			if( player.GetPosition().Distance( position ) < VisibleService.VisibleDistance )
			{
				if( player.IsOnline() )
				{
					player.Connection.Send( packet );
				}
			}
		}
	}

	public async Start() : Promise< void >
	{
	}

	public async Stop() : Promise< void >
	{
	}

	public DoPulse( date : Date ) : void
	{
	}
}
