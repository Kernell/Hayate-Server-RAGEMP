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
import { Console }      from "../Entity/Console";
import { Vehicle }      from "../Entity/Vehicle";
import Server           from "../Server";
import ManagerBase      from "./ManagerBase";
import DatabaseManager  from "./DatabaseManager";

export default class VehicleManager extends ManagerBase< Vehicle >
{
	private Repository : ORM.Repository< Vehicle > = null;

	constructor( server : Server )
	{
		super( server );

		this.Dependency = server.DatabaseManager;
	}

	public Init() : Promise< any >
	{
		return super.Init().then(
			async () =>
			{
				this.Repository = ( this.Dependency as DatabaseManager ).GetRepository( Vehicle );

				try
				{
					let vehicle = new Vehicle( VehicleModel.Elegy2, new Vector3( 192, 168, 0 ), new Vector3(), 0, new Color( 255, 0, 0 ), 'Lorem' )

					Console.WriteLine( "Elegy2: 0x%X, %s", vehicle.GetModel(), vehicle.GetPosition() );

					await this.Repository.persist( vehicle );

					let vehicles = await this.Repository.find();

					for( let vehicle of vehicles )
					{
						//let id       = vehicle.GetID();
						//let model    = vehicle.GetModel();
						//let position = vehicle.GetPosition();
						//let color    = vehicle.GetColor();

						//Console.WriteLine( "Vehicle ID: %d | model: %d | position: %d, %d, %d | color: %d, %d, %d", id, model, position.x, position.y, position.z, color.Red, color.Green, color.Blue );
					}
				}
				catch( e )
				{
					console.log( e );
				}
			}
		);
	}
}
