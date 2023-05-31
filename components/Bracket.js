import { SingleEliminationBracket, Match } from '@g-loot/react-tournament-brackets';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import {useGame} from '@/context/GameContext';


export default function SingleElimination({ matches, user }) {
  const router = useRouter();
  const { joinMatchAsPlayer, joinRoomAsSpectator } = useGame();

  return (
    <SingleEliminationBracket
      matches={matches}
      matchComponent={Match}
      options={{
        style: {
          connectorColor: '#CED1F288',
          connectorColorHighlight: '#CED1F2',
        },
      }}
      onMatchClick={(m) => {
        const {match} = m;
        if (!match.game || match.participants.length < 2) {
          toast('La partida no esta disponible.', { icon: '⌛️' });
          return;
        }

        // unir el socket a la sala del match
        if (match.participants[0].id === user.id || match.participants[1].id === user.id) joinMatchAsPlayer(match.id);
        else joinRoomAsSpectator(match.id);

        const aux = match.game.split('/');
        const id = aux[aux.length - 1];
        router.push(`/games/${id}`);
      }}
      onPartyClick={(participant) => participant?.id ? router.push(`/u/${participant.id}`) : null}
    />
  );
}
