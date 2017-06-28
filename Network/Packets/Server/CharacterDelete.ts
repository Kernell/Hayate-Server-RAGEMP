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

import { ServerPacket } from "./ServerPacket";

export class CharacterDelete extends ServerPacket
{
	public ToJSON()
	{
		return {};
	}
}
