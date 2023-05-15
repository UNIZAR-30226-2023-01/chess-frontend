import { useState, useEffect } from 'react';
import TypingAnimation from '@/components/TypingAnimation';

const person =
  {
    title: 'Buscando partida...',
    quotes: [
      'Sabías que la partida de ajedrez más corta posible es conocida como "mate pastor"? Esta se puede completar en solo dos movimientos, pero solo funciona si el jugador que tiene las piezas blancas juega de una manera específica.',
      'Sabías que el ajedrez es uno de los deportes más populares del mundo? Se estima que hay alrededor de 600 millones de personas en todo el mundo que juegan ajedrez regularmente, ya sea en torneos, en línea o simplemente por diversión.',
      'Sabías que el récord mundial para la partida de ajedrez más larga jamás jugada es de más de 20 horas? Esta partida fue jugada en Belgrado en 1989 y terminó en tablas después de 269 movimientos.',
      'Sabías que el ajedrez es considerado un deporte olímpico? Aunque no se juega en los Juegos Olímpicos tradicionales, el ajedrez es reconocido como deporte olímpico por el Comité Olímpico Internacional y se juega en los Juegos Olímpicos de la Juventud.',
      'Sabías que el ajedrez es bueno para el cerebro? Se ha demostrado que jugar ajedrez regularmente puede mejorar la función cognitiva y la memoria, así como también puede ayudar a prevenir enfermedades cerebrales como el Alzheimer.',
    ],
  };

export default function SearchGame({onCancel}) {
  const [quote, setQuote] = useState(person.quotes[Math.floor(Math.random() * person.quotes.length)]);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let interval = null;
    if (seconds === 30) setQuote(person.quotes[Math.floor(Math.random() * person.quotes.length)]);

    interval = setInterval(() => {
      if (seconds < 59) {
        setSeconds(seconds + 1);
      } else {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes, quote]);

  return (
    <div className="fixed inset-x-0 bottom-0 px-6 pb-6 z-50">
      <div className="mx-auto max-w-lg divide-y divide-gray-200 rounded-lg bg-white shadow-2xl">
        <div className="flex w-full items-center justify-between space-x-6 p-6">
          <div className="flex-1">
            <div className="flex items-center justify-between space-x-3">
              <h3 className="truncate text-base font-medium text-gray-900">{person.title}</h3>
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              <TypingAnimation text={quote} typingSpeed={50}/>
            </p>
          </div>
        </div>
        <div className="-mt-px flex flex-1 divide-gray-200">
          <button
            onClick={() => onCancel()}
            className="rounded-b-lg flex-1 w-full py-4 text-xs uppercase font-bold  cursor-pointer text-red-600 hover:animate-pulse duration-300"
          >
            cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
