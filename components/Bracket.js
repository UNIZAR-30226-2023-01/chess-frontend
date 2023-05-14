import { SingleEliminationBracket, Match } from '@g-loot/react-tournament-brackets';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
// import {useGame} from '@/context/GameContext';


export default function SingleElimination({ matches }) {
  const router = useRouter();
  // const { joinMatchAsPlayer, joinRoomAsSpectator } = useGame();
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
        console.log(m);
        const {match} = m;
        if (!match.game) {
          toast('La partida todavía no esta disponible.', { icon: '⌛️' });
          return;
        }
        // unir el socket a la sala del match
        // si soy jugador:   joinMatchAsPlayer(matchID)
        // si no soy jugador:   joinRoomAsSpectator(matchID)
        const aux = match.game.split('/');
        const id = aux[aux.lenght - 1];
        router.push(`/games/${id}`);
      }}
      onPartyClick={(participant) => participant?.id ? router.push(`/u/${participant.id}`) : null}
    />
  );
}
