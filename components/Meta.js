import Head from 'next/head';

export default function Meta({title, keywords, description}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

Meta.defaultProps = {
  title: 'REIGN | Chess Online',
  keywords: 'AI, Chess, Online, Game, Multiplayer, 1v1, 1vAI',
  description: 'A chess game online',
};
