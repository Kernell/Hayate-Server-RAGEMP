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

declare namespace mp
{
	// Generates hash using string. Those hashes could be used to set entity model
	export function joaat( name : string )   : number;

	// Generates arrays of hashes using arrays of strings. Those hashes could be used to set entity model
	export function joaat( name : string[] ) : number[];

	export class Vector3
	{
		public x : number;
		public y : number;
		public z : number;

		constructor( x : number, y : number, z : number );
	}

	export interface PlayerClothes
	{
		readonly drawable : number; 
		readonly texture  : number;
		readonly palette  : number;
	}

	enum PlayerClothesComponent
	{
		Head      = 0,  // Head
		Beard     = 1,  // Beard
		Hair      = 2,  // Hair
		Torso     = 3,  // Torso
		Legs      = 4,  // Legs
		Hands     = 5,  // Hands
		Foot      = 6,  // Foot
		Unk       = 7,  // None?
		Misc      = 8,  // Accessories like parachute, scuba tank
		Misc2     = 9,  // Accessories like bags, mask, scuba mask
		Decals    = 10, // Decals and mask
		Auxiliary = 11, // Auxiliary parts for torso
	}

	export interface PlayerProp
	{
		readonly drawable : number; 
		readonly texture  : number;
	}

	enum PlayerPropID
	{
		Helmet  = 0, // Helmets, hats, earphones, masks
		Glasses = 1, // Glasses
		Ear     = 2, // Ear accessories
	}

	export interface PlayerBlend
	{
		shapeFirstID  : number;
		shapeSecondID : number;
		shapeThirdID  : number;
		skinFirstID   : number;
		skinSecondID  : number;
		skinThirdID   : number;
		shapeMix      : number;
		skinMix       : number;
		thirdMix      : number;
	}

	enum VehicleModTypes
	{
		Spoiler         = 0,
		FrontBumper     = 1,
		RearBumper      = 2,
		Sideskirt       = 3,
		Exhaust         = 4,
		Chassis         = 5,
		Grille          = 6,
		Hood            = 7,
		Fender          = 8,
		RightFender     = 9,
		Roof            = 10,
		Engine          = 11,
		Brakes          = 12,
		Transmission    = 13,
		Horns           = 14,
		Suspension      = 15,
		Armor           = 16,
		Unk17           = 17,
		Turbo           = 18,
		Unk19           = 19,
		TireSmoke       = 20,
		Unk21           = 21,
		XenonLights     = 22,
		FrontWheels     = 23,
		BackWheels      = 24,
 
		// Benny's
		PlateHolder     = 25,
		VanityPlates    = 26,
		Trim            = 27,
		Ornaments       = 28,
		Dashboard       = 29,
		Dial            = 30,
		DoorSpeaker     = 31,
		Seats           = 32,
		SteeringWheel   = 33,
		ShifterLeavers  = 34,
		Plaques         = 35,
		Speakers        = 36,
		Trunk           = 37,
		Hydraulics      = 38,
		EngineBlock     = 39,
		AirFilter       = 40,
		Struts          = 41,
		ArchCover       = 42,
		Aerials         = 43,
		Trim2           = 44,
		Tank            = 45,
		Windows         = 46,
		Unk47           = 47,
		Livery          = 48,
	}

	enum VehicleModHorns
	{
		Stock           = -1,
		Truck           = 0,
		Police          = 1,
		Clown           = 2,
		Musical1        = 3,
		Musical2        = 4,
		Musical3        = 5,
		Musical4        = 6,
		Musical5        = 7,
		SadTrombone     = 8,
		Calssical1      = 9,
		Calssical2      = 10,
		Calssical3      = 11,
		Calssical4      = 12,
		Calssical5      = 13,
		Calssical6      = 14,
		Calssical7      = 15,
		ScaleDo         = 16,
		ScaleRe         = 17,
		ScaleMi         = 18,
		ScaleFa         = 19,
		ScaleSol        = 20,
		ScaleLa         = 21,
		ScaleTi         = 22,
		ScaleDoHigh     = 23,
		Jazz1           = 24,
		Jazz2           = 25,
		Jazz3           = 26,
		JazzLoop        = 27,
		StarsPangBan1   = 28,
		StarsPangBan2   = 29,
		StarsPangBan3   = 30,
		StarsPangBan4   = 31,
		ClassicalLoop1  = 32,
		Classical8      = 33,
		ClassicalLoop2  = 34,
	}

