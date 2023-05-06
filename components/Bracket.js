import { SingleEliminationBracket, Match } from '@g-loot/react-tournament-brackets';

export default function SingleElimination({ matches }) {
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
