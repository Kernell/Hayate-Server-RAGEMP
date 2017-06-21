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
import { AdminCommand }   from "../AdminCommand";
import * as Entity        from "../../../Entity";
import { VehicleService } from "../../../Services/VehicleService";
import { Server }         from "../../../Server"
import * as ServerPacket  from "../../../Network/Packets";

export class Vehicle extends AdminCommand
{
	private service : VehicleService;

	constructor()
	{
		super();

		this.name       = "vehicle";
		this.restricted = true;

		this.service = Server.VehicleService;
	}

	private Option_create( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [model hash or name]` );
		}

		let name = args.shift();
		let model : number = mp.joaat( name );

		if( VehicleModel[ model ] == null )
		{
			throw new Exception( "Модель с именем '" + name + "' не найдена" );
		}

		let rotation  = connection.Player.GetRotation();
		let position  = connection.Player.GetPosition().Offset( 2.5, rotation.Z );
		let dimension = connection.Player.GetDimension();

		rotation.Z += 90.0;

		this.service.Create( model, position, rotation, dimension ).then(
			( vehicle ) =>
			{
				if( !vehicle.IsValid() )
				{
					throw new Exception( "Internal server error" );
				}

				connection.Send( new ServerPacket.ChatMessage( vehicle.GetName() + " создан, ID: " + vehicle.GetID(), ChatType.Notice ) );
			}
		);
	}

	private Option_delete( connection : IConnection, option : string, args : any[] ) : void
	{
		let vehicle = args[ 0 ] ? this.service.Get( Number( args[ 0 ] ) ) : connection.Player && ( connection.Player.GetVehicle() as Entity.Vehicle );

		if( vehicle == null )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [id]` );
		}

		vehicle.Delete();

		if( vehicle.GetID() < 0 )
		{
			this.service.Remove( vehicle );
		}

		connection.Send( new ServerPacket.ChatMessage( "Vehicle " + vehicle.GetName() + " deleted", ChatType.Notice ) );

		vehicle.Persist( this.service.GetRepository() );
	}

	private Option_restore( connection : IConnection, option : string, args : any[] ) : void
	{
		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [id]` );
		}

		let vehicle = this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		vehicle.Restore();

		connection.Send( new ServerPacket.ChatMessage( "Vehicle " + vehicle.GetName() + " restored", ChatType.Notice ) );
	}

	private Option_warp( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [id]` );
		}

		let vehicle = this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		let rotation  = connection.Player.GetRotation();
		let position  = connection.Player.GetPosition().Offset( 2.5, rotation.Z );
		let dimension = connection.Player.GetDimension();

		rotation.Z += 90.0;

		vehicle.SetRotation( rotation );
		vehicle.SetPosition( position );
		vehicle.SetDimension( dimension );
	}

	private Option_warpto( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [id]` );
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

		connection.Player.SetRotation( rotation );
		connection.Player.SetPosition( position );
		connection.Player.SetDimension( dimension );
	}

	private Option_respawn( connection : IConnection, option : string, args : any[] ) : void
	{
		if( args.length < 1 )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [id] [all = false]` );
		}

		let vehicle = this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		if( args.length == 2 )
		{
			this.service.GetAll().forEach( vehicle => vehicle.Respawn() );

			connection.Send( new ServerPacket.ChatMessage( `All vehicles respawned`, ChatType.Notice ) );

			return;
		}

		vehicle.Respawn();

		connection.Send( new ServerPacket.ChatMessage( `Vehicle ${vehicle.GetID()} respawned`, ChatType.Notice ) );
	}

	private Option_fix( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

		let vehicle = args[ 0 ] ? this.service.Get( Number( args[ 0 ] ) ) : ( connection.Player.GetVehicle() as Entity.Vehicle );

		if( vehicle == null )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [id]` );
		}

		vehicle.Fix();

		connection.Send( new ServerPacket.ChatMessage( `Vehicle ${vehicle.GetName()} [${vehicle.GetID()}] fixed`, ChatType.Notice ) );
	}

	private Option_flip( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

		let vehicle = args[ 0 ] ? this.service.Get( Number( args[ 0 ] ) ) : ( connection.Player.GetVehicle() as Entity.Vehicle );

		if( vehicle == null )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [id]` );
		}

		vehicle.SetRotation( new Vector3( 0.0, 0.0, vehicle.GetRotation().z - 180.0 ) );
	}

	private Option_setcolor( connection : IConnection, option : string, args : any[] ) : void
	{
		if( args.length < 2 )
        {
			throw new Exception( `Syntax: /${this.name} ${option} [id|@my] [color1:hex] [color2:hex = color1]` );
        }

		if( connection.Player == null )
		{
			return;
		}

		let vehicle = args[ 0 ] == "@my" ? connection.Player.GetVehicle() as Entity.Vehicle : this.service.Get( Number( args[ 0 ] ) );

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

		connection.Send( new ServerPacket.ChatMessage( `Vehicle ${vehicle.GetName()} (ID ${vehicle.GetID()}) color changed to (${vehicle.GetColor().toString()})`, ChatType.Notice ) );
	}

	private Option_setmodel( connection : IConnection, option : string, args : any[] ) : void
	{
		if( args.length < 2 )
        {
			throw new Exception( `Syntax: /${this.name} ${option} [id|@my] [model hash|name]` );
        }

		if( connection.Player == null )
		{
			return;
		}

		let vehicle = args[ 0 ] == "@my" ? connection.Player.GetVehicle() as Entity.Vehicle : this.service.Get( Number( args[ 0 ] ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + args[ 0 ] + "' not found" );
		}

		let model = Number( args[ 1 ] ) || mp.joaat( args[ 1 ] );

		if( VehicleModel[ model ] == null )
        {
			throw new Exception( "Invalid vehicle model name\\hash " + args[ 1 ] );
        }

		connection.Send( new ServerPacket.ChatMessage( `Vehicle ${vehicle.GetName()} (ID: ${vehicle.GetID()}) model changed to ` + VehicleModel[ model ], ChatType.Notice ) );
	
		vehicle.SetModel( model );
		vehicle.Persist( this.service.GetRepository() );
	}

	private Option_setspawn( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

		let vehicle = args[ 0 ] ? this.service.Get( Number( args[ 0 ] ) ) : ( connection.Player.GetVehicle() as Entity.Vehicle );

		if( vehicle == null )
		{
			throw new Exception( `Syntax: /${this.name} ${option} [id]` );
		}

		let position  = connection.Player.GetPosition();
		let rotation  = connection.Player.GetRotation();
		let dimension = connection.Player.GetDimension();

		vehicle[ "defaultPosition" ]  = position;
		vehicle[ "defaultRotation" ]  = rotation;
		vehicle[ "defaultDimension" ] = dimension;

		vehicle.Persist( this.service.GetRepository() );

		connection.Send( new ServerPacket.ChatMessage( `Vehicle ${vehicle.GetName()} (ID: ${vehicle.GetID()}) default spawn changed`, ChatType.Notice ) );
	}

	private Option_spawn( connection : IConnection, option : string, args : any[] ) : void
	{
		if( connection.Player == null )
		{
			return;
		}

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

		let rotation  = connection.Player.GetRotation();
		let position  = connection.Player.GetPosition().Offset( 2.5, rotation.Z );
		let dimension = connection.Player.GetDimension();
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

		connection.Send( new ServerPacket.ChatMessage( "Временный '" + vehicle.GetName() + "' создан, ID: " + vehicle.GetID(), ChatType.Notice ) );
	}

	private Option_setplate( connection : IConnection, option : string, args : any[] ) : void
	{
		if( args.length < 2 )
        {
			throw new Exception( `Syntax: /${this.name} ${option} [id|@my] [plate]` );
        }

		if( connection.Player == null )
		{
			return;
		}

		let vehIdName = args.shift();
		let vehicle = vehIdName == "@my" ? connection.Player.GetVehicle() as Entity.Vehicle : this.service.Get( Number( vehIdName ) );

		if( vehicle == null )
		{
			throw new Exception( "Vehicle with id '" + vehIdName + "' not found" );
		}

		let plateText = args.join( ' ' );

		vehicle.SetPlate( plateText );
		vehicle.Persist( this.service.GetRepository() );

		connection.Send( new ServerPacket.ChatMessage( `Vehicle ${vehicle.GetName()} (ID: ${vehicle.GetID()}) plate text changed to ${plateText}`, ChatType.Notice ) );
	}

	private Option_undefined( connection : IConnection, option : string, args : any[] )
	{
		connection.Send( new ServerPacket.ChatMessage( "Syntax: /" + this.name + " <option>", ChatType.Notice ) );
	}
}
