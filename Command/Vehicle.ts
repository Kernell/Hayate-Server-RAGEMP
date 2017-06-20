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

import * as printf        from "printf";
import * as Config        from "nconf";
import { ConsoleCommand } from "./ConsoleCommand";
import * as Entity        from "../Entity";
import { VehicleService } from "../Services/VehicleService";
import { Server }         from "../Server"

export class Vehicle extends ConsoleCommand
{
	private service : VehicleService;

	constructor()
	{
		super();

		this.Name       = "vehicle";
		this.Restricted = true;

		this.service = Server.VehicleService;
	}

	private Option_create( player : PlayerInterface, option : string, args : any[] ) : Promise< any >
	{
		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [model hash or name]` );
		}

		let name = args.shift();
		let model : number = mp.joaat( name );

		if( VehicleModel[ model ] == null )
		{
			throw new Exception( "Модель с именем '" + name + "' не найдена" );
		}

		let rotation  = player.GetRotation();
		let position  = player.GetPosition().Offset( 2.5, rotation.Z );
		let dimension = player.GetDimension();

		rotation.Z += 90.0;

		return this.service.Create( model, position, rotation, dimension ).then(
			( vehicle ) =>
			{
				if( !vehicle.IsValid() )
				{
					throw new Exception( "Internal server error" );
				}

				player.OutputChatBox( vehicle.GetName() + " создан, ID: " + vehicle.GetID() );
			}
		);
	}

	private Option_delete( player : PlayerInterface, option : string, args : any[] ) : Promise< any >
	{
		let character = player.GetCharacter();

		if( character == null )
		{
			return;
		}

		let vehicle = args[ 0 ] ? this.service.Get( Number( args[ 0 ] ) ) : ( character.GetVehicle() as Entity.Vehicle );

		if( vehicle == null )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [id]` );
		}

		vehicle.Delete();

		if( vehicle.GetID() < 0 )
		{
			this.service.Remove( vehicle );
		}

		player.OutputChatBox( "Vehicle " + vehicle.GetName() + " deleted" );

		return vehicle.Persist( this.service.GetRepository() );
	}

	private Option_restore( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [id]` );
		}

		let vehicle = this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		vehicle.Restore();

		player.OutputChatBox( "Vehicle " + vehicle.GetName() + " restored" );
	}

	private Option_warp( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [id]` );
		}

		let vehicle = this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		let rotation  = player.GetRotation();
		let position  = player.GetPosition().Offset( 2.5, rotation.Z );
		let dimension = player.GetDimension();

		rotation.Z += 90.0;

		vehicle.SetRotation( rotation );
		vehicle.SetPosition( position );
		vehicle.SetDimension( dimension );
	}

	private Option_warpto( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [id]` );
		}

		let vehicle = this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		let rotation  = vehicle.GetRotation();
		let position  = vehicle.GetPosition().Offset( 2.5, rotation.Z );
		let dimension = vehicle.GetDimension();

		rotation.Z += 90.0;

		let character = player.GetCharacter();

		character.SetRotation( rotation );
		character.SetPosition( position );
		character.SetDimension( dimension );
	}

	private Option_respawn( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [id] [all = false]` );
		}

		let vehicle = this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		if( args.length == 2 )
		{
			this.service.GetAll().map( vehicle => vehicle.Respawn() );

			player.OutputChatBox( `All vehicles respawned` );

			return;
		}

		vehicle.Respawn();

		player.OutputChatBox( `Vehicle ${vehicle.GetID()} respawned` );
	}

	private Option_fix( player : PlayerInterface, option : string, args : any[] ) : void
	{
		let character = player.GetCharacter();

		if( character == null )
		{
			return;
		}

		let vehicle = args[ 0 ] ? this.service.Get( Number( args[ 0 ] ) ) : ( character.GetVehicle() as Entity.Vehicle );

		if( vehicle == null )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [id]` );
		}

		vehicle.Fix();

		player.OutputChatBox( `Vehicle ${vehicle.GetName()} [${vehicle.GetID()}] fixed` );
	}

	private Option_flip( player : PlayerInterface, option : string, args : any[] ) : void
	{
		let character = player.GetCharacter();

		if( character == null )
		{
			return;
		}

		let vehicle = args[ 0 ] ? this.service.Get( Number( args[ 0 ] ) ) : ( character.GetVehicle() as Entity.Vehicle );

		if( vehicle == null )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [id]` );
		}

		vehicle.SetRotation( new Vector3( 0.0, 0.0, vehicle.GetRotation().z - 180.0 ) );
	}

	private Option_setcolor( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 2 )
        {
			throw new Exception( `Syntax: /${this.Name} ${option} [id|@my] [color1:hex] [color2:hex = color1]` );
        }

		let character = player.GetCharacter();

		if( character == null )
		{
			return;
		}

		let vehicle = args[ 0 ] == "@my" ? character.GetVehicle() as Entity.Vehicle : this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		let c1 = parseInt( args[ 1 ], 16 );
		let c2 = parseInt( args[ 2 ], 16 ) || c1;

		if( isNaN( c1 ) || isNaN( c2 ) )
        {
			throw new Exception( "Invalid colors" );
        }

		let color1 = new Color( c1 >> 16 & 255, c1 >> 8 & 255, c1 & 255 );
		let color2 = new Color( c2 >> 16 & 255, c2 >> 8 & 255, c2 & 255 );

		vehicle.SetColor( new VehicleColor( color1, color2 ) );
		vehicle.Persist( this.service.GetRepository() );

		player.OutputChatBox( `Vehicle ${vehicle.GetName()} (ID ${vehicle.GetID()}) color changed to (${vehicle.GetColor().toString()})` );
	}

	private Option_setmodel( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 2 )
        {
			throw new Exception( `Syntax: /${this.Name} ${option} [id|@my] [model hash|name]` );
        }

		let character = player.GetCharacter();

		if( character == null )
		{
			return;
		}

		let vehicle = args[ 0 ] == "@my" ? character.GetVehicle() as Entity.Vehicle : this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		let model = Number( args[ 1 ] ) || mp.joaat( args[ 1 ] );

		if( VehicleModel[ model ] == null )
        {
			throw new Exception( "Invalid vehicle model name\\hash " + args[ 1 ] );
        }

		player.OutputChatBox( `Vehicle ${vehicle.GetName()} (ID: ${vehicle.GetID()}) model changed to ` + VehicleModel[ model ] );
	
		vehicle.SetModel( model );
		vehicle.Persist( this.service.GetRepository() );
	}

	private Option_setspawn( player : PlayerInterface, option : string, args : any[] ) : void
	{
		let character = player.GetCharacter();

		if( character == null )
		{
			return;
		}

		let vehicle = args[ 0 ] ? this.service.Get( Number( args[ 0 ] ) ) : ( character.GetVehicle() as Entity.Vehicle );

		if( vehicle == null )
		{
			throw new Exception( `Syntax: /${this.Name} ${option} [id]` );
		}

		let position  = character.GetPosition();
		let rotation  = character.GetRotation();
		let dimension = character.GetDimension();

		vehicle[ "defaultPosition" ]  = position;
		vehicle[ "defaultRotation" ]  = rotation;
		vehicle[ "defaultDimension" ] = dimension;

		vehicle.Persist( this.service.GetRepository() );

		player.OutputChatBox( `Vehicle ${vehicle.GetName()} (ID: ${vehicle.GetID()}) default spawn changed` );
	}

	private Option_spawn( player : PlayerInterface, option : string, args : any[] ) : void
	{
		let name = args.shift();

		let temp_max : number = Config.get( "vehicles:temp_max" );

		let id    : number = null;
		let model : number = mp.joaat( name );

		if( VehicleModel[ model ] == null )
		{
			throw new Exception( "Модель с именем '" + name + "' не найдена" );
		}

		for( let i = -1; i > -temp_max; --i )
		{
			if( this.service.Get( i ) == null )
			{
				id = i;

				break;
			}
		}

		if( id == null )
		{
			throw new Exception( "Недостаточно памяти для создания автомобиля" );
		}

		let rotation  = player.GetRotation();
		let position  = player.GetPosition().Offset( 2.5, rotation.Z );
		let dimension = player.GetDimension();
		let color     = new VehicleColor();
		let plate     = printf( "NULL %03d", -id );
		
		rotation.Z += 90.0;

		let vehicle = new Entity.Vehicle( model, position, rotation, dimension, color, plate );

		if( !vehicle.IsValid() )
		{
			throw new Exception( "Internal server error" );
		}

		vehicle[ "id" ] = id;

		this.service.Add( vehicle );

		player.OutputChatBox( "Временный '" + vehicle.GetName() + "' создан, ID: " + vehicle.GetID() );
	}

	private Option_setplate( player : PlayerInterface, option : string, args : any[] ) : void
	{
		if( args.length < 2 )
        {
			throw new Exception( `Syntax: /${this.Name} ${option} [id|@my] [plate]` );
        }

		let character = player.GetCharacter();

		if( character == null )
		{
			return;
		}

		let vehIdName = args.shift();
		let vehicle = vehIdName == "@my" ? character.GetVehicle() as Entity.Vehicle : this.service.Get( Number( vehIdName ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + vehIdName + "' not found" );
		}

		let plateText = args.join( ' ' );

		vehicle.SetPlate( plateText );
		vehicle.Persist( this.service.GetRepository() );

		player.OutputChatBox( `Vehicle ${vehicle.GetName()} (ID: ${vehicle.GetID()}) plate text changed to ${plateText}` );
	}

	private Option_undefined( player : PlayerInterface, option : string, args : any[] )
	{
		player.OutputChatBox( "Syntax: /" + this.Name + " <option>" );
	}
}
