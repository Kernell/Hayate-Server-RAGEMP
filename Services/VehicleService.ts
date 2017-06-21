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
import { Server }          from "../Server";
import { Vehicle }         from "../Entity/Vehicle";
import { ServiceBase }     from "./ServiceBase";
import { DatabaseService } from "./DatabaseService";

export class VehicleService extends ServiceBase
{
	private list       : Array< Vehicle >;
	private repository : ORM.Repository< Vehicle > = null;

	constructor()
	{
		super();

		this.list = new Array< Vehicle >();
	}

	public Add( vehicle : Vehicle ) : void
	{
		this.list.push( vehicle );
	}

	public Get( id : number ) : Vehicle
	{
		return this.list.find( vehicle => vehicle.GetID() == id );
	}

	public GetAll() : Array< Vehicle >
	{
		return this.list;
	}

	public Remove( vehicle : Vehicle ) : void
	{
		this.list.remove( vehicle );
	}

	public GetRepository() : ORM.Repository< Vehicle >
	{
		return this.repository;
	}

	public async Start() : Promise< any >
	{
		this.repository = DatabaseService.GetRepository( Vehicle );

		return this.repository.find().then(
			( vehicles ) =>
            {
				for( let vehicle of vehicles )
				{
					vehicle.Create();

					this.list.push( vehicle );
				}
            }
		);
	}

	public async Stop() : Promise< any >
	{
		for( let vehicle of this.list )
		{
			await vehicle.Persist( this.repository );

			this.list.remove( vehicle );
		}
	}

	public async Create( model : VehicleModel, position : Vector3, rotation : Vector3, dimension : number ) : Promise< Vehicle >
	{
		let color = new VehicleColor();
		let plate = VehicleService.GetRandomNumberPlate();

		let vehicle = new Vehicle( model, position, rotation, dimension, color, plate );

		this.list.push( vehicle );

		return vehicle.Persist( this.repository );
	}

	private async PlayerExitVehicle( connection : IConnection ) : Promise< void >
	{
		if( connection.Player != null )
		{
			let vehicle = connection.Player.GetVehicle() as Vehicle;
			let seat    = connection.Player.GetVehicleSeat();

			if( seat == 0 && vehicle != null )
			{
				vehicle.Persist( this.repository );
			}
		}

		return null;
	}

	public static GetRandomNumberPlate() : string
	{
		let str = '';

		for( let i = 0; i < 3; ++i )
		{
			str += String.fromCharCode( Math.Random( 65, 90 ) );
		}

		return printf( "%s %04d", str, Math.Random( 1, 9999 ) );
	}
}
