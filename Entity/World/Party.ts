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

import { Player } from "../Player";

export class Party
{
	public Members    : Array< Player >;
    public Experience : number;

	public constructor( ...members : Player[] )
	{
		members.forEach( member => member.Party = this );

		this.Members = new Array< Player >( ...members );
	}
}
