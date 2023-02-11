/* This example requires Tailwind CSS v3.0+ */
import Link from 'next/link';

export default function Example() {
  return (
    <div className="static bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text- sm:text-5xl">
            Play Chess
          </p>
        </div>

        <div className="pt-24">
          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p className="uppercase tracking-loose w-full">ABOUT THE PAGE</p>
              <h1 className="text-white my-4 text-5xl font-bold leading-tight">
               Want to play chess?
              </h1>
              <p className="text-white leading-normal pt-5 text-2xl mb-8">
              Join the game of chess and challenge your strategic skills. Play against opponents
          from all over the world and improve your skills, discover the thrill of playing chess now!
              </p>
              <Link href="/login" >
                <button className="mx-auto mt-2 lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Play
                </button>
              </Link>
            </div>
            <div className="w-full md:w-3/5 py-6 text-center">
              <img className="w-full md:w-4/5 z-50" src="landing.jpg" alt=""/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap flex-col-reverse sm:flex-row"></div>
      <section className="bg-white border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Choose your opponent
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 mt-10 pt-5">
              Play against the computer
              </h3>
              <p className="text-gray-600 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                <br />
                <br />
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img className=" w-full sm:w-1/2 p-6 " src="Match_Bot.png" alt=""/>
            </div>
          </div>
          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <img className=" w-full sm:w-1/2 p-6 " src="Private_Match_1.png" alt="" />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 mt-10 pt-5">
                  Play against a friend
                </h3>
                <p className="text-gray-600 mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                  <br />
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 mt-10 pt-5">
                Train to become better
              </h3>
              <p className="text-gray-600 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                <br />
                <br />
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img className=" w-full sm:w-1/2 p-6 " src="Training_Match.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
