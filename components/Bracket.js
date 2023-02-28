import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
import { matches } from '@/data/matches';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function SingleElimination() {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

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
      svgWrapper={({ children, ...props }) => (
        <SVGViewer
          background="#343541"
          SVGBackground="#343541"
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SVGViewer>
      )}
    />
  );
}
