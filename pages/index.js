import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ScrollTrigger from 'react-scroll-trigger';
import CountUp from '@/components/CountUp';
import { useState } from 'react';

const stats = [
  { id: 1, name: 'Jugadores registrados', value: '8000+' },
  { id: 2, name: 'Partidas diarias', value: '750+' },
  { id: 3, name: 'Torneos diarios', value: '200+' },
  { id: 4, name: 'Garantía de disponibilidad', value: '99%' },
];

export default function Index({logged}) {
  const [inView, setInView] = useState(false);

  return (
    <div className="relative isolate bg-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
      </svg>
      <Navbar logged={logged}/>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Domina el tablero de ajedrez en línea
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Toma el control del tablero de ajedrez desde cualquier lugar del mundo. Regístrate hoy y comienza a jugar al
           ajedrez en línea, ¡la diversión y la competencia te esperan!
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Jugar ahora
            </Link>
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
              Descubrir más <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          <svg viewBox="0 0 366 729" role="img" className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl">
            <title>App screenshot</title>
            <defs>
              <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                <rect width={316} height={684} rx={36} />
              </clipPath>
            </defs>
            <path
              fill="#4B5563"
              d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
            />
            <path
              fill="#343E4E"
              d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
            />
            <foreignObject
              width={316}
              height={684}
              transform="translate(24 24)"
              clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
            >
              <img src="/assets/images/inicio.png" alt="" />
            </foreignObject>
          </svg>
        </div>
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div id='features' className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Con la confianza de jugadores de todo el mundo
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
              Algunos números sorprendentes de nuestra plataforma de ajedrez.
              </p>
            </div>
            <ScrollTrigger onEnter={() => setInView(true)} onExit={() => setInView(false)}>
              <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                    <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                      {inView && <CountUp start={0} end={Number(stat.value.match(/\d+/)[0])} timer={10} symbol={stat.value.match(/\D+/)[0]}/>}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollTrigger>
          </div>
        </div>
      </div>
      <div id='news' className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
            <div className="lg:pt-4 lg:pr-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">Juega comodamete</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Una interfaz nueva</p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Juega partidas de ajedrez online con jugadores de todo el mundo. Disfruta de partidas emocionantes y desafiantes con este nuevo programa de ajedrez en el que
                  puedes elegir entre distintos modos de juego y aumentar tu nivel.
                </p>
                <div className="mt-8">
                  <Link
                    href="/home"
                    className="inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Empezar a jugar
                  </Link>
                </div>
                <figure className="mt-16 border-l border-gray-200 pl-8 text-gray-600">
                </figure>
              </div>
            </div>
            <img
              src="/assets/images/web_screenshot.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Listo para empezar?
            <br />
          Descarga ya la app o quédate en la web.
          </h2>
          <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <Link
              href="/home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Jugar Ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Index.getLayout = (page) => {
  return (
    <div className='flex flex-col gap-y-16'>
      <main>
        {page}
      </main>
      <Footer/>
    </div>
  );
};

export async function getServerSideProps({req}) {
  const newQueryString = req.headers.cookie.replace(/;/g, '&');
  const cookies = new URLSearchParams(newQueryString);
  const token = cookies.get('api-auth');

  return {
    props: {
      logged: !!token,
    },
  };
}
