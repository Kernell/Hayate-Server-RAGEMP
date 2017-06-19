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
import * as Entity     from "../Entity";
import { ServiceBase } from "./ServiceBase";

export class DatabaseService extends ServiceBase
{
	private connection : ORM.Connection;

	constructor( server : ServerInterface )
	{
		super( server );

		this.connection = null;
	}

	public Start() : Promise< any >
	{
		if( this.connection == null )
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
						Entity.User,
						Entity.UserRole,
						Entity.UserAuth,
						Entity.Character,
						Entity.Vehicle,
					],
					autoSchemaSync : true,
				}
			).then(
				( connection ) =>
				{
					this.connection = connection;
				}
			);
		}

		return super.Start();
	}

	public GetRepository< Entity >( entityClassOrName : ORM.ObjectType< Entity > | string ) : ORM.Repository< Entity >
	{
		return this.connection.getRepository( entityClassOrName );
	}
}
