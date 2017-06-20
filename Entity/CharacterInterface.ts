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

interface CharacterInterface
{
	GetID() : number;
	GetName() : string;
	SetPlayer( player : PlayerInterface ) : void;
	SetName( name : string, lastname : string ) : void;
	Spawn( position ?: Vector3, rotation ?: Vector3, dimension ?: number ) : void;
	GetModel() : number;
	SetModel( model : number ) : void;
	GetAlpha() : number;
	SetAlpha( alpha : number ) : void;
	GetPosition() : Vector3;
	SetPosition( position : Vector3 ) : void;
	GetDimension() : number;
	SetDimension( dimension : number ) : void;
	GetRotation() : Vector3;
	SetRotation( rotation : Vector3 ) : void;
	GetHealth() : number;
	SetHealth( health : number ) : void;
	GetArmor() : number;
	SetArmor( armor : number ) : void;
	GetEyeColor() : number;
	SetEyeColor( eyeColor : number ) : void;
	GetHairColor() : number;
	SetHairColor( hairColor : number ) : void;
	SetHairColor( firstColor : number, secondColor : number ) : void;
	GetHairHighlightColor() : number;
	SetHairHighlightColor( hairHighlightColor : number ) : void;
	GetAction() : string;
	IsInVehicle() : boolean;
	GetVehicle() : VehicleInterface;
	GetVehicleSeat() : number;
	GetWeapon() : number;
	IsAiming() : boolean;
	IsJumping() : boolean;
	IsInCover() : boolean;
	IsClimbing() : boolean;
	IsEnteringVehicle() : boolean;
	IsLeavingVehicle() : boolean;
	GiveWeapon( weapon : Weapon, ammo : number ) : void;
	GiveWeapon( weapon : Weapon[], ammo : number ) : void;
	GetClothes( component : mp.PlayerClothesComponent ) : mp.PlayerClothes;
	SetClothes( component : mp.PlayerClothesComponent, drawable : number, texture : number, palette : number ) : void;
	GetProp( prop : mp.PlayerPropID ) : mp.PlayerProp;
	SetProp( prop : mp.PlayerPropID, drawable : number, texture : number ) : void;
	PutIntoVehicle( vehicle : VehicleInterface, seat : number ) : void;
	RemoveFromVehicle() : void;
	GetHeadBlend() : mp.PlayerBlend;
	SetHeadBlend( shapeFirstID : number, shapeSecondID : number, shapeThirdID : number, skinFirstID : number, skinSecondID : number, skinThirdID : number, shapeMix : number, skinMix : number, thirdMix : number ) : void;
	UpdateHeadBlend( ...args : any[] ) : void;
	SetFaceFeature( index : number, scale : number ) : void;
	GetFaceFeature() : void;
	PlayAnimation( block : string, anim : string ) : void;
	PlayScenario( ...args : any[] ) : void;
	StopAnimation( ...args : any[] ) : void;
}
