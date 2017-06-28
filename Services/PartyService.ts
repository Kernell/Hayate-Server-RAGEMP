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

import * as Entity         from "../Entity";
import * as ServerPackets  from "../Network/Packets/Server";
import { Server }          from "../Server";
import { PlayerLogic }     from "../Logic/PlayerLogic";
import { PlayerService }   from "./PlayerService";
import { ServiceBase }     from "./ServiceBase";
import { DatabaseService } from "./DatabaseService";

type Party = Entity.World.Party;

export class PartyService extends ServiceBase
{
	public static readonly MaxPlayers = 5;

	private partyList = new Array<Party>();

	public CanPlayerJoinParty( player : Entity.Player, party : Party, sendErrors : boolean = true ) : boolean
	{
		if( player.Party != null )
		{
			return false;
		}

		if( party.Members.find( plr => plr.GetID() == player.GetID() ) )
		{
			return false;
		}

		if( party.Members.length >= PartyService.MaxPlayers )
		{
			if( sendErrors )
			{
				//player.Connection.Send( SystemMessages.ThePartyIsFull );
			}

			return false;
		}

		return true;
	}

	public KickPlayer( initiator : Entity.Player, playerId : number ) : void
	{
		if( initiator.Party == null )
		{
			return;
		}

		let player = this.GetPayerById( initiator.Party, playerId );

		if( player == null || player.Party == null )
		{
			return;
		}

		if( !this.IsLeader( initiator ) )
		{
			return;
		}

		this.RemovePlayer( player, initiator.Party );
	}

	public Leave( player : Entity.Player )
	{
		if( player.Party == null )
		{
			return;
		}

		this.RemovePlayer( player, player.Party );
	}

	public CreateParty( inviter : Entity.Player, invited : Entity.Player ) : void
	{
		if( inviter.Party != null || invited.Party != null )
		{
			return;
		}

		this.partyList.push( new Entity.World.Party( invited, inviter ) );

		this.Update( inviter.Party );
	}

	public AddPlayerToParty( invited : Entity.Player, party : Party ) : void
	{
		if( !this.CanPlayerJoinParty( invited, party ) )
		{
			return;
		}

		party.Members.push( invited );

		invited.Party = party;

		this.Update( party );

		//Server.RelationService.Update( invited );
	}

	public RemovePlayer( player : Entity.Player, party : Party ) : void
	{
		if( player.Party.Members.length <= 2 )
		{
			this.Remove( player.Party );

			return;
		}

		player.Party.Members.remove( player );

		this.SendPacketToPartyMembers( party, new ServerPackets.PartyRemoveMember( player ) );
		this.Update( player.Party );

		player.Party = null;

		player.Connection.Send( new ServerPackets.PartyLeave( player ) );
	}

	public Remove( party : Party ) : void
	{
		this.partyList.remove( party );

		for( let member of party.Members )
		{
			member.Party = null;

			member.Connection.Send( new ServerPackets.PartyLeave( member ) );
		}
	}

	public Disband( player : Entity.Player ) : void
	{
		if( !this.IsLeader( player ) )
		{
			return;
		}

		this.Remove( player.Party );

		// TODO: System message
	}

	public PromotePlayer( promoter : Entity.Player, promotedId : number ) : void
	{
		let promoted = this.GetPayerById( promoter.Party, promotedId );

		if( promoted == null )
		{
			return;
		}

		if( promoter.Party != promoted.Party )
		{
			return;
		}

		if( !this.IsLeader( promoted ) && this.IsLeader( promoter ) )
		{
			promoter.Party.Members.remove( promoted );
			promoter.Party.Members.unshift( promoted );

			// TODO: sytem message

			this.Update( promoter.Party );
		}
	}

	public SendPacketToPartyMembers( party : Party, packet : IServerPacket, sender : Entity.Player = null ) : void
	{
		if( party == null )
		{
			return;
		}

		for( let member of party.Members )
		{
			if( member.GetID() != sender.GetID() && member.Connection != null )
			{
				member.Connection.Send( packet );
			}
		}
	}

	public Update( party : Party ) : void
	{
		if( party == null )
		{
			return;
		}

		this.SendPacketToPartyMembers( party, new ServerPackets.PartyList( party.Members ) );
		this.SendLifestatsToPartyMembers( party );
	}

	public SendLifestatsToPartyMembers( party : Party ) : void
	{
		if( party == null )
		{
			return;
		}

		for( let partyMember of party.Members )
		{
			if( partyMember.IsOnline() )
			{
				for( let member of party.Members )
				{
					if( member.IsOnline() )
					{
						partyMember.Connection.Send( new ServerPackets.PartyStats( member ) );
					}
				}
			}
		}
	}

	public SendMemberPositionToPartyMembers( player : Entity.Player ) : void
	{
		if( player.Party == null )
		{
			return;
		}

		this.SendPacketToPartyMembers( player.Party, new ServerPackets.PartyMemberPosition( player ) );
	}

	public GetOnlineMembers( party : Party ) : Array< Entity.Player >
	{
		return party.Members.filter( member => member.Connection != null );
	}

	public AddExperience( player : Entity.Player, experience : number ) : void
	{
		player.Party.Experience += experience;
	}

	public ReleaseExp( player: Entity.Player ) : void
	{
		let expPerMember = player.Party.Experience / player.Party.Members.length;

		player.Party.Experience = 0;

		player.Party.Members.forEach( member => Server.PlayerService.AddExperience( member, expPerMember ) );
	}

	public HandleChatMessage( player : Entity.Player, message : string ) : void
	{
		if( player.Party == null )
		{
			//player.Connection.Send( SystemMessages.YoureNotInAParty );

			return;
		}

		this.SendPacketToPartyMembers( player.Party, new ServerPackets.ChatMessage( player, message, ChatType.Party ) );
	}

	private IsLeader( player : Entity.Player ) : boolean
	{
		if( player.Party == null )
		{
			return false;
		}

		return player.Party.Members[ 0 ].GetID() == player.GetID();
	}

	private GetPayerById( party : Party, playerId : number ) : Entity.Player
	{
		return party.Members.find( member => member.GetID() == playerId );
	}
}
