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

import * as Crypto from "crypto";

export class UserPasswordEncoder implements PasswordEncoderInterface
{
	public GeneratePassword( length : number = 12, specialChars : boolean = false, extraSpecialChars : boolean = false ) : string
	{
		let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		if( specialChars )
		{
			chars += "!@#$%^&*()";
		}
			
		if( extraSpecialChars )
		{
			chars = chars + "-_ []{}<>~`+=,.;:/?|";
		}

		let password = "";
			
		for( let i = 1; i < length; ++i )
		{
			password += chars.charAt( Math.floor( Math.random() * chars.length ) );
		}

		return password;
	}

	public GenerateSalt( length : number = 16 ) : string
	{
		let random = ( min : number, max : number ) : number => Math.floor( Math.random() * ( max - min ) ) + min;

		let salt = "";
			
		for( let i = 1; i < length; ++i )
		{
			let rand = random( 33, 127 );

			salt += String.fromCharCode( rand );
		}
			
		return salt;
	}

	public EncodePassword( raw : string, salt : string ) : string
	{
		if( salt == null )
		{
			salt = this.GenerateSalt();
		}

		let passHash = Crypto.createHash( "sha512" ).update( raw ).digest( "hex" );
		let saltHash = Crypto.createHash( "sha512" ).update( salt ).digest( "hex" );

		return Crypto.createHash( "sha256" ).update( passHash + saltHash ).digest( "hex" );
	}

	public IsPasswordValid( encoded : string, raw : string, salt : string ) : boolean
	{
		if( raw.length == 0 || encoded.length < 64 || salt.length == 0 )
		{
			return false;
		}
			
		return this.EncodePassword( raw, salt ) == encoded;
	}
}
