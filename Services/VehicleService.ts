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
import { Vehicle }         from "../Entity/Vehicle";
import { ServiceBase }     from "./ServiceBase";
import { DatabaseService } from "./DatabaseService";

export class VehicleService extends ServiceBase
{
	private list       : Array< Vehicle >;
	private repository : ORM.Repository< Vehicle > = null;

	constructor( server : ServerInterface )
	{
		super( server );

		this.list       = new Array< Vehicle >();
		this.Dependency = server.DatabaseService;

		this.WrapEvent( "playerExitVehicle", this.OnPlayerExitVehicle );
	}

	public Add( vehicle : Vehicle ) : void
	{
		this.list.push( vehicle );
	}

	public Get( id : number ) : Vehicle
	{
		return this.list.find( ( vehicle, index ) => vehicle.GetID() == id );
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

	public Start() : Promise< any >
	{
		return super.Start().then(
			async () =>
			{
				this.repository = ( this.Dependency as DatabaseService ).GetRepository( Vehicle );

				try
				{
					let vehicles = await this.repository.find();

					for( let vehicle of vehicles )
					{
						vehicle.Create();

						this.list.push( vehicle );
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
				for( let vehicle of this.list )
				{
					vehicle.Persist( this.repository );

					this.list.remove( vehicle );
				}

				resolve();
			}
		);
	}

	public async Create( model : VehicleModel, position : Vector3, rotation : Vector3, dimension : number ) : Promise< Vehicle >
	{
		let color = new VehicleColor();
		let plate = VehicleService.GetRandomNumberPlate();

		let vehicle = new Vehicle( model, position, rotation, dimension, color, plate );

		this.list.push( vehicle );

		return vehicle.Persist( this.repository );
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
