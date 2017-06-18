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

import * as ORM         from "typeorm";
import { Vehicle }      from "../../Entity/Vehicle";
import ManagerBase      from "../../Core/ManagerBase";
import DatabaseManager  from "../../Core/DatabaseManager";

export default class VehicleManager extends ManagerBase< Vehicle >
{
	private Repository : ORM.Repository< Vehicle > = null;

	constructor( server : ServerInterface )
	{
		super( server );

		this.Dependency = server.DatabaseManager;

		this.WrapEvent( "playerExitVehicle", this.OnPlayerExitVehicle );
	}

	public Init() : Promise< any >
	{
		return super.Init().then(
			async () =>
			{
				this.Repository = ( this.Dependency as DatabaseManager ).GetRepository( Vehicle );

				try
				{
					let vehicles = await this.Repository.find();

					for( let vehicle of vehicles )
					{
						vehicle.Create();
					}
				}
				catch( e )
				{
					console.log( e );
				}
			}
		);
	}

	public Stop() : Promise< any >
	{
		return new Promise(
			( resolve, reject ) =>
			{
				for( let vehicle of this.GetAll() )
				{
					vehicle.Persist( this.Repository );
				}

				resolve();
			}
		);
	}

	private async OnPlayerExitVehicle( player : PlayerInterface ) : Promise< void >
	{
		let char = player.GetCharacter();

		if( char != null )
		{
			let vehicle = char.GetVehicle() as Vehicle;
			let seat    = char.GetVehicleSeat();

			if( seat == 0 && vehicle != null )
			{
				vehicle.Persist( this.Repository );
			}
		}

		return null;
	}
}
