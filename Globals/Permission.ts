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

class Permission
{
	public static Developer                             = new Permission( 'general.developer' );
	public static UnlimitedCharacters                   = new Permission( 'general.unlim_chars' );
	public static CommandSystem                         = new Permission( 'command.system' );
	public static CommandUser                           = new Permission( 'command.user' );
	public static CommandPlayer                         = new Permission( 'command.player' );
	public static CommandPlayerModel                    = new Permission( 'command.player.model' );
	public static CommandPlayerClothes                  = new Permission( 'command.player.clothes' );
	public static CommandPlayerProp                     = new Permission( 'command.player.prop' );
	public static CommandPlayerHairColor                = new Permission( 'command.player.haircolor' );
	public static CommandInterior                       = new Permission( 'command.interior' );
	public static CommandInteriorShow                   = new Permission( 'command.interior.show' );
	public static CommandVehicle                        = new Permission( 'command.vehicle' );
	public static CommandVehicleSpawn                   = new Permission( 'command.vehicle.spawn' );

	protected name : string;

	protected constructor( name : string )
	{
		this.name = name;
	}

	public toString() : string
	{
		return this.name;
	}
}

module.exports = Permission;
