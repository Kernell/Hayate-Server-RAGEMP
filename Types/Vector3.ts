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

class Vector3
{
	public x : number = 0;
	public y : number = 0;
	public z : number = 0;

	public static FLOAT_EPSILON : number = 0.0001;

	public get X() : number
	{
		return this.x;
	}

	public set X( value : number )
	{
		this.x = value;
	}

	public get Y() : number
	{
		return this.y;
	}

	public set Y( value : number )
	{
		this.y = value;
	}

	public get Z() : number
	{
		return this.z;
	}

	public set Z( value : number )
	{
		this.z = value;
	}

	public constructor( vector : Vector3 );
	public constructor( x ?: number, y ?: number, z ?: number );

	public constructor( x : any = 0, y : number = 0, z : number = 0 )
	{
		console.log( x, y, z );

		if( typeof x == "object" )
		{
			z = x.z;
			y = x.y;
			x = x.x;
		}

		this.X = x;
		this.Y = y;
		this.Z = y;
	}

	public Lerp( vector : Vector3, progress : number ) : Vector3
	{
		return this.Add( vector.Sub( this ) ).Mul( Math.min( 1.0, Math.max( 0.0, progress ) ) );
	}

	public Normalize() : number
	{
		let length = this.Length();
		
		if( length > Vector3.FLOAT_EPSILON )
		{
			this.X = this.X / length;
			this.Y = this.Y / length;
			this.Z = this.Z / length;
			
			return length;
		}
		
		return 0;
	}
	
	public Length() : number
	{
		return Math.sqrt( this.LengthSquared() );
	}
	
	public LengthSquared() : number
	{
		return this.X * this.X + this.Y * this.Y + this.Z * this.Z;
	}
	
	public DotProduct( vector : Vector3 ) : number
	{
		return this.X * vector.X + this.Y * vector.Y + this.Z * vector.Z;
	}

	public Cross( vector : Vector3 ) : Vector3
	{
		return new Vector3(
			this.Y * vector.Z - this.Z * vector.Y,
			this.Z * vector.X - this.X * vector.Z,
			this.X * vector.Y - this.Y * vector.X
		);
	}
	
	public CrossProduct( vector : Vector3 ) : void
	{
		let x = this.X;
		let y = this.Y;
		let z = this.Z;
		
		this.X = y * vector.Z - vector.Y * z;
		this.Y = z * vector.X - vector.Z * x;
		this.Z = x * vector.Y - vector.X * y;
	}
	
	public GetTriangleNormal( vector1 : Vector3, vector2 : Vector3 ) : Vector3
	{
		return vector1.Sub( this ).Cross( vector2.Sub( this ) );
	}
	
	public GetRotation( vector : Vector3 ) : Vector3
	{
		let x = 0.0;
		let y = 0.0;
		let z = ( 360.0 - ( Math.atan2( vector.X - this.X, vector.Y - this.Y ) * 180 / Math.PI ) ) % 360.0;
		
		return new Vector3( x, y, z );
	}
	
	public Rotate( angle : number ) : Vector3
	{
		angle = angle * Math.PI / 180;
		
		return new Vector3(
			this.X * Math.cos( angle ) - this.Y * Math.sin( angle ), 
			this.X * Math.sin( angle ) + this.Y * Math.cos( angle ), 
			this.Z 
		);
	}

	public Distance( vector : Vector3 ) : number
	{
		return vector.Sub( this ).Length();
	}

	public Dot( vector : Vector3 )
	{
		return this.X * vector.X + this.Y * vector.Y + this.Z * vector.Z;
	}

	public Offset( distance : number, rotation : number )
	{
		return new Vector3( 
			this.X + ( ( Math.cos( ( rotation + 90.0 ) * Math.PI / 180 ) ) * distance ), 
			this.Y + ( ( Math.sin( ( rotation + 90.0 ) * Math.PI / 180 ) ) * distance ), 
			this.Z
		);
	}

	public Add( val : Vector3|number ) : Vector3
	{
		if( val instanceof Vector3 )
		{
			return new Vector3( this.X + val.X, this.Y + val.Y, this.Z + val.Z );
		}

		return new Vector3( this.X + val, this.Y + val, this.Z + val );
	}

	public Sub( val : Vector3|number ) : Vector3
	{
		if( val instanceof Vector3 )
		{
			return new Vector3( this.X - val.X, this.Y - val.Y, this.Z - val.Z );
		}

		return new Vector3( this.X - val, this.Y - val, this.Z - val );
	}

	public Mul( val : Vector3|number ) : Vector3
	{
		if( val instanceof Vector3 )
		{
			return new Vector3( this.X * val.X, this.Y * val.Y, this.Z * val.Z );
		}

		return new Vector3( this.X * val, this.Y * val, this.Z * val );
	}

	public Div( val : Vector3|number ) : Vector3
	{
		if( val instanceof Vector3 )
		{
			return new Vector3( this.X / val.X, this.Y / val.Y, this.Z / val.Z );
		}

		return new Vector3( this.X / val, this.Y / val, this.Z / val );
	}

	public Pow( val : Vector3|number ) : Vector3
	{
		if( val instanceof Vector3 )
		{
			return new Vector3( this.X ^ val.X, this.Y ^ val.Y, this.Z ^ val.Z );
		}

		return new Vector3( this.X ^ val, this.Y ^ val, this.Z ^ val );
	}

	public Mod( val : Vector3|number ) : Vector3
	{
		if( val instanceof Vector3 )
		{
			return new Vector3( this.X % val.X, this.Y % val.Y, this.Z % val.Z );
		}

		return new Vector3( this.X % val, this.Y % val, this.Z % val );
	}

	public Equal( vector : Vector3 ) : boolean
	{
		return this.X == vector.X && this.Y == vector.Y && this.Z == vector.Z;
	}

	public get Magnitude() : number
	{
		return this.LengthSquared();
	};
	
	public get SqrMagnitude() : number
	{
		return this.Length();
	};

	public get Normalized() : number
	{
		let length = this.Length();
			
		if( length > Vector3.FLOAT_EPSILON )
		{
			return length;
		}

		return 0;
	}

	public static get Back() : Vector3
	{
		return new Vector3( 0.0, -1.0, 0.0 );
	}

	public static get Down() : Vector3
	{
		return new Vector3( 0.0, 0.0, -1.0 );
	}

	public static get Forward() : Vector3
	{
		return new Vector3( 0.0, 1.0, 0.0 );
	}

	public static get Left() : Vector3
	{
		return new Vector3( -1.0, 0.0, 0.0 );
	}
	
	public static get One() : Vector3
	{
		return new Vector3( 1.0, 1.0, 1.0 );
	};
	
	public static get Right() : Vector3
	{
		return new Vector3( 1.0, 0.0, 0.0 );
	};
	
	public static get Up() : Vector3
	{
		return new Vector3( 0.0, 0.0, 1.0 );
	};
	
	public static get Zero() : Vector3
	{
		return new Vector3( 0.0, 0.0, 0.0 );
	};

	public toString() : string
	{
		return `( ${this.X}, ${this.Y}, ${this.Z} )`;
	}
}

module.exports = Vector3;
