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

import { Player } from "Entity/Player";

export abstract class Request
{
	public static readonly DefaultTimeout = 20 * 1000;

	public ID         : GUID;
	public Owner      : Player;
	public Target     : Player;
	public Type       : RequestType;
	public Timeout    : number;
	public Date       : Date;

	public InProgress : boolean;

	public constructor( type : RequestType, timeout : number = Request.DefaultTimeout )
	{
		this.ID         = new GUID();
		this.Type       = type;
		this.Timeout    = timeout;
		this.Date       = new Date();
		this.InProgress = false;
	}

	public abstract Accept() : void;
	public abstract Reject() : void;

	public abstract IsValid() : boolean;
}
