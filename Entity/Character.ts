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

import * as ORM from "typeorm";

import { Entity } from "./Entity";
import { Player } from "./Player";
import { User }   from "./User";
import { Vehicle } from "./Vehicle";

@ORM.Entity( "characters" )
export class Character
{
	@ORM.PrimaryGeneratedColumn()
	protected id  : number;
	
	@ORM.Column( "int" )
	public user_id : number;

	@ORM.Column( "int" )
	protected level : number;

	@ORM.Column( "int" )
	protected model : number;

	@ORM.Column()
	protected position : string;

	@ORM.Column()
	protected rotation : string;

	@ORM.Column( "int" )
	protected dimension : number;

	@ORM.Column()
	protected name : string;
	
	@ORM.Column()
	protected lastname : string;
	
	@ORM.Column( "bigint" )
	protected money : number;
	
	@ORM.Column( "float" )
	protected health : number;

	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : string;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : string;

	protected entity : mp.Player = null;
	protected player : Player    = null;

	public constructor( player : Player )
	{
		if( player )
		{
			this.player = player;
			this.entity = player.GetEntity() as mp.Player;
		}
	}

	public GetID() : number
	{
		return this.id;
	}

	public GetName() : string
	{
		return this.name;
	}

	public GetLastName() : string
	{
		return this.lastname;
	}

	public GetFullName() : string
	{
		return this.name + " " + this.lastname;
	}

	public SetName( name : string, lastname : string ) : void
	{
		this.name     = name;
		this.lastname = lastname;

		this.entity.name = this.name +  " " + this.lastname;
	}

	public Spawn( position : Vector3 ) : void
	{
		this.entity.spawn( position );
	}

	public GetModel() : number
	{
		return this.entity.model;
	}

	public SetModel( model : number ) : void
	{
		this.entity.model = model;
	}

	public GetAlpha() : number
	{
		return this.entity.alpha;
	}

	public SetAlpha( alpha : number ) : void
	{
		this.entity.alpha = alpha;
	}

	public GetPosition() : Vector3
	{
		return new Vector3( this.entity.position.x, this.entity.position.y, this.entity.position.z );
	}

	public SetPosition( position : Vector3 ) : void
	{
		this.entity.position = position;
	}

	public GetDimension() : number
	{
		return this.entity.dimension;
	}

	public SetDimension( dimension : number ) : void
	{
		this.entity.dimension = dimension;
	}

	public GetRotation() : Vector3
	{
		return new Vector3( 0, 0, this.entity.heading );
	}

	public SetRotation( rotation : Vector3 ) : void
	{
		this.entity.heading = rotation.Z;
	}

	public GetHealth() : number
	{
		return this.entity.health;
	}

	public SetHealth( health : number ) : void
	{
		this.entity.health = health;
	}

	public GetArmor() : number
	{
		return this.entity.armour;
	}

	public SetArmor( armor : number ) : void
	{
		this.entity.armour = armor;
	}

	public GetEyeColor() : number
	{
		return this.entity.eyeColour;
	}

	public SetEyeColor( eyeColor : number ) : void
	{
		this.entity.eyeColour = eyeColor;
	}

	public GetHairColor() : number
	{
		return this.entity.hairColour;
	}

	public SetHairColor( hairColor : number ) : void;
	public SetHairColor( firstColor : number, secondColor : number ) : void;

	public SetHairColor( firstColor : number, secondColor ?: any ) : void
	{
		if( secondColor == null )
		{
			this.entity.hairColour = firstColor;

			return;
		}

		this.entity.setHairColour( firstColor, secondColor );
	}

	public GetHairHighlightColor() : number
	{
		return this.entity.hairHighlightColour;
	}

	public SetHairHighlightColor( hairHighlightColor : number ) : void
	{
		this.entity.hairHighlightColour = hairHighlightColor;
	}

	public GetAction() : string
	{
		return this.entity.action;
	}

	public IsInVehicle() : boolean
	{
		return this.entity.vehicle != null;
	}

	public GetVehicle() : Vehicle
	{
		return this.entity.vehicle ? Vehicle.FindOrCreate< Vehicle >( this.entity.vehicle ) : null;
	}

	public GetVehicleSeat() : number
	{
		return this.entity.seat;
	}

	public GetWeapon() : number
	{
		return this.entity.weapon;
	}

	public GetPing() : number
	{
		return this.entity.ping;
	}

	public GetIP() : string
	{
		return this.entity.ip;
	}

	public IsAiming() : boolean
	{
		return this.entity.isAiming;
	}

	public IsJumping() : boolean
	{
		return this.entity.isJumping;
	}

	public IsInCover() : boolean
	{
		return this.entity.isInCover;
	}

	public IsClimbing() : boolean
	{
		return this.entity.isClimbing;
	}

	public IsEnteringVehicle() : boolean
	{
		return this.entity.isEnteringVehicle;
	}

	public IsLeavingVehicle() : boolean
	{
		return this.entity.isLeavingVehicle;
	}

	public Kick( reason : string ) : void
	{
		this.entity.kick( reason );
	}

	public Ban( reason : string ) : void
	{
		this.entity.ban( reason );
	}

	public GiveWeapon( weapon : Weapon, ammo : number ) : void;
	public GiveWeapon( weapon : Weapon[], ammo : number ) : void;
	
	public GiveWeapon( weapon : any, ammo : number ) : void
	{
		this.entity.giveWeapon( weapon, ammo );
	}

	public GetClothes( component : mp.PlayerClothesComponent ) : mp.PlayerClothes
	{
		return this.entity.getClothes( component );
	}

	public SetClothes( component : mp.PlayerClothesComponent, drawable : number, texture : number, palette : number ) : void
	{
		this.entity.setClothes( component, drawable, texture, palette );
	}

	public GetProp( prop : mp.PlayerPropID ) : mp.PlayerProp
	{
		return this.entity.getProp( prop );
	}

	public SetProp( prop : mp.PlayerPropID, drawable : number, texture : number ) : void
	{
		this.entity.setProp( prop, drawable, texture );
	}

	public PutIntoVehicle( vehicle : Vehicle, seat : number ) : void
	{
		this.entity.putIntoVehicle( vehicle.GetEntity() as mp.Vehicle, seat );
	}

	public RemoveFromVehicle() : void
	{
		this.entity.removeFromVehicle();
	}

	public GetHeadBlend() : mp.PlayerBlend
	{
		return this.entity.getHeadBlend();
	}

	public SetHeadBlend( shapeFirstID : number, shapeSecondID : number, shapeThirdID : number, skinFirstID : number, skinSecondID : number, skinThirdID : number, shapeMix : number, skinMix : number, thirdMix : number ) : void
	{
		this.entity.setHeadBlend( shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix );
	}

	public UpdateHeadBlend( ...args : any[] ) : void
	{
		this.entity.updateHeadBlend( ...args );
	}

	public SetFaceFeature( index : number, scale : number ) : void
	{
		this.entity.setFaceFeature( index, scale );
	}

	public GetFaceFeature() : void
	{
		return this.GetFaceFeature();
	}

	public PlayAnimation( block : string, anim : string ) : void
	{
		this.entity.playAnimation( block, anim );
	}

	public PlayScenario( ...args : any[] ) : void
	{
		this.entity.playScenario( ...args );
	}

	public StopAnimation( ...args : any[] ) : void
	{
		this.entity.stopAnimation( ...args );
	}
}
