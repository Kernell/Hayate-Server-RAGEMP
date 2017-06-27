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
import { Vehicle } from "./Vehicle";
import { Account } from "./Account";
import { Party }   from "./World/Party";

@ORM.Entity( "characters" )
export class Player implements PlayerInterface
{
	public static readonly MONEY_MAX = 0xFFFFFFFF;

	@ORM.PrimaryGeneratedColumn()
	protected id  : number;
	
	@ORM.ManyToOne( type => Account )
	@ORM.JoinColumn( { name: "account_id" } )
	protected account : Account;

	protected level : number = 1;

	@ORM.Column( "bigint" )
	protected experience : number = 0;

	@ORM.Column( "int" )
	protected model : number = Ped.Player_Zero;

	@ORM.Column( "json" )
	protected position : Vector3 = new Vector3( -435.517, 1123.620, 325.8544 );

	@ORM.Column( "json" )
	protected rotation : Vector3 = new Vector3();

	@ORM.Column( "int" )
	protected dimension : number = 0;

	@ORM.Column()
	protected name : string;
	
	@ORM.Column( "bigint" )
	protected money : number = 0;
	
	@ORM.Column( "float" )
	protected health : number = 1000;
	
	@ORM.Column( "float" )
	protected armor : number = 0;

	@ORM.Column( "float" )
	protected mana : number = 0;

	@ORM.Column( "float" )
	protected stamina : number = 0;

	@ORM.Column( { name: "eye_color", type: "int" } )
	protected eyeColor : number = 0;

	@ORM.Column( { name: "hair_highlight_color", type: "int" } )
	protected hairHighlightColor : number = 0;

	@ORM.CreateDateColumn( { name: "created_at" } )
	protected createdAt : Date;

	@ORM.Column( { type: "datetime", name: "deleted_at", nullable: true, default: null } )
	protected deletedAt : Date;

	protected party : Party;

	public get Party() : Party
	{
		return this.party;
	}

	public set Party( value : Party )
	{
		this.party = value;
	}

	public Connection : IConnection;

	private entity : mp.Player;

	public IsOnline() : boolean
	{
		return this.Connection != null;
	}

	public GetID() : number
	{
		return this.id;
	}

	public GetCreatedAt() : Date
	{
		return this.createdAt;
	}

	public GetDeletedAt() : Date
	{
		return this.deletedAt;
	}

	public GetName() : string
	{
		return this.name;
	}

	public Delete() : void
	{
		this.deletedAt = new Date();
	}

	public IsDeleted() : boolean
	{
		return this.deletedAt != null;
	}

	public Restore() : void
	{
		this.deletedAt = null;
	}

	public GetAccount() : AccountInterface
	{
		return this.account;
	}

	public SetAccount( account : AccountInterface ) : void
	{
		this.account = account as Account;
	}
	
	public SetName( name : string ) : void
	{
		this.entity.name = this.name = name;
	}

	public GetLevel() : number
	{
		return this.level;
	}

	public SetLevel( level : number ) : void
	{
		this.level = level;
	}

	public GetExperience() : number
	{
		return this.experience;
	}

	public SetExperience( experience : number ) : void
	{
		this.experience = experience;
	}

	public Spawn( position ?: Vector3, rotation ?: Vector3, dimension ?: number ) : void
	{
		let _rotation = rotation || this.rotation;

		this.entity.spawn( this.position = position || this.position );

		this.entity.heading   = _rotation.z;
		this.entity.dimension = dimension || this.dimension;

		this.entity.name                = this.name;
		this.entity.model               = this.model;
		this.entity.health              = this.health;
		this.entity.armour              = this.armor;
		this.entity.eyeColour           = this.eyeColor;
	//	this.entity.hairHighlightColour = this.hairHighlightColor;
	}

	public GetModel() : Ped
	{
		return this.entity.model;
	}

	public SetModel( model : Ped ) : void
	{
		this.entity.model = this.model = model;
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
		let position = this.entity.position;

		return new Vector3( position.x, position.y, position.z );
	}

	public SetPosition( position : Vector3 ) : void
	{
		this.entity.position = this.position = position;
	}

	public GetDimension() : number
	{
		return this.entity.dimension;
	}

	public SetDimension( dimension : number ) : void
	{
		this.entity.dimension = this.dimension = dimension;
	}

	public GetRotation() : Vector3
	{
		return new Vector3( 0, 0, this.entity.heading );
	}

	public SetRotation( rotation : Vector3 ) : void
	{
		this.entity.heading = ( this.rotation = rotation ).Z;
	}

	public SetMoney( money : number ) : void
	{
		this.money = money;
	}

	public GetMoney() : number
	{
		return this.money;
	}

	public TakeMoney( value : number ) : boolean
	{
		if( this.money >= value )
		{
			this.money -= value;

			return true;
		}

		return false;
	}

	public GiveMoney( value : number ) : boolean
	{
		if( this.money + value <= Player.MONEY_MAX )
		{
			this.money += value;
			
			return true;
		}

		return false;
	}

	public GetHealth() : number
	{
		return this.entity.health;
	}

	public SetHealth( health : number ) : void
	{
		this.entity.health = this.health = health;
	}

	public GetArmor() : number
	{
		return this.entity.armour;
	}

	public SetArmor( armor : number ) : void
	{
		this.entity.armour = this.armor = armor;
	}

	public GetMana() : number
	{
		return this.mana;
	}

	public SetMana( mana : number ) : void
	{
		this.mana = mana;
	}

	public GetStamina() : number
	{
		return this.stamina;
	}

	public SetStamina( stamina : number ) : void
	{
		this.stamina = stamina;
	}

	public GetEyeColor() : number
	{
		return this.entity.eyeColour;
	}

	public SetEyeColor( eyeColor : number ) : void
	{
		this.entity.eyeColour = this.eyeColor = eyeColor;
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
		this.entity.hairHighlightColour = this.hairHighlightColor = hairHighlightColor;
	}

	public GetAction() : string
	{
		return this.entity.action;
	}

	public IsInVehicle() : boolean
	{
		return this.entity.vehicle != null;
	}

	public GetVehicle() : VehicleInterface
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

	public PutIntoVehicle( vehicle : VehicleInterface, seat : number ) : void
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
