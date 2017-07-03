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

import * as Entity from "Entity";
import { Request } from "../Request";
import { Server }  from "Server";

export class Party extends Request
{
	public constructor( target : Entity.Player )
	{
		super( RequestType.PartyInvite );

		this.Target = target;
	}

	public Accept() : void
	{
		if( this.Owner.Party == null && this.Target.Party == null )
        {
            Server.PartyService.CreateParty( this.Owner, this.Target );
        }
        else if( this.Owner.Party != null )
        {
            Server.PartyService.AddPlayerToParty( this.Target, this.Owner.Party );
        }
	}

	public Reject() : void
	{
	}

	public IsValid() : boolean
	{
		return this.Target != null;
	}
}
