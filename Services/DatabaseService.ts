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

import * as Config     from "nconf";
import * as ORM        from "typeorm";
import * as Entity     from "Entity";
import { ServiceBase } from "Services/ServiceBase";

export class DatabaseService extends ServiceBase
{
	private static connection : ORM.Connection = null;

	public async Start() : Promise< any >
	{
		if( DatabaseService.connection == null )
		{
			return ORM.createConnection(
				{
					driver :
					{
						type       : Config.get( "database:driver" ),
						port       : Config.get( "database:port" ),
						host       : Config.get( "database:host" ),
						username   : Config.get( "database:user" ),
						password   : Config.get( "database:password" ),
						database   : Config.get( "database:database" )
					},
					entities :
					[
						Entity.Account,
						Entity.AccountRole,
						Entity.AccountAuth,
						Entity.Player,
						Entity.Vehicle,
					],
					autoSchemaSync : true,
				}
			).then(
				( connection ) =>
				{
					DatabaseService.connection = connection;
				}
			);
		}
	}

	public async Stop() : Promise< void >
	{
	}

	public DoPulse() : void
	{
	}

	public static GetRepository< Entity >( entityClassOrName : ORM.ObjectType< Entity > | string ) : ORM.Repository< Entity >
	{
		return this.connection.getRepository( entityClassOrName );
	}
}
