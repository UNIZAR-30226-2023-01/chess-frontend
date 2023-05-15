import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import jwt from 'jsonwebtoken';

const Bracket = dynamic(
    () => import('@/components/Bracket'),
    { ssr: false },
);

export default function Rounds({tournament, user}) {
  useEffect(() => {
    // Preload the component during the initial navigation
    Bracket.preload();
  }, []);

  const matches = tournament.matches.map((match) => {
    const participants = match.participants.map((participant) => {
      return {...participant, name: participant.username};
    });
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return {...match, tournamentRoundText: match.tournamentRoundText.replace('Ronda ', ''), participants, startTime: new Date(match.startTime).toLocaleDateString('es-ES', options)};
  });

  return (
    <div className="px-0 sm:px-6 lg:px-8 py-12 mx-auto flex items-center justify-center">
      <Bracket matches={matches} user={user}/>
    </div>

  );
}

Rounds.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { req } = context;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  if (!res.ok || res.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const newQueryString = req.headers.cookie.replace(/;/g, '&');
  const cookies = new URLSearchParams(newQueryString);
  const token = cookies.get('api-auth');
  const decoded = jwt.decode(token);

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/tournaments/${id}`, {
    method: 'GET',
    headers: { Cookie: req.headers.cookie },
  }).catch((err)=>console.error(err));

  if (!res2.ok || res2.status !== 200) {
    return {
      redirect: {
        destination: '/tournaments',
        permanent: false,
      },
    };
  }

  const tournament = await res2.json();

  return {
    props: {
      tournament: tournament?.data,
      user: {
        id: decoded.id,
        username: decoded.username,
        token,
      },
    },
  };
}
