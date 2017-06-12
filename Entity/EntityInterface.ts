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

interface EntityInterface
{
	IsValid      () : boolean;
	Destroy      () : void;
	GetID        () : number;
	GetEntity    () : mp.Entity;
	GetType      () : string;
	GetModel     () : number;
	SetModel     ( model : number ) : void;
	GetAlpha     () : number;
	SetAlpha     ( alpha : number ) : void;
	GetPosition  () : Vector3;
	SetPosition  ( position : Vector3 ) : void;
	GetRotation  () : Vector3;
	GetDimension () : number;
	SetDimension ( dimension : number ) : void;
}
