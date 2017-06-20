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

interface VehicleInterface extends EntityInterface
{
	Delete           () : void;
	IsDeleted        () : boolean;
	Restore          () : void;
	GetID            () : number;
	GetName          () : string;
	GetPlate         () : string;
	SetPlate         ( text : string ) : void;
	GetColor         () : VehicleColor;
	SetColor         ( color : VehicleColor ) : void;
	GetVelocity      () : Vector3;
	SetVelocity      ( velocity : Vector3 ) : void;
	GetSirensState   () : boolean;
	SetSirensState   ( siren : boolean ) : void;
	GetHornState     () : boolean;
	SetHornState     ( horn : boolean ) : void;
	GetEngineState   () : boolean;
	SetEngineState   ( engine : boolean ) : void;
	GetLightsState   () : number;
	SetLightsState   ( lights : number ) : void;
	GetEngineHealth  () : number;
	SetEngineHealth  ( engineHealth : number ) : void;
	GetBodyHealth    () : number;
	SetBodyHealth    ( bodyHealth : number ) : void;
	GetSteerAngle    () : number;
	SetSteerAngle    ( steerAngle : number ) : void;
	IsLocked         () : boolean;
	SetLocked        ( locked : boolean ) : void;
	IsNeonEnabled    () : boolean;
	SetNeonEnabled   ( neonEnabled : boolean ) : void;
	HaveRocketBoost  () : boolean;
	IsBraking        () : boolean;
	IsDead           () : boolean;
	Fix              () : void;
	SetNeonColor     ( color : Color ) : void;
	GetNeonColor     () : Color;
	SetMod           ( type : mp.VehicleModTypes, index : any, customTires : any ) : void;
	GetMod           ( type : mp.VehicleModTypes ) : number;
	SetPaint         ( ...args : any[] ) : void;
	GetPaint         () : any;
	GetOccupant      () : any;
	SetOccupant      ( ...args : any[] ) : void;
	GetOccupants     () : any;
	Explode          ( silent ?: boolean, invisible ?: boolean ) : void;
	Spawn            ( ...args : any[] ) : void;
}
