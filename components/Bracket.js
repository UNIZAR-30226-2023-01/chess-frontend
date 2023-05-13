import { SingleEliminationBracket, Match } from '@g-loot/react-tournament-brackets';
import { useRouter } from 'next/router';
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
        const {match} = m;
        if (!match.game) return;
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
