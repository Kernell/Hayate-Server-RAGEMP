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

import { SystemMessage } from "Network/Packets/Server";

export class SystemMessages
{
	public static YoureNotInAParty                         = new SystemMessage( "Вы не состоите в группе" );
	public static ThePartyIsFull                           = new SystemMessage( "Нет места в этой группе" );
	public static PartyDisbanded                           = new SystemMessage( "Группа была расформирована лидером" );
	public static PartyPlayerPromoted                      = ( promoted : PlayerInterface, promoter : PlayerInterface ) => new SystemMessage( "Группа была расформирована лидером" );
}