	enum VehicleWheelTypes
	{
		Stock           = -1,
		Sport           = 0,
		Muscle          = 1,
		Lowrider        = 2,
		Suv             = 3,
		Offroad         = 4,
		Tuner           = 5,
		BikeWheels      = 6,
		Highend         = 7,
	}

	enum VehicleWheelTuner
	{
		Stock = -1,
		Cosmo,
		Supermesh,
		Outsider,
		Rollas,
		Driffmeister,
		Slicer,
		Elquatro,
		Dubbed,
		Fivestar,
		Slideways,
		Apex,
		Stancedeg,
		CounterSteer,
		Endov1,
		Endov2dish,
		Guppez,
		Chokadori,
		Chicane,
		Saisoku,
		Dishedeight,
		Fujiwara,
		Zokusha,
		Battlevlll,
		RallyMaster,
	}

	enum VehicleWheelHighEnd
	{
		Stock = -1,
		Shadow,
		Hypher,
		Blade,
		Diamond,
		Supagee,
		Chromaticz,
		Merciechlip,
		Obeyrs,
		GTChrome,
		CheetahR,
		Solar,
		Splitten,
		DashVIP,
		LozSpeedTen,
		CarbonInferno,
		CarbonShadow,
		CarbonZ,
		CarbonSolar,
		CarbonCheetahR,
		CarbonSRacer,
	}

	enum VehicleWheelLowrider
	{
		Stock = -1,
		Flare,
		Wired,
		TripleGolds,
		BigWorm,
		SevenFives,
		SplitSix,
		FreshMesh,
		LeadsLed,
		Turbine,
		SuperFin,
		ClassicRod,
		Dollar,
		Dukes,
		Lowfive,
		Gooch,
	}

	enum VehicleWheelMuscle
	{
		Stock = -1,
		ClassicFive,
		Dukes,
		MuscleFreak,
		Kracka,
		Azrea,
		Mecha,
		BlackTop,
		DragSpl,
		Revolver,
		ClassicRod,
		Fairlre,
		Spooner,
		Fivestar,
		OldSchool,
		Eljefe,
		Dodman,
		SixGun,
		Mercenary
	}

	enum VehicleWheelOffroad
	{
		Stock = -1,
		Raider,
		Mudslinger,
		Nevis,
		Cairngorm,
		Amazon,
		Challenger,
		Dunebasher,
		Fivestar,
		RockCrawler,
		Milspecsteelie,
	}

	enum VehicleWheelSport
	{
		Stock = -1,
		Inferno,
		DeepFive,
		LozSpeed,
		DiamondCut,
		Chrono,
		Feroccirr,
		Fiftynine,
		Mercie,
		Syntheticz,
		OrganicTyped,
		Endov1,
		Duper7,
		Uzer,
		GroundRide,
		Sracer,
		Venum,
		Cosmo,
		DashVIP,
		Icekid,
		Ruffweld,
		WangenNaster,
		SuperFive,
		Endov2,
		SlitSix,
	}

	enum VehicleWheelSUV
	{
		Stock = -1,
		VIP,
		Benefactor,
		Cosmo,
		Bippu,
		RoyalSix,
		Fagorme,
		Deluxe,
		Icedout,
		Cognscenti,
		LozSpeedTen,
		SuperNova,
		Obeyrs,
		LozSpeedBaller,
		Extravaganzo,
		SplitSix,
		Empowered,
		Sunrise,
		DashVIP,
		Cutter,
	}

	enum VehicleWheelMotocycle
	{
		Stock = -1,
		Speedway,
		StreetSpecial,
		Racer,
		Trackstar,
		Overlord,
		Trident,
		Triplethreat,
		Stilleto,
		Wires,
		Bobber,
		Solidus,
		Iceshield,
		Loops,
	}

