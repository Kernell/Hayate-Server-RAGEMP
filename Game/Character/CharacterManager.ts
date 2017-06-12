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

import Server           from "../../Server";
import ManagerBase      from "../../Core/ManagerBase";
import { Entity }       from "../../Entity/Entity";
import { Player }       from "../../Entity/Player";

export class CharacterManager extends ManagerBase< Entity >
{
	public constructor( server : Server )
	{
		super( server );

		this.RegisterEvent( "playerCharacterCreate", this.OnCreate );
		this.RegisterEvent( "playerCharacterSelect", this.OnSelect );
		this.RegisterEvent( "playerCharacterLogin",  this.OnLogin );
		this.RegisterEvent( "playerCharacterLogout", this.OnLogout );
	}

	public OnCreate( player : Player, name : string, surname : string ) : Promise< any >
	{
		return null;
	}

	public OnSelect( player : Player, characterId : number ) : Promise< any >
	{
		return null;
	}

	public OnLogin( player : Player, characterId : number ) : Promise< any >
	{
		return null;
	}

	public OnLogout( player : Player ) : Promise< any >
	{
		return null;
	}
}
