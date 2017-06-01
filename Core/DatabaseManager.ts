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

import * as Config    from "nconf";
import * as ORM       from "typeorm";
import { Console }    from "../Entity/Console";
import * as Entity    from "../Entity";
import Server         from "../Server";
import ManagerBase    from "./ManagerBase";

export default class DatabaseManager extends ManagerBase< any >
{
	private Connection : ORM.Connection;

	constructor( server : Server )
	{
		super( server );

		this.Connection = null;
	}

	public Init() : Promise< any >
	{
		if( this.Connection == null )
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
						Entity.Character,
						Entity.Vehicle,
					],
					autoSchemaSync : true,
				}
			).then(
				( connection ) =>
				{
					this.Connection = connection;

					this.Initialized();
				}
			).catch(
				( error ) =>
				{
					Console.WriteLine( "MySQL: %s", error );

					throw new Error( error );
				}
			);
		}

		return super.Init();
	}

	public GetRepository< Entity >( entityClassOrName : ORM.ObjectType< Entity > | string ) : ORM.Repository< Entity >
	{
		return this.Connection.getRepository( entityClassOrName );
	}

	private async Initialized() : Promise< any >
	{
		let usersRepo = this.GetRepository( Entity.User );
		let charsRepo = this.GetRepository( Entity.Character );

		let user = await usersRepo.findOneById( 1, { alias: "user", leftJoinAndSelect: { characters: "user.characters" } } );
		let char = await charsRepo.findOneById( 1, { alias: "char", leftJoinAndSelect: { user: "char.user" } } );

		console.log( user.characters );
		console.log( char.user );
	}
}