	enum VehicleWindowTints
	{
		None,
		PureBlack,
		DarkSmoke,
		LightSmoke,
		Stock,
		Limo,
		Green,
	}

	enum VehiclePlateTextType
	{
		BlueOnWhite1,
		YellowOnBlack,
		YellowOnBlue,
		BlueOnWhite2,
		BlueOnWhite3,
		Yankton,
	}

	export interface Entity
	{
		id           : number;
		model        : number;
		type         : string;
		alpha        : number;
		position     : Vector3;
		rotation     : Vector3;
		dimension    : number;

		destroy()    : void;
	}

	export interface Player extends Entity
	{
		name                : string;
		heading             : number;
		health              : number;
		armour              : number;
		eyeColour           : number;
		hairColour          : number;
		hairHighlightColour : number;

		readonly action     : string;
		readonly vehicle    : Vehicle;
		readonly seat       : number;
		readonly weapon		: number;
		readonly ping       : number;
		readonly ip         : string;

		readonly isAiming          : boolean;
		readonly isJumping         : boolean;
		readonly isInCover         : boolean;
		readonly isClimbing        : boolean;
		readonly isEnteringVehicle : boolean;
		readonly isLeavingVehicle  : boolean;

		kick                ( reason : string ) : void;
		ban					( reason : string ) : void;
		spawn				( position : Vector3 ) : void;
		giveWeapon			( weaponHash : number, ammo : number ) : void;
		giveWeapon			( weaponHash : number[], ammo : number ) : void;
		outputChatBox		( message : string ) : void;
		getClothes			( component : PlayerClothesComponent ) : PlayerClothes;
		setClothes			( component : PlayerClothesComponent, drawable : number, texture : number, palette : number ) : void;
		getProp				( prop : PlayerPropID ) : PlayerProp;
		setProp				( prop : PlayerPropID, drawable : number, texture : number ) : void;
		putIntoVehicle		( vehicle : Vehicle, seat : number ) : void;
		removeFromVehicle	() : void;
		invoke				( hash : string, ...args : any[] ) : void;
		call				( eventName : string, ...args : any[] ) : void;
		notify				( message : string ) : void;
		getHeadBlend		() : PlayerBlend;
		setHeadBlend		( shapeFirstID : number, shapeSecondID : number, shapeThirdID : number, skinFirstID : number, skinSecondID : number, skinThirdID : number, shapeMix : number, skinMix : number, thirdMix : number ) : void;
		updateHeadBlend		( ...args : any[] ) : void;
		setFaceFeature		( index : number, scale : number ) : void;
		getFaceFeature		() : void;
		setHairColour		( firstColor : number, secondColor : number ) : void;
		playAnimation		( block : string, anim : string ) : void;
		playScenario		( ...args : any[] ) : void;
		stopAnimation		( ...args : any[] ) : void;
	}

	export interface Vehicle extends Entity
	{
		rotation	          : Vector3;
		velocity	          : Vector3;
		siren                 : boolean;
		horn                  : boolean;
		engine                : boolean;
		highbeams             : any;
		engineHealth          : number;
		bodyHealth            : number;
		steerAngle            : number;
		locked                : boolean;
		numberPlate           : string;
		neonEnabled           : boolean;
		
		readonly rocketBoost  : boolean;
		readonly brake        : boolean;
		readonly dead         : boolean;

		repair                () : void;
		destroy               () : void;
		setNeonColour         ( red : number, green : number, blue : number ) : void;
		getNeonColour         () : number[];
		setMod                ( type : VehicleModTypes, index : any, customTires : any ) : void;
		getMod                ( type : VehicleModTypes ) : number;
		setColour             ( color : number, color2 : number ) : void;
		setColourRGB          ( red : number, green : number, blue : number, red2 : number, green2 : number, blue2 : number ) : void;
		setPaint              ( ...args : any[] ) : void;
		getColour             () : number[];
		getColourRGB          () : number[];
		getPaint              () : any;
		getOccupant           () : any;
		setOccupant           ( ...args : any[] ) : void;
		getOccupants          () : any;
		explode               ( sound ?: boolean, invisible ?: boolean ) : void;
		spawn                 ( ...args : any[] ) : void;
	}

