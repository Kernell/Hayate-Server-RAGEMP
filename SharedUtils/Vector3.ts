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

var FLOAT_EPSILON : number = 0.0001;

Vector3.prototype.Lerp = function( vector : Vector3, progress : number ) : Vector3
{
	return this.Add( vector.Sub( this ) ).Mul( Math.min( 1.0, Math.max( 0.0, progress ) ) );
}

Vector3.prototype.Normalize = function() : number
{
	let length = this.Length();
		
	if( length > FLOAT_EPSILON )
	{
		this.x = this.x / length;
		this.y = this.y / length;
		this.z = this.z / length;
			
		return length;
	}
		
	return 0;
}

Vector3.prototype.Length = function() : number
{
	return Math.sqrt( this.LengthSquared() );
}

Vector3.prototype.LengthSquared = function() : number
{
	return this.x * this.x + this.y * this.y + this.z * this.z;
}
	
Vector3.prototype.DotProduct = function( vector : Vector3 ) : number
{
	return this.x * vector.x + this.y * vector.y + this.z * vector.z;
}

Vector3.prototype.Cross = function( vector : Vector3 ) : Vector3
{
	return new Vector3(
		this.y * vector.z - this.z * vector.y,
		this.z * vector.x - this.x * vector.z,
		this.x * vector.y - this.y * vector.x
	);
}
	
Vector3.prototype.CrossProduct = function( vector : Vector3 ) : void
{
	let x = this.x;
	let y = this.y;
	let z = this.z;
		
	this.x = y * vector.z - vector.y * z;
	this.y = z * vector.x - vector.z * x;
	this.z = x * vector.y - vector.x * y;
}
	
Vector3.prototype.GetTriangleNormal = function( vector1 : Vector3, vector2 : Vector3 ) : Vector3
{
	return vector1.Sub( this ).Cross( vector2.Sub( this ) );
}
	
Vector3.prototype.GetRotation = function( vector : Vector3 ) : Vector3
{
	let x = 0.0;
	let y = 0.0;
	let z = ( 360.0 - ( Math.atan2( vector.x - this.x, vector.y - this.y ) * 180 / Math.PI ) ) % 360.0;
		
	return new Vector3( x, y, z );
}
	
Vector3.prototype.Rotate = function( angle : number ) : Vector3
{
	angle = angle * Math.PI / 180;
		
	return new Vector3(
		this.x * Math.cos( angle ) - this.y * Math.sin( angle ), 
		this.x * Math.sin( angle ) + this.y * Math.cos( angle ), 
		this.z 
	);
}

Vector3.prototype.Distance = function( vector : Vector3 ) : number
{
	return vector.Sub( this ).Length();
}

Vector3.prototype.Dot = function( vector : Vector3 ) : number
{
	return this.x * vector.x + this.y * vector.y + this.z * vector.z;
}

Vector3.prototype.Offset = function( distance : number, rotation : number ) : Vector3
{
	return new Vector3( 
		this.x + ( ( Math.cos( ( rotation + 90.0 ) * Math.PI / 180 ) ) * distance ), 
		this.y + ( ( Math.sin( ( rotation + 90.0 ) * Math.PI / 180 ) ) * distance ), 
		this.z
	);
}

Vector3.prototype.Add = function( val : Vector3|number ) : Vector3
{
	if( val instanceof Vector3 )
	{
		return new Vector3( this.x + val.x, this.y + val.y, this.z + val.z );
	}

	return new Vector3( this.x + val, this.y + val, this.z + val );
}

Vector3.prototype.Sub = function( val : Vector3|number ) : Vector3
{
	if( val instanceof Vector3 )
	{
		return new Vector3( this.x - val.x, this.y - val.y, this.z - val.z );
	}

	return new Vector3( this.x - val, this.y - val, this.z - val );
}

Vector3.prototype.Mul = function( val : Vector3|number ) : Vector3
{
	if( val instanceof Vector3 )
	{
		return new Vector3( this.x * val.x, this.y * val.y, this.z * val.z );
	}

	return new Vector3( this.x * val, this.y * val, this.z * val );
}

Vector3.prototype.Div = function( val : Vector3|number ) : Vector3
{
	if( val instanceof Vector3 )
	{
		return new Vector3( this.x / val.x, this.y / val.y, this.z / val.z );
	}

	return new Vector3( this.x / val, this.y / val, this.z / val );
}

Vector3.prototype.Pow = function( val : Vector3|number ) : Vector3
{
	if( val instanceof Vector3 )
	{
		return new Vector3( this.x ^ val.x, this.y ^ val.y, this.z ^ val.z );
	}

	return new Vector3( this.x ^ val, this.y ^ val, this.z ^ val );
}

Vector3.prototype.Mod = function( val : Vector3|number ) : Vector3
{
	if( val instanceof Vector3 )
	{
		return new Vector3( this.x % val.x, this.y % val.y, this.z % val.z );
	}

	return new Vector3( this.x % val, this.y % val, this.z % val );
}

Vector3.prototype.Equal = function( vector : Vector3 ) : boolean
{
	return this.x == vector.x && this.y == vector.y && this.z == vector.z;
}

Vector3.prototype.Magnitude = function() : number
{
	return this.LengthSquared();
};
	
Vector3.prototype.SqrMagnitude = function() : number
{
	return this.Length();
};

Vector3.prototype.toString = function() : string
{
	return `( ${this.x}, ${this.y}, ${this.z} )`;
}

interface Vector3
{
	Lerp              ( vector : Vector3, progress : number )  : Vector3;
	Normalize         ()                                       : number;
	Length            ()                                       : number;
	LengthSquared     ()                                       : number;
	DotProduct        ( vector : Vector3 )                     : number;
	Cross             ( vector : Vector3 )                     : Vector3;
	CrossProduct      ( vector : Vector3 )                     : void;
	GetTriangleNormal ( vector1 : Vector3, vector2 : Vector3 ) : Vector3;
	GetRotation       ( vector : Vector3 )                     : Vector3;
	Rotate            ( angle : number )                       : Vector3;
	Distance          ( vector : Vector3 )                     : number;
	Dot               ( vector : Vector3 )                     : number;
	Offset            ( distance : number, rotation : number ) : Vector3;
	Add               ( val : Vector3|number )                 : Vector3;
	Sub               ( val : Vector3|number )                 : Vector3;
	Mul               ( val : Vector3|number )                 : Vector3;
	Div               ( val : Vector3|number )                 : Vector3;
	Pow               ( val : Vector3|number )                 : Vector3;
	Mod               ( val : Vector3|number )                 : Vector3;
	Equal             ( vector : Vector3 )                     : boolean;

	Magnitude         () : number;
	SqrMagnitude      () : number;

	toString          () : string;
}
