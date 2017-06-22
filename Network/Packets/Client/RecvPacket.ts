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

import { ChatMessage } from "../Server/ChatMessage";

export abstract class RecvPacket implements IRecvPacket
{
	protected data       : any;
	protected connection : IConnection;

	public constructor( connection : IConnection, data : any )
	{
		this.connection = connection;
		this.data       = data;

		try
		{
			this.Read();
		}
		catch( error )
		{
			Console.WriteLine( Console.FgRed + error );
		}
		
		this.Process().catch(
			( error : Error ) =>
            {
				if( error instanceof Exception )
				{
					connection.Send( new ChatMessage( `${error.message}`, ChatType.Notice ) );
				}
				else
				{
					let msg = "Что-то пошло не так. Мы работаем над тем, чтобы исправить это как можно скорее. Вы сможете попробовать снова спустя какое-то время";

					connection.Send( new ChatMessage( msg, ChatType.Notice ) );

					Console.WriteLine( Console.FgRed + '%s' + Console.Reset, error.stack );
				}
            }
		);
	}

	public GetName() : string
	{
		return this.constructor.name;
	}

	protected abstract Read() : void;
	protected abstract async Process() : Promise< any >;
}
