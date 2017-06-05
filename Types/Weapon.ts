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

enum Weapon
{
	// Melee
	Unarmed              = -1569615261,
	Knife                = -1716189206,
	Nightstick           = 1737195953,
	Hammer               = 1317494643,
	Bat                  = -1786099057,
	Crowbar              = -2067956739,
	Golfclub             = 1141786504,
	Bottle               = -102323637,
	Dagger               = -1834847097,
	Hatchet              = -102973651,
	KnuckleDuster        = -656458692,
	Machete              = -581044007,
	Flashlight           = -1951375401,
	SwitchBlade          = -538741184,
	Poolcue              = -1810795771,
	Wrench               = 419712736,
	Battleaxe            = -853065399,

	// Handguns

	Pistol               = 453432689,
	CombatPistol         = 1593441988,
	Pistol50             = -1716589765,
	SNSPistol            = -1076751822,
	HeavyPistol          = -771403250,
	VintagePistol        = 137902532,
	MarksmanPistol       = -598887786,
	Revolver             = -1045183535,
	APPistol             = 584646201,
	StunGun              = 911657153,
	FlareGun             = 1198879012,

	// Machine Guns
	MicroSMG             = 324215364,
	MachinePistol        = -619010992,
	SMG                  = 736523883,
	AssaultSMG           = -270015777,
	CombatPDW            = 171789620,
	MG                   = -1660422300,
	CombatMG             = 2144741730,
	Gusenberg            = 1627465347,
	MiniSMG              = -1121678507,

	// Assault Rifles
	AssaultRifle         = -1074790547,
	CarbineRifle         = -2084633992,
	AdvancedRifle        = -1357824103,
	SpecialCarbine       = -1063057011,
	BullpupRifle         = 2132975508,
	CompactRifle         = 1649403952,

	// Sniper Rifles
	SniperRifle          = 100416529,
	HeavySniper          = 205991906,
	MarksmanRifle        = -952879014,

	// Shotguns
	PumpShotgun          = 487013001,
	SawnoffShotgun       = 2017895192,
	BullpupShotgun       = -1654528753,
	AssaultShotgun       = -494615257,
	Musket               = -1466123874,
	HeavyShotgun         = 984333226,
	DoubleBarrelShotgun  = -275439685,

	Autoshotgun          = 317205821,

	// Heavy Weapons
	GrenadeLauncher      = -1568386805,
	RPG                  = -1312131151,
	Minigun              = 1119849093,
	Firework             = 2138347493,
	Railgun              = 1834241177,
	HomingLauncher       = 1672152130,
	GrenadeLauncherSmoke = 1305664598,
	CompactLauncher      = 125959754,

	//Thrown Weapons
	Grenade              = -1813897027,
	StickyBomb           = 741814745,
	ProximityMine        = -1420407917,
	BZGas                = -1600701090,
	Molotov              = 615608432,
	FireExtinguisher     = 101631238,
	PetrolCan            = 883325847,
	Flare                = 1233104067,
	Ball                 = 600439132,
	Snowball             = 126349499,
	SmokeGrenade         = -37975472,
	Pipebomb             = -1169823560,

	//Parachute
	Parachute            = -72657034,
}

module.exports = Weapon;
