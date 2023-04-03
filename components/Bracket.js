import { SingleEliminationBracket, Match } from '@g-loot/react-tournament-brackets';
import { matches } from '@/data/matches';

export default function SingleElimination() {
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

    />
  );
}
