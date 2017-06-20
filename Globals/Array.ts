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

interface Array< T >
{
	remove( value : T ) : Array< T >;
}

Array.prototype.remove = function( value )
{
    let idx = this.indexOf( value );
    
	if( idx != -1 )
	{
        return this.splice( idx, 1 );
    }

    return null;
}

module.exports = Array;
