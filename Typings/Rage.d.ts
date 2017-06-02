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
	
	enum VehicleModel
	{
		// DLC: Base
		Adder                          = 0xB779A091, // 3078201489
		Airbus                         = 0x4C80EB0E, // 1283517198
		Airtug                         = 0x5D0AAC8F, // 1560980623
		Akuma                          = 0x63ABADE7, // 1672195559
		Ambulance                      = 0x45D56ADA, // 1171614426
		Annihilator                    = 0x31F0B376, // 837858166
		ArmyTanker                     = 0xB8081009, // 3087536137
		ArmyTrailer                    = 0xA7FF33F5, // 2818520053
		Aseat                          = 0xA62B7B98, // 2787867544
		Asea2                          = 0x9441D8D5, // 2487343317
		Asterope                       = 0x8E9254FB, // 2391954683
		Bagger                         = 0x806B9CC3, // 2154536131
		BaleTrailer                    = 0xE82AE656, // 3895125590
		Baller                         = 0xCFCA3668, // 3486135912
		Baller2                        = 0x08852855, // 142944341
		Banshee                        = 0xC1E908D2, // 3253274834
		Barracks                       = 0xCEEA3F4B, // 3471458123
		Barracks2                      = 0x4008EABB, // 1074326203
		Bati                           = 0xF9300CC5, // 4180675781
		Bati2                          = 0xCADD5D2D, // 3403504941
		Benson                         = 0x7A61B330, // 2053223216
		BFInjection                    = 0x432AA566, // 1126868326
		Biff                           = 0x32B91AE8, // 850991848
		Bison                          = 0xFEFD644F, // 4278019151
		Bison2                         = 0x7B8297C5, // 2072156101
		Bison3                         = 0x67B3F020, // 1739845664
		Bjxl                           = 0x32B29A4B, // 850565707
		Blazer                         = 0x8125BCF9, // 2166734073
		Blazer2                        = 0xFD231729, // 4246935337
		Blazer3                        = 0xB44F0582, // 3025077634
		Blimp                          = 0xF7004C86, // 4143991942
		Blista                         = 0xEB70965F, // 3950024287
		BMX                            = 0x43779C54, // 1131912276
		BoatTrailer                    = 0x1F3D44B5, // 524108981
		BobcatXL                       = 0x3FC5D440, // 1069929536
		Bodhi2                         = 0xAA699BB6, // 2859047862
		BoxvilleT                      = 0xAA562455, // 2857772117
		Boxville2                      = 0xF21B33BE, // 4061868990
		Boxville3                      = 0x07405E08, // 121658888
		Buccaner                       = 0xB64ADDB9, // 3058359737
		Buffalo                        = 0xEDD516C6, // 3990165190
		Buffalo2                       = 0x2BEC3CBE, // 736902334
		Bulldozer                      = 0x7074F39D, // 1886712733
		Bullet                         = 0x9AE6DDA1, // 2598821281
		Burrito                        = 0xAFBB2CA4, // 2948279460
		Burrito2                       = 0xC9E8FF76, // 3387490166
		Burrito3                       = 0x98171BD3, // 2551651283
		Burrito4                       = 0x353B561D, // 893081117
		Burrito5                       = 0x437CF2A0, // 1132262048
		Bus                            = 0xD577C962, // 3581397346
		Buzzard                        = 0x2F03547B, // 788747387
		Buzzard2                       = 0x2C75F0DD, // 745926877
		Cablecar                       = 0xC6C3242D, // 3334677549
		Caddy                          = 0x44623884, // 1147287684
		Caddy2                         = 0xDFF0594C, // 3757070668
		Camper                         = 0x6FD95F68, // 1876516712
		Carbonizzare                   = 0x7B8AB45F, // 2072687711
		CarbonRS                       = 0x00ABB0C0, // 11251904
		Cargobob                       = 0xFCFCB68B, // 4244420235
		Cargobob2                      = 0x60A7EA10, // 1621617168
		Cargobob3                      = 0x53174EEF, // 1394036463
		CargoPlane                     = 0x15F27762, // 368211810
		Cavalcade                      = 0x779F23AA, // 2006918058
		Cavalcade2                     = 0xD0EB2BE5, // 3505073125
		Cheetah                        = 0xB1D95DA0, // 2983812512
		Coach                          = 0x84718D34, // 2222034228
		Cogcabrio                      = 0x13B57D8A, // 330661258
		Comet2                         = 0xC1AE4D16, // 3249425686
		Coquette                       = 0x067BC037, // 108773431
		Cruiser                        = 0x1ABA13B5, // 448402357
		Crusader                       = 0x132D5A1A, // 321739290
		Cuban800                       = 0xD9927FE3, // 3650256867
		Cutter                         = 0xC3FBA120, // 3288047904
		Daemon                         = 0x77934CEE, // 2006142190
		Dilettante                     = 0xBC993509, // 3164157193
		Dilettante2                    = 0x64430650, // 1682114128
		Dinghy                         = 0x3D961290, // 1033245328
		Dinghy2                        = 0x107F392C, // 276773164
		Dloader                        = 0x698521E3, // 1770332643
		DockTrailer                    = 0x806EFBEE, // 2154757102
		Docktug                        = 0xCB44B1CA, // 3410276810
		Dominator                      = 0x04CE68AC, // 80636076
		Double                         = 0x9C669788, // 2623969160
		Dubsta                         = 0x462FE277, // 1177543287
		Dubsta2                        = 0xE882E5F6, // 3900892662
		Dump                           = 0x810369E2, // 2164484578
		Dune                           = 0x9CF21E0F, // 2633113103
		Dune2                          = 0x1FD824AF, // 534258863
		Duster                         = 0x39D6779E, // 970356638
		Elegy2                         = 0xDE3D9D22, // 3728579874
		Emperor                        = 0xD7278283, // 3609690755
		Emperor2                       = 0x8FC3AADC, // 2411965148
		Emperor3                       = 0xB5FCF74E, // 3053254478
		Entityxf                       = 0xB2FE5CF9, // 3003014393
		Exemplar                       = 0xFFB15B5E, // 4289813342
		F620                           = 0xDCBCBE48, // 3703357000
		Faggio2                        = 0x0350D1AB, // 55628203
		FBI                            = 0x432EA949, // 1127131465
		FBI2                           = 0x9DC66994, // 2647026068
		Felon                          = 0xE8A8BDA8, // 3903372712
		Felon2                         = 0xFAAD85EE, // 4205676014
		Feltzer2                       = 0x8911B9F5, // 2299640309
		Firetruk                       = 0x73920F8E, // 1938952078
		Fixter                         = 0xCE23D3BF, // 3458454463
		Flatbed                        = 0x50B0215A, // 1353720154
		Forklift                       = 0x58E49664, // 1491375716
		FQ2                            = 0xBC32A33B, // 3157435195
		Freight                        = 0x3D6AAA9B, // 1030400667
		FreightCar                     = 0x0AFD22A6, // 184361638
		FreightCont1                   = 0x36DCFF98, // 920453016
		FreightCont2                   = 0x0E512E79, // 240201337
		FreightGrain                   = 0x264D9262, // 642617954
		FreightTrailer                 = 0xD1ABB666, // 3517691494
		Frogger                        = 0x2C634FBD, // 744705981
		Frogger2                       = 0x742E9AC0, // 1949211328
		Fugitive                       = 0x71CB2FFB, // 1909141499
		Fusilade                       = 0x1DC0BA53, // 499169875
		Futo                           = 0x7836CE2F, // 2016857647
		Gauntlet                       = 0x94B395C5, // 2494797253
		Gburrito                       = 0x97FA4F36, // 2549763894
		Graintrailer                   = 0x3CC7F596, // 1019737494
		Granger                        = 0x9628879C, // 2519238556
		Gresley                        = 0xA3FC0F4D, // 2751205197
		Habanero                       = 0x34B7390F, // 884422927
		Handler                        = 0x1A7FCEFA, // 444583674
		Hauler                         = 0x5A82F9AE, // 1518533038
		Hexer                          = 0x11F76C14, // 301427732
		Hotknife                       = 0x0239E390, // 37348240
		Infernus                       = 0x18F25AC7, // 418536135
		Ingot                          = 0xB3206692, // 3005245074
		Intruder                       = 0x34DD8AA1, // 886934177
		Issi2                          = 0xB9CB3B69, // 3117103977
		Jackal                         = 0xDAC67112, // 3670438162
		Jb700                          = 0x3EAB5555, // 1051415893
		Jet                            = 0x3F119114, // 1058115860
		Jetmax                         = 0x33581161, // 861409633
		Journey                        = 0xF8D48E7A, // 4174679674
		Khamelion                      = 0x206D1B68, // 544021352
		Landstalker                    = 0x4BA4E8DC, // 1269098716
		Lazer                          = 0xB39B0AE6, // 3013282534
		Lguard                         = 0x1BF8D381, // 469291905
		Luxor                          = 0x250B0C5E, // 621481054
		Mammatus                       = 0x97E55D11, // 2548391185
		Manana                         = 0x81634188, // 2170765704
		Marquis                        = 0xC1CE1183, // 3251507587
		Maverick                       = 0x9D0450CA, // 2634305738
		Mesa                           = 0x36848602, // 914654722
		Mesa2                          = 0xD36A4B44, // 3546958660
		Mesa3                          = 0x84F42E51, // 2230595153
		Metrotrain                     = 0x33C9E158, // 868868440
		Minivan                        = 0xED7EADA4, // 3984502180
		Mixer                          = 0xD138A6BB, // 3510150843
		Mixer2                         = 0x1C534995, // 475220373
		Monroe                         = 0xE62B361B, // 3861591579
		Mower                          = 0x6A4BD8F6, // 1783355638
		Mule                           = 0x35ED670B, // 904750859
		Mule2                          = 0xC1632BEB, // 3244501995
		Nemesis                        = 0xDA288376, // 3660088182
		Ninef                          = 0x21FED1DE, // 570347998
		Ninef2                         = 0xA8E38B01, // 2833484545
		Oracle                         = 0x506434F6, // 1348744438
		Oracle2                        = 0xE18195B2, // 3783366066
		Packer                         = 0x21EEE87D, // 569305213
		Patriot                        = 0xCFCFEB3B, // 3486509883
		Pbus                           = 0x885F3671, // 2287941233
		PCJ                            = 0xC9CEAF06, // 3385765638
		Penumbra                       = 0xE9805550, // 3917501776
		Peyote                         = 0x6D19CCBC, // 1830407356
		Phantom                        = 0x809AA4CB, // 2157618379
		Phoenix                        = 0x831A21D5, // 2199527893
		Picador                        = 0x59E0FBF3, // 1507916787
		Police                         = 0x79FBB0C5, // 2046537925
		Police2                        = 0x9F05F101, // 2667966721
		Police3                        = 0x71FA16EA, // 1912215274
		Police4                        = 0x8A63C7B9, // 2321795001
		PoliceB                        = 0xFDEFAEC3, // 4260343491
		PoliceOld1                     = 0xA46462F7, // 2758042359
		PoliceOld2                     = 0x95F4C618, // 2515846680
		PoliceT                        = 0x1B38E955, // 456714581
		Polmav                         = 0x1517D4D9, // 353883353
		Pony                           = 0xF8DE29A8, // 4175309224
		Pony2                          = 0x38408341, // 943752001
		Pounder                        = 0x7DE35E7D, // 2112052861
		Praire                         = 0x06C1841B, // 113345563
		Pranger                        = 0x2C33B46E, // 741586030
		Predator                       = 0xE2E7D4AB, // 3806844075
		Premier                        = 0x8FB66F9B, // 2411098011
		Primo                          = 0xBB6B404F, // 3144368207
		Proptrailer                    = 0x153E1B0A, // 356391690
		Radi                           = 0x9D96B45B, // 2643899483
		Raketrailer                    = 0x174CB172, // 390902130
		Rancherxl                      = 0x6210CBB0, // 1645267888
		Rancherxl2                     = 0x7341576B, // 1933662059
		Rapidgt                        = 0x8CB29A14, // 2360515092
		Rapidgt2                       = 0x679450AF, // 1737773231
		Ratloader                      = 0xD83C13CE, // 3627815886
		Rebel                          = 0xB802DD46, // 3087195462
		Rebel2                         = 0x8612B64B, // 2249373259
		Regina                         = 0xFF22D208, // 4280472072
		Rentalbus                      = 0xBE819C63, // 3196165219
		Rhino                          = 0x2EA68690, // 782665360
		Riot                           = 0xB822A1AA, // 3089277354
		Ripley                         = 0xCD935EF9, // 3448987385
		Rocoto                         = 0x7F5C91F1, // 2136773105
		Romero                         = 0x2560B2FC, // 627094268
		Rubble                         = 0x9A5B1DCC, // 2589662668
		Ruffian                        = 0xCABD11E8, // 3401388520
		Ruiner                         = 0xF26CEFF9, // 4067225593
		Rumpo                          = 0x4543B74D, // 1162065741
		Rumpo2                         = 0x961AFEF7, // 2518351607
		Sabregt                        = 0x9B909C94, // 2609945748
		Sadler                         = 0xDC434E51, // 3695398481
		Sadler2                        = 0x2BC345D1, // 734217681
		Sanchez                        = 0x2EF89E46, // 788045382
		Sanchez2                       = 0xA960B13E, // 2841686334
		Sandking                       = 0xB9210FD0, // 3105951696
		Sandking2                      = 0x3AF8C345, // 989381445
		Schafter                       = 0xECC96C3F, // 3972623423
		Schafter2                      = 0xB52B5113, // 3039514899
		Schwarzer                      = 0xD37B7976, // 3548084598
		Scorcher                       = 0xF4E1AA15, // 4108429845
		Scrap                          = 0x9A9FD3DF, // 2594165727
		Seashark                       = 0xC2974024, // 3264692260
		Seashark2                      = 0xDB4388E4, // 3678636260
		Seminole                       = 0x48CECED3, // 1221512915
		Sentinel                       = 0x50732C82, // 1349725314
		Sentinel2                      = 0x3412AE2D, // 873639469
		Serrano                        = 0x4FB1A214, // 1337041428
		Shamal                         = 0xB79C1BF5, // 3080461301
		Sheriff                        = 0x9BAA707C, // 2611638396
		Sheriff2                       = 0x72935408, // 1922257928
		Skylift                        = 0x3E48BF23, // 1044954915
		Speedo                         = 0xCFB3870C, // 3484649228
		Speedo2                        = 0x2B6DC64A, // 728614474
		Squalo                         = 0x17DF5EC2, // 400514754
		Stanier                        = 0xA7EDE74D, // 2817386317
		Stinger                        = 0x5C23AF9B, // 1545842587
		Stingergt                      = 0x82E499FA, // 2196019706
		Stockade                       = 0x6827CF72, // 1747439474
		Stockade3                      = 0xF337AB36, // 4080511798
		Stratum                        = 0x66B4FC45, // 1723137093
		Stretch                        = 0x8B13F083, // 2333339779
		Stunt                          = 0x81794C70, // 2172210288
		Submersible                    = 0x2DFF622F, // 771711535
		Sultan                         = 0x39DA2754, // 970598228
		Suntrap                        = 0xEF2295C9, // 4012021193
		Superd                         = 0x42F2ED16, // 1123216662
		Surano                         = 0x16E478C1, // 384071873
		Surfer                         = 0x29B0DA97, // 699456151
		Surfer2                        = 0xB1D80E06, // 2983726598
		Surge                          = 0x8F0E3594, // 2400073108
		Taco                           = 0x744CA80D, // 1951180813
		Tailgater                      = 0xC3DDFDCE, // 3286105550
		Tanker                         = 0xD46F4737, // 3564062519
		Tankercar                      = 0x22EDDC30, // 586013744
		Taxi                           = 0xC703DB5F, // 3338918751
		Tiptruck                       = 0x02E19879, // 48339065
		Tiptruck2                      = 0xC7824E5E, // 3347205726
		Titan                          = 0x761E2AD3, // 1981688531
		Tornado                        = 0x1BB290BC, // 464687292
		Tornado2                       = 0x5B42A5C4, // 1531094468
		Tornado3                       = 0x690A4153, // 1762279763
		Tornado4                       = 0x86CF7CDD, // 2261744861
		Tourbus                        = 0x73B1C3CB, // 1941029835
		Towtruck                       = 0xB12314E0, // 2971866336
		Towtruck2                      = 0xE5A2D6C6, // 3852654278
		Tr2                            = 0x7BE032C6, // 2078290630
		Tr3                            = 0x6A59902D, // 1784254509
		Tr4                            = 0x7CAB34D0, // 2091594960
		Tractor                        = 0x61D6BA8C, // 1641462412
		Tractor2                       = 0x843B73DE, // 2218488798
		Tractor3                       = 0x562A97BD, // 1445631933
		Trailerlogs                    = 0x782A236D, // 2016027501
		Trailers                       = 0xCBB2BE0E, // 3417488910
		Trailers2                      = 0xA1DA3C91, // 2715434129
		Trailers3                      = 0x8548036D, // 2236089197
		Trailersmall                   = 0x2A72BEAB, // 712162987
		Trash                          = 0x72435A19, // 1917016601
		Trflat                         = 0xAF62F6B2, // 2942498482
		Tribike                        = 0x4339CD69, // 1127861609
		Tribike2                       = 0xB67597EC, // 3061159916
		Tribike3                       = 0xE823FB48, // 3894672200
		Tropic                         = 0x1149422F, // 290013743
		TVTrailer                      = 0x967620BE, // 2524324030
		Utilitruck                     = 0x2D6C8E02, // 762088962
		Utilitruck2                    = 0x6F9C583B, // 1872517179
		Utilitruck3                    = 0x5D5633AF, // 1565930415
		Vacca                          = 0x142E0DC3, // 338562499
		Vader                          = 0xF79A00F7, // 4154065143
		Velum                          = 0x9C429B6A, // 2621610858
		Vigero                         = 0xCEC6B9B7, // 3469130167
		Voltic                         = 0x9F4B77BE, // 2672523198
		Voodoo2                        = 0x1F3766E3, // 523724515
		Washington                     = 0x69F06B57, // 1777363799
		Youga                          = 0x03E5F6B8, // 65402552
		Zion                           = 0xBD1B39C3, // 3172678083
		Zion2                          = 0xB8E2AE18, // 3101863448
		ZType                          = 0x2D3BD401, // 758895617
		// DLC: *GTA V/x64i.rpf/(...)vehiclemods (_mods.rpf)*
//		Akuma                          = 0x63ABADE7, // 1672195559
		Asea                           = 0x94204D89, // 2485144969
//		Bagger                         = 0x806B9CC3, // 2154536131
//		Baller                         = 0xCFCA3668, // 3486135912
//		Banshee                        = 0xC1E908D2, // 3253274834
		Barbarian                      = 0x4E06158B, // 1309021579
//		Bjxl                           = 0x32B29A4B, // 850565707
//		Blista                         = 0xEB70965F, // 3950024287
//		Bodhi2                         = 0xAA699BB6, // 2859047862
//		Buccaner                       = 0xB64ADDB9, // 3058359737
//		Buffalo2                       = 0x2BEC3CBE, // 736902334
//		Carbonizzare                   = 0x7B8AB45F, // 2072687711
//		Cavalcade                      = 0x779F23AA, // 2006918058
//		Cheetah                        = 0xB1D95DA0, // 2983812512
//		Comet2                         = 0xC1AE4D16, // 3249425686
//		Coquette                       = 0x067BC037, // 108773431
//		Daemon                         = 0x77934CEE, // 2006142190
		Detonator                      = 0x23CD5B5A, // 600660826
//		Double                         = 0x9C669788, // 2623969160
//		Dubsta                         = 0x462FE277, // 1177543287
//		Dubsta2                        = 0xE882E5F6, // 3900892662
//		Elegy2                         = 0xDE3D9D22, // 3728579874
//		Entityxf                       = 0xB2FE5CF9, // 3003014393
//		Felon                          = 0xE8A8BDA8, // 3903372712
//		Feltzer2                       = 0x8911B9F5, // 2299640309
		Feroci                         = 0x3A196CEA, // 974744810
//		Fusilade                       = 0x1DC0BA53, // 499169875
//		Futo                           = 0x7836CE2F, // 2016857647
//		Gresley                        = 0xA3FC0F4D, // 2751205197
//		Hotknife                       = 0x0239E390, // 37348240
//		Infernus                       = 0x18F25AC7, // 418536135
//		Issi2                          = 0xB9CB3B69, // 3117103977
//		Jackal                         = 0xDAC67112, // 3670438162
//		Khamelion                      = 0x206D1B68, // 544021352
//		Landstalker                    = 0x4BA4E8DC, // 1269098716
//		Manana                         = 0x81634188, // 2170765704
//		Ninef                          = 0x3D8FA25C, // 1032823388
//		Ninef2                         = 0xA8E38B01, // 2833484545
//		Oracle2                        = 0xE18195B2, // 3783366066
//		Pcj                            = 0xC9CEAF06, // 3385765638
//		Penumbra                       = 0xE9805550, // 3917501776
//		Peyote                         = 0x6D19CCBC, // 1830407356
//		Phoenix                        = 0x831A21D5, // 2199527893
//		Police3                        = 0x71FA16EA, // 1912215274
//		Praire                         = 0x06C1841B, // 113345563
//		Premier                        = 0x8FB66F9B, // 2411098011
//		Primo                          = 0xBB6B404F, // 3144368207
//		Rapidgt                        = 0x8CB29A14, // 2360515092
//		Rapidgt2                       = 0x679450AF, // 1737773231
//		Ratloader                      = 0xD83C13CE, // 3627815886
//		Rebel                          = 0xB802DD46, // 3087195462
//		Ruffian                        = 0xCABD11E8, // 3401388520
//		Ruiner                         = 0xF26CEFF9, // 4067225593
//		Sabregt                        = 0x9B909C94, // 2609945748
//		Sandking                       = 0xB9210FD0, // 3105951696
//		Sandking2                      = 0x3AF8C345, // 989381445
//		Schafter2                      = 0xB52B5113, // 3039514899
//		Schwarzer                      = 0xD37B7976, // 3548084598
//		Sentinel2                      = 0x3412AE2D, // 873639469
//		Sentinel                       = 0x50732C82, // 1349725314
//		Serrano                        = 0x4FB1A214, // 1337041428
		Serrano2                       = 0x3EA948D6, // 1051281622
//		Speedo2                        = 0x2B6DC64A, // 728614474
//		Sultan                         = 0x39DA2754, // 970598228
//		Surano                         = 0x16E478C1, // 384071873
//		Surge                          = 0x8F0E3594, // 2400073108
//		Tailgater                      = 0xC3DDFDCE, // 3286105550
		Tampa                          = 0xEFC6A1E7, // 4022772199
//		Tornado                        = 0x1BB290BC, // 464687292
//		Tornado2                       = 0x5B42A5C4, // 1531094468
//		Vacca                          = 0x142E0DC3, // 338562499
//		Voltic                         = 0x9F4B77BE, // 2672523198
		Wheels                         = 0x81785487, // 2172146823
//		Youga                          = 0x03E5F6B8, // 65402552
		Zio2n                          = 0x90AAB845, // 2427107397
//		Zion                           = 0xBD1B39C3, // 3172678083
//		Ztype                          = 0x2D3BD401, // 758895617
		// DLC: /mpbeach Beach Bum
		Bifta                          = 0xEB298297, // 3945366167
		Kalahari                       = 0x05852838, // 92612664
		Paradise                       = 0x58B3979C, // 1488164764
		Speeder                        = 0x0DC60D2B, // 231083307
		// DLC: /mpbusiness The Business
		Alpha                          = 0x2DB8D1AA, // 767087018
		Jester                         = 0xB2A716A3, // 2997294755
		Turismor                       = 0x185484E1, // 408192225
		Vestra                         = 0x4FF77E37, // 1341619767
		// DLC: /mpbusiness2 The High Life
		Huntley                        = 0x1D06D681, // 486987393
		Massacro                       = 0xF77ADE32, // 4152024626
		Thrust                         = 0x6D6F8F43, // 1836027715
		Zentorno                       = 0xAC5DF515, // 2891838741
		// DLC: /mphipster "I'm Not a Hipster"
		Blade                          = 0xB820ED5E, // 3089165662
		Dubsta3                        = 0xB6410173, // 3057713523
		Glendale                       = 0x047A6BC1, // 75131841
		Panto                          = 0xE644E480, // 3863274624
		Pigalle                        = 0x404B6381, // 1078682497
		Rhapsody                       = 0x322CF98F, // 841808271
		Warrener                       = 0x51D83328, // 1373123368
		// DLC: /mpindipendence Indipendence Day
		Monster                        = 0xCD93A7DB, // 3449006043
		Sovereign                      = 0x2C509634, // 743478836
		// DLC: /mplts Last Team Standing
		Furoregt                       = 0xBF1691E0, // 3205927392
		Hakuchou                       = 0x4B6C568A, // 1265391242
		Innovation                     = 0xF683EACA, // 4135840458
		UpgradeVehiclesRPF             = 0xB25AC05A, // 2992291930
//		Hakuchou                       = 0x4B6C568A, // 1265391242
//		Innovation                     = 0xF683EACA, // 4135840458
		// DLC: /mppilot The San Andreas Flight School
		Besra                          = 0x6CBD1D6D, // 1824333165
		Coquette2                      = 0x3C4E2113, // 1011753235
		Miljet                         = 0x09D80F93, // 165154707
		Swift                          = 0xEBC24DF2, // 3955379698
		// DLC: /mpvalentines The Valentine Day Massacre
		Btype                          = 0x0DDCD4C8, // 232576200
		// DLC: /spupgrade XB1-PS4-PC
		Blimp2                         = 0xDB6B4924, // 3681241380
		Blista2                        = 0x3DEE5EDA, // 1039032026
		Blista3                        = 0xDCBC1C3B, // 3703315515
		Buffalo3                       = 0x0E2C013E, // 237764926
		Dodo                           = 0xCA495705, // 3393804037
		Dominator2                     = 0xC96B73D9, // 3379262425
		Dukes                          = 0x2B26F456, // 723973206
		Dukes2                         = 0xEC8F7094, // 3968823444
		Gauntlet2                      = 0x14D22159, // 349315417
		Marshall                       = 0x49863E9C, // 1233534620
		Stallion                       = 0xA6A7128A, // 2795967114
		Stallion2                      = 0x03B92B84, // 62466948
		Submersible2                   = 0xC07107EE, // 3228633070
		// DLC: /mpapartment Executives and other Criminals
		Baller3                        = 0x7DCF17EA, // 2110724074
		Baller4                        = 0x0B229B8B, // 186817419
		Baller5                        = 0xD28B58D6, // 3532347606
		Baller6                        = 0xBA1FE83D, // 3122653245
		Cargobob4                      = 0x78BC1A3C, // 2025593404
		Cog55                          = 0x360A438E, // 906642318
		Cog552                         = 0xA545C8D8, // 2772814040
		Cognoscenti                    = 0x4402134D, // 1140986701
		Cognoscenti2                   = 0x345B7845, // 878409797
		Dinghy4                        = 0x33B47F96, // 867467158
		Limo2                          = 0xE53E1233, // 3846050355
		Mamba                          = 0x9CFFFC56, // 2634021974
		Nightshade                     = 0x8C2BD0DC, // 2351681756
		Schafter3                      = 0xA83C74A0, // 2822534304
		Schafter4                      = 0x57FC5938, // 1476155704
		Schafter5                      = 0x00E9D000, // 15323136
		Schafter6                      = 0x9A8F5CC3, // 2593086659
		Seashark3                      = 0xED762D49, // 3983945033
		Speeder2                       = 0x1A144F2A, // 437538602
		Supervolito                    = 0x2A54C47D, // 710198397
		Supervolito2                   = 0x5F251F1D, // 1596268317
		Toro2                          = 0x362CAC6D, // 908897389
		Tropic2                        = 0x56590FE9, // 1448677353
		Valkyrie2                      = 0x5BFA5C4B, // 1543134283
		Verlierer2                     = 0x41B77FA4, // 1102544804
		// DLC: /mpchristmas2 Festive Surprise
		Jester2                        = 0xBE0E6126, // 3188613414
		Massacro2                      = 0xDA5819A3, // 3663206819
		Ratloader2                     = 0xDCE1D9F7, // 3705788919
		Slamvan                        = 0x2B7F9DE3, // 729783779
		// DLC: /mpexecutive Further Adventures in Finance and Felony
		Bestiagts                      = 0x4BFCF28B, // 1274868363
		Brickade                       = 0xEDC6F847, // 3989239879
		Fmj                            = 0x5502626C, // 1426219628
		Nimbus                         = 0xB2CF7250, // 2999939664
		Pfister811                     = 0x92EF6E04, // 2465164804
		Prototipo                      = 0x7E8F677F, // 2123327359
		Reaper                         = 0x0DF381E5, // 234062309
		Rumpo3                         = 0x57F682AF, // 1475773103
		Seven70                        = 0x97398A4B, // 2537130571
		Tug                            = 0x82CAC433, // 2194326579
		Volatus                        = 0x920016F1, // 2449479409
		Windsor2                       = 0x8CF5CAE1, // 2364918497
		Xls                            = 0x47BBCF2E, // 1203490606
		XLS2                           = 0xE6401328, // 3862958888
		// DLC: /mphalloween Halloween
		Btype2                         = 0xCE6B35A4, // 3463132580
		Lurcher                        = 0x7B47A6A7, // 2068293287
		// DLC: /mpheist Heists
		Barracks3                      = 0x2592B5CF, // 630371791
		Boxville4                      = 0x1A79847A, // 444171386
		Casco                          = 0x3822BDFE, // 941800958
		Dinghy3                        = 0x1E5E54EA, // 509498602
		Enduro                         = 0x6882FA73, // 1753414259
		Gburrito2                      = 0x11AA0E14, // 296357396
		Guardian                       = 0x825A9F4C, // 2186977100
		Hydra                          = 0x39D6E83F, // 970385471
		Insurgent                      = 0x9114EADA, // 2434067162
		Insurgent2                     = 0x7B7E56F0, // 2071877360
		Kuruma                         = 0xAE2BFE94, // 2922118804
		Kuruma2                        = 0x187D938D, // 410882957
		Lectro                         = 0x26321E67, // 640818791
		Mule3                          = 0x85A5B471, // 2242229361
		Savage                         = 0xFB133A17, // 4212341271
		Slamvan2                       = 0x31ADBBFC, // 833469436
		Tanker2                        = 0x74998082, // 1956216962
		Technical                      = 0x83051506, // 2198148358
		Trash2                         = 0xB527915C, // 3039269212
		Valkyrie                       = 0xA09E15FD, // 2694714877
		Velum2                         = 0x403820E8, // 1077420264
		// DLC: /mpjanuary216 Drop Zone
		Banshee2                       = 0x25C5AF13, // 633712403
		SultanRS                       = 0xEE6024BC, // 3999278268
		// DLC: /mplowrider Lowrider
		Buccaner2                      = 0x54934093, // 1418936467
		Chino2                         = 0xAED64A63, // 2933279331
		Faction                        = 0x81A9CDDF, // 2175389151
		Faction2                       = 0x95466BDB, // 2504420315
		Moonbeam                       = 0x1F52A43F, // 525509695
		Moonbeam2                      = 0x710A2B9B, // 1896491931
		Primo2                         = 0x86618EDA, // 2254540506
		Voodoo                         = 0x779B4F2D, // 2006667053
		// DLC: /mplowrider2 Lowrider Custom Classic
		Faction3                       = 0x866BCE26, // 2255212070
		Minivan2                       = 0xBCDE91F0, // 3168702960
		Sabregt2                       = 0x0D4EA603, // 223258115
		Slamvan3                       = 0x42BC5E19, // 1119641113
		Tornado5                       = 0x94DA98EF, // 2497353967
		Virgo2                         = 0xCA62927A, // 3395457658
		Virgo3                         = 0x00FDFFB0, // 16646064
		// DLC: /mpluxe Ill Gotten Gains Part 1
		Feltzer3                       = 0xFF676B3D, // 4284967741
		Luxor2                         = 0xB79F589E, // 3080673438
		Osiris                         = 0x767164D6, // 1987142870
		Swift2                         = 0x4019CB4C, // 1075432268
		Virgo                          = 0xE2504942, // 3796912450
		Windsor                        = 0x5E4327C8, // 1581459400
		// DLC: /mpluxe2 Ill Gotten Gains Part 2
		Brawler                        = 0xA7CE1BC5, // 2815302597
		Chino                          = 0x14D69010, // 349605904
		Coquette3                      = 0x5E879886, // 1585944710
		T20                            = 0x6322B39A, // 1663218586
		Toro                           = 0x3FD5AA2F, // 1070967343
		Vindicator                     = 0xAF599F01, // 2941886209
		// DLC: /mpstunt Cunning Stunts
		Bf400                          = 0x05283265, // 86520421
		Brioso                         = 0x5C55CB39, // 1549126457
		Cliffhanger                    = 0x17420102, // 390201602
		Contender                      = 0x28B67ACA, // 683047626
		Gargoyle                       = 0x2C2C2324, // 741090084
		Le7b                           = 0xB6846A55, // 3062131285
		Lynx                           = 0x1CBDC10B, // 482197771
		Omnis                          = 0xD1AD4937, // 3517794615
		Rallytruck                     = 0x829A3C44, // 2191146052
		Sheava                         = 0x21A84F4A, // 564678474
		Tampa2                         = 0xC0240885, // 3223586949
		Trophytruck                    = 0x0612F4B6, // 101905590
		Trophytruck2                   = 0x48030722, // 1208157986
		Tropos                         = 0x707E63A4, // 1887331236
		Tyrus                          = 0x7B406EFB, // 2067820283
		// DLC: /mpvalentines2 The Valentine's Day 2
		Btype3                         = 0xDBF9A577, // 3690571127
		Mpxmas_604490                  = 0x698F75C0, // 1771009472
//		Tampa                          = 0x39F9C898, // 972671128
		// DLC: /patcday1ng
//		Asea                           = 0x94204D89, // 2485144969
//		Banshee                        = 0xC1E908D2, // 3253274834
//		Barracks2                      = 0x4008EABB, // 1074326203
//		Blista                         = 0xEB70965F, // 3950024287
//		Btype                          = 0x06FF6914, // 117401876
//		Buccaner                       = 0xB64ADDB9, // 3058359737
//		Buffalo3                       = 0x0E2C013E, // 237764926
//		Burrito2                       = 0xC9E8FF76, // 3387490166
//		Burrito5                       = 0x437CF2A0, // 1132262048
//		Carbonizzare                   = 0x7B8AB45F, // 2072687711
//		Cargobob                       = 0xFCFCB68B, // 4244420235
//		Cargobob2                      = 0x60A7EA10, // 1621617168
//		Cargobob3                      = 0x53174EEF, // 1394036463
//		Cargoplane                     = 0x15F27762, // 368211810
//		Daemon                         = 0x77934CEE, // 2006142190
//		Dodo                           = 0xCA495705, // 3393804037
//		Fusilade                       = 0x1DC0BA53, // 499169875
//		Futo                           = 0x7836CE2F, // 2016857647
//		Gresley                        = 0xA3FC0F4D, // 2751205197
//		Lazer                          = 0xB39B0AE6, // 3013282534
//		Mesa3                          = 0x84F42E51, // 2230595153
//		Miljet                         = 0x09D80F93, // 165154707
//		Peyote                         = 0x6D19CCBC, // 1830407356
//		Police2                        = 0x9F05F101, // 2667966721
//		Policeb                        = 0xFDEFAEC3, // 4260343491
//		Primo                          = 0xBB6B404F, // 3144368207
//		Rapidgt                        = 0x8CB29A14, // 2360515092
//		Ruiner                         = 0xF26CEFF9, // 4067225593
//		Sadler                         = 0xDC434E51, // 3695398481
//		Sandking                       = 0xB9210FD0, // 3105951696
//		Sandking2                      = 0x3AF8C345, // 989381445
//		Schwarzer                      = 0xD37B7976, // 3548084598
//		Sheriff                        = 0x9BAA707C, // 2611638396
//		Submersible                    = 0x2DFF622F, // 771711535
//		Submersible2                   = 0xC07107EE, // 3228633070
//		Suntrap                        = 0xEF2295C9, // 4012021193
//		Surge                          = 0x8F0E3594, // 2400073108
//		Warrener                       = 0x51D83328, // 1373123368
		// DLC: /patchday2ng
//		Benson                         = 0x7A61B330, // 2053223216
//		Blista2                        = 0x3DEE5EDA, // 1039032026
//		Blista3                        = 0xDCBC1C3B, // 3703315515
//		Burrito3                       = 0x98171BD3, // 2551651283
//		Double                         = 0x9C669788, // 2623969160
//		FBI2                           = 0x9DC66994, // 2647026068
//		Frogger                        = 0x2C634FBD, // 744705981
//		Frogger2                       = 0x742E9AC0, // 1949211328
//		Gburrito                       = 0x97FA4F36, // 2549763894
//		Granger                        = 0x9628879C, // 2519238556
//		Huntley                        = 0x1D06D681, // 486987393
//		Infernus                       = 0x18F25AC7, // 418536135
//		Ingot                          = 0xB3206692, // 3005245074
//		Kuruma                         = 0xAE2BFE94, // 2922118804
//		Luxor                          = 0x250B0C5E, // 621481054
//		Manana                         = 0x81634188, // 2170765704
//		Massacro                       = 0xF77ADE32, // 4152024626
//		Massacro2                      = 0xDA5819A3, // 3663206819
//		Mesa                           = 0x36848602, // 914654722
//		Mesa3                          = 0x84F42E51, // 2230595153
//		Monroe                         = 0xE62B361B, // 3861591579
//		Mule                           = 0x35ED670B, // 904750859
//		Mule2                          = 0xC1632BEB, // 3244501995
//		Ninef                          = 0x3D8FA25C, // 1032823388
//		Pbus                           = 0x885F3671, // 2287941233
//		Pcj                            = 0xC9CEAF06, // 3385765638
//		Riot                           = 0xB822A1AA, // 3089277354
//		Ruiner                         = 0xF26CEFF9, // 4067225593
//		Shamal                         = 0xB79C1BF5, // 3080461301
//		Stallion2                      = 0x03B92B84, // 62466948
//		Stratum                        = 0x66B4FC45, // 1723137093
//		Tanker                         = 0xD46F4737, // 3564062519
//		Titan                          = 0x761E2AD3, // 1981688531
//		Tourbus                        = 0x73B1C3CB, // 1941029835
//		Velum                          = 0x9C429B6A, // 2621610858
		Warraner                       = 0xF8182823, // 4162332707
//		Zentorno                       = 0xAC5DF515, // 2891838741
		// DLC: /patchday3ng
		Boxville                       = 0x898ECCEA, // 2307837162
//		Boxville2                      = 0xF21B33BE, // 4061868990
//		Boxville3                      = 0x07405E08, // 121658888
//		Boxville4                      = 0x1A79847A, // 444171386
//		Buccaner                       = 0xB64ADDB9, // 3058359737
//		Bullet                         = 0x9AE6DDA1, // 2598821281
//		Buzzard                        = 0x2F03547B, // 788747387
//		Cargobob                       = 0xFCFCB68B, // 4244420235
//		Cargobob2                      = 0x60A7EA10, // 1621617168
//		Cogcabrio                      = 0x13B57D8A, // 330661258
//		Dilettante                     = 0xBC993509, // 3164157193
//		Dinghy                         = 0x3D961290, // 1033245328
//		Dinghy2                        = 0x107F392C, // 276773164
//		Dubsta                         = 0x462FE277, // 1177543287
//		Dump                           = 0x810369E2, // 2164484578
//		Emperor3                       = 0xB5FCF74E, // 3053254478
//		Exemplar                       = 0xFFB15B5E, // 4289813342
//		Felon                          = 0xE8A8BDA8, // 3903372712
//		Firetruk                       = 0x73920F8E, // 1938952078
//		FQ2                            = 0xBC32A33B, // 3157435195
//		Fusilade                       = 0x1DC0BA53, // 499169875
//		Futo                           = 0x7836CE2F, // 2016857647
//		Gresley                        = 0xA3FC0F4D, // 2751205197
//		Habanero                       = 0x34B7390F, // 884422927
//		Hakuchou                       = 0x4B6C568A, // 1265391242
//		Hexer                          = 0x11F76C14, // 301427732
//		Issi2                          = 0xB9CB3B69, // 3117103977
//		Jackal                         = 0xDAC67112, // 3670438162
//		Jetmax                         = 0x33581161, // 861409633
//		Kalahari                       = 0x05852838, // 92612664
//		Lazer                          = 0xB39B0AE6, // 3013282534
//		Manana                         = 0x81634188, // 2170765704
//		Massacro2                      = 0xDA5819A3, // 3663206819
//		Mesa                           = 0x36848602, // 914654722
//		Mesa3                          = 0x84F42E51, // 2230595153
//		Monroe                         = 0xE62B361B, // 3861591579
//		Mule                           = 0x35ED670B, // 904750859
//		Pbus                           = 0x885F3671, // 2287941233
//		PCJ                            = 0xC9CEAF06, // 3385765638
//		Peyote                         = 0x6D19CCBC, // 1830407356
//		Phantom                        = 0x809AA4CB, // 2157618379
//		Phoenix                        = 0x831A21D5, // 2199527893
//		Picador                        = 0x59E0FBF3, // 1507916787
//		Police2                        = 0x9F05F101, // 2667966721
//		Police3                        = 0x71FA16EA, // 1912215274
//		Polmav                         = 0x1517D4D9, // 353883353
//		Predator                       = 0xE2E7D4AB, // 3806844075
		Poptrailer                     = 0x979CE75D, // 2543642461
//		Rancherxl2                     = 0x7341576B, // 1933662059
//		Regina                         = 0xFF22D208, // 4280472072
//		Rentalbus                      = 0xBE819C63, // 3196165219
//		Riot                           = 0xB822A1AA, // 3089277354
//		Romero                         = 0x2560B2FC, // 627094268
//		Ruffian                        = 0xCABD11E8, // 3401388520
//		Rumpo                          = 0x4543B74D, // 1162065741
//		Sadler                         = 0xDC434E51, // 3695398481
//		Sanchez                        = 0x2EF89E46, // 788045382
//		Sanchez2                       = 0xA960B13E, // 2841686334
//		Sandking                       = 0xB9210FD0, // 3105951696
//		Sandking2                      = 0x3AF8C345, // 989381445
//		Scrap                          = 0x9A9FD3DF, // 2594165727
		Seakark                        = 0xF51718D3, // 4111931603
//		Serrano                        = 0x4FB1A214, // 1337041428
//		Sheriff                        = 0x9BAA707C, // 2611638396
//		Sheriff2                       = 0x72935408, // 1922257928
//		Skylift                        = 0x3E48BF23, // 1044954915
//		Sovereign                      = 0x2C509634, // 743478836
//		Speedo2                        = 0x2B6DC64A, // 728614474
//		Stingergt                      = 0x82E499FA, // 2196019706
//		Sultan                         = 0x39DA2754, // 970598228
//		Suntrap                        = 0xEF2295C9, // 4012021193
//		Superd                         = 0x42F2ED16, // 1123216662
		Sufer2                         = 0x237CCCC8, // 595381448
//		Thrust                         = 0x6D6F8F43, // 1836027715
//		Tiptruck2                      = 0xC7824E5E, // 3347205726
//		Tornado                        = 0x1BB290BC, // 464687292
//		Tornado2                       = 0x5B42A5C4, // 1531094468
//		Tornado3                       = 0x690A4153, // 1762279763
//		Tornado4                       = 0x86CF7CDD, // 2261744861
//		Tourbus                        = 0x73B1C3CB, // 1941029835
//		Towtruck                       = 0xB12314E0, // 2971866336
//		Tractor                        = 0x61D6BA8C, // 1641462412
//		Tractor2                       = 0x843B73DE, // 2218488798
//		Trailersmall                   = 0x2A72BEAB, // 712162987
//		Trash                          = 0x72435A19, // 1917016601
//		Voodoo2                        = 0x1F3766E3, // 523724515
//		Washington                     = 0x69F06B57, // 1777363799
//		Zentorno                       = 0xAC5DF515, // 2891838741
//		Zion                           = 0xBD1B39C3, // 3172678083
//		Zion2                          = 0xB8E2AE18, // 3101863448
//		Ztype                          = 0x2D3BD401, // 758895617
		// DLC: /patchday4ng
//		Cargobob                       = 0xFCFCB68B, // 4244420235
//		Cargobob2                      = 0x60A7EA10, // 1621617168
//		Casco                          = 0x3822BDFE, // 941800958
//		Dinghy                         = 0x3D961290, // 1033245328
//		Police3                        = 0x71FA16EA, // 1912215274
//		Rumpo                          = 0x4543B74D, // 1162065741
//		Serrano                        = 0x4FB1A214, // 1337041428
//		Speeder                        = 0x0DC60D2B, // 231083307
//		Swift                          = 0xEBC24DF2, // 3955379698
//		Voodoo2                        = 0x1F3766E3, // 523724515
		// DLC: /patchday5ng
//		Dinghy2                        = 0x107F392C, // 276773164
//		Insurgent                      = 0x9114EADA, // 2434067162
//		Rumpo                          = 0x4543B74D, // 1162065741
		// DLC: /patchday7ng
//		Dinghy2                        = 0x107F392C, // 276773164
//		Dump                           = 0x810369E2, // 2164484578
//		Voodoo2                        = 0x1F3766E3, // 523724515
		// DLC: /patchday8ng
//		Buzzard2                       = 0x2C75F0DD, // 745926877
//		Lurcher                        = 0x7B47A6A7, // 2068293287
//		Massacro                       = 0xF77ADE32, // 4152024626
//		Slamvan2                       = 0x31ADBBFC, // 833469436
		// DLC: /patchday9ng
//		Banshee2                       = 0x25C5AF13, // 633712403
//		Chino                          = 0x14D69010, // 349605904
//		Rocoto                         = 0x7F5C91F1, // 2136773105
//		Sultanrs                       = 0xEE6024BC, // 3999278268
//		Zentorno                       = 0xAC5DF515, // 2891838741
		// DLC: /patchday10ng
//		Adder                          = 0xB779A091, // 3078201489
//		Cargobob4                      = 0x78BC1A3C, // 2025593404
//		Cog55                          = 0x360A438E, // 906642318
//		Cog552                         = 0x29FCD3E4, // 704435172
//		Cognoscenti                    = 0x86FE0B60, // 2264796000
//		Cognoscenti2                   = 0xDBF2D57A, // 3690124666
//		Huntley                        = 0x1D06D681, // 486987393
//		Serrano                        = 0x4FB1A214, // 1337041428
//		Supervolito                    = 0x2A54C47D, // 710198397
//		Supervolito2                   = 0x9C5E5644, // 2623428164
		// DLC: /patchday11ng
//		Chino2                         = 0xAED64A63, // 2933279331
//		XLS2                           = 0xE6401328, // 3862958888
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
		static new( model : VehicleModel, position : Vector3, heading ?: Vector3, dimension ?: number ) : Vehicle;
		static new( hash  : number,       position : Vector3, heading ?: Vector3, dimension ?: number ) : Vehicle;
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
