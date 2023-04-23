import Layout from '@/components/Layout';
import Tablero from '@/components/Tablero';
import jwt from 'jsonwebtoken';

export default function Game({user, data}) {
  const lightPlayer = data.lightPlayer === user.id;
  const darkPlayer = data.lightPlayer === user.id;
  const guestPlayer = !lightPlayer && !darkPlayer;

  console.log(lightPlayer, darkPlayer, guestPlayer);

  return (
    <div>
      <Tablero colorUser={'black'}/>
    </div>
  );
}

Game.getLayout = (page) => {
  const { authorized } = page.props;
  return authorized ?
    <Layout>{page}</Layout> :
    <>{page}</>;
};

export async function getServerSideProps(context) {
  const {id} = context.params;
  const {req} = context;

  const decoded = jwt.decode(req.headers.cookie.split('=')[1]);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/authenticate`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/games/${id}`, {
    method: 'GET',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.error(err));

  if (!res2.ok || res2.status !== 200) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const game = await res2.json();

  return {
    props: {
      authorized: !res.ok || res.status !== 200,
      data: game.data,
      user: {
        id: decoded.id,
        username: decoded.username,
      },
    },
  };
}