	export interface Object extends Entity
	{
	}

	export interface Pickup extends Entity
	{
		pickupHash: number;
	}

	export interface Blip extends Entity
	{
		model  : number;
		radius : number;
		colour : number;
		name   : string;
		scale  : number;
		alpha  : number;

		routeFor   ( player : Player ) : void;
		unrouteFor ( player : Player ) : void;
	}

	export interface Checkpoint extends Entity
	{
		radius      : number;
		colour      : number;
		destination : Vector3;
		visible     : boolean;

		showFor     ( player : Player ) : void;
		hideFor     ( player : Player ) : void;
		getColour   () : number[];
		setColour   ( red : number, green : number, blue : number, alpha : number ) : void;
	}

	export interface Marker extends Entity
	{
		scale       : number;
		colour      : number;
		direction   : Vector3;
		visible     : boolean;

		showFor     ( player : Player ) : void;
		hideFor     ( player : Player ) : void;
		getColour   () : number[];
		setColour   ( red : number, green : number, blue : number, alpha : number ) : void;
	}

	export class Pool
	{
		// Used for get pool elements count
		readonly length : number;
		readonly size   : number;

		// Used for return element from pool at ID
		static at                 ( id : number ) : Entity;

		// Used for call function for each elements in pool
		static forEach            ( func : Function ) : void;
		static forEachInRange     ( range : number, func : Function ) : void;
		static forEachInDimension ( dimension : number, func : Function ) : void;

		// Converts pool to JavaScript array
		static toArray            () : Entity[];
		static apply              () : void;
	}

	export class players extends Pool
	{
		static broadcast                 ( text : string ) : void;
		static broadcastInRange          ( position : Vector3, range : number, text : string ) : void;
		static broadcastInRange          ( position : Vector3, range : number, dimesion : number, text : string ) : void;
		static broadcastInDimension      ( dimesion : number, text : string ) : void;
		static call                      ( event : string, ...args : any[] ) : void;
		static callInRange               ( ...args : any[] ) : void;
		static callInDimension           ( ...args : any[] ) : void;
	}

	export class vehicles extends Pool
	{
		static new( hash : number, position : Vector3, heading ?: number, dimension ?: number ) : Vehicle;
	}

	export class objects extends Pool
	{
		static new( objectHash : number, position : Vector3, rotation: Vector3 ) : Object
	}

	export class pickups extends Pool
	{
	}

	export class blips extends Pool
	{
		static new( position : Vector3 ) : Blip;
		static new( position : Vector3, radius : number ) : Blip;
		static new( attachedEntity : Entity ) : Blip;
	}

	export class markers extends Pool
	{
	}

	export class checkpoints extends Pool
	{
		static new( type : Number, position : Vector3, rotation : Vector3, direction : Vector3, radius : number, red : number, green : number, blue : number, alpha : number ) : Checkpoint;
		static new( type : Number, position : Vector3, rotation : Vector3, direction : Vector3, radius : number, red : number, green : number, blue : number, alpha : number, visible : boolean ) : Checkpoint;
		static new( type : Number, position : Vector3, rotation : Vector3, direction : Vector3, radius : number, red : number, green : number, blue : number, alpha : number, dimension : number ) : Checkpoint;
		static new( type : Number, position : Vector3, rotation : Vector3, direction : Vector3, radius : number, red : number, green : number, blue : number, alpha : number, visible : boolean, dimension : number ) : Checkpoint;
	}

	export class events
	{
		// Register event handlers
		static add( events : any ) : void;

		// Calls registered event handlers
		static call( name : string, ...args : any[] ) : void;

		// Register command handler
		static addCommand( command : string, handler : Function ) : void;
	}

	interface Time
	{
		hour   : number;
		minute : number;
		second : number;
	}

	export class Environment
	{
		weather : string;
		time    : Time;

		public static setWeatherTransition( ...args : any[] ) : void;
	}
}
