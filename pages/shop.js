import Layout from '@/components/Layout';
import { globals } from '@/components/colors';
const products = [
  {
    id: 1,
    name: 'Tablero de madera',
    color1: '0xFFB88B4A', // maderaN
    color2: '0xFFE3C16F', // maderaB
    href: '#',
    imageSrc: 'https://www.chess.com/dynboard?board=green&fen=rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR&piece=neo&size=2',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 2,
    name: 'Tablero coral',
    color1: '0xFF70A2A3', // coralN
    color2: '0xFFB1E4B9', // coralB
    href: '#',
    imageSrc: 'https://www.chess.com/dynboard?board=green&fen=rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR&piece=neo&size=2',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 3,
    name: 'Tablero oscuro',
    color1: '0xFF706677', // oscuroN
    color2: '0xFFCCB7AE', // oscuroB
    href: '#',
    imageSrc: 'https://www.chess.com/dynboard?board=green&fen=rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR&piece=neo&size=2',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 4,
    name: 'Tablero marino',
    color1: '0xff6f73d2', // marN
    color2: '0x9dacff', // marB
    href: '#',
    imageSrc: 'https://www.chess.com/dynboard?board=green&fen=rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR&piece=neo&size=2',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 5,
    name: 'Tablero color trigo',
    color1: '0xffbbbe64', // trigoN
    color2: '0xffeaf0ce', // trigoB
    href: '#',
    imageSrc: 'https://www.chess.com/dynboard?board=green&fen=rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR&piece=neo&size=2',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 6,
    name: 'Tablero color esmeralda',
    color1: '0xff6f8f72', // esmeraldaN
    color2: '0xffad8d8f', // esmeraldaB
    href: '#',
    imageSrc: 'https://www.chess.com/dynboard?board=green&fen=rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR&piece=neo&size=2',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  // More products...
];
function reinicioColor(color1, color2) {
  globals.colorTablero1=color1;
  globals.colorTablero2=color2;
}

export default function Example() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center ">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-left text-gray-900">Shop</h1>
          <p className="mt-2 text-sm text-left text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-16 sm:py-16 lg:max-w-7xl">
        <h2 className="text-xl font-bold text-gray-900">Boards</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900 text-left">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 text-left"></p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-80"
                  />
                  <p className="relative text-lg font-semibold text-white text-left">{product.price}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  onClick={() => {
                    reinicioColor(product.color1, product.color2);
                  }}>
                  Unlock<span className="sr-only">, {product.name}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-16 sm:py-16 lg:max-w-7xl">
        <h2 className="text-xl font-bold text-gray-900">Pieces</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900 text-left">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 text-left">{product.color}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-80"
                  />
                  <p className="relative text-lg font-semibold text-white text-left">{product.price}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Unlock<span className="sr-only">, {product.name}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Example.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
