import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className=" h-full w-full overflow-hidden">
      <div className="flex flex-col items-center h-screen mt-10 mr-10 ml-20">
        <h1 className="text-xl font-body leading-tight tracking-tight
          text-gray-900 mb-10 ">
            Choose a game mode
        </h1>
        <block className="flex flex-col col-2 h-2/3 w-1/3 
          grid justify-items-start">
          <div className='ml-4'>Joe mama</div>
          <div className="flex flex-row">
            <div classname="bg-black h-full w-1/2">
            </div>
            <div className='grid justify-items-start'>
              <select className="boton w-80 h-16 ml-2
                text-black bg-white focus-outline-none">
                <option>Time</option>
                <option>5 min</option>
                <option>10 min</option>
                <option>15 min</option>
              </select>
              <button
                className ="boton ml-2 w-80 h-16 mt-3 bg-black 
                text-white hover:bg-gray-900">
                Play Ranked!
              </button>
              <button
                className ="boton ml-2 w-80 h-16 mt-3 bg-white 
                text-black  hover:bg-gray-100">
                Play with Friends!
              </button>
              <p className="font-semibold mt-10 mr-24 py-8">
                * Keep in mind that matches played against 
                friends dont alter the ELOs of both sides, 
                therefore the ranks wont be updated
              </p>
              <p className="font-semibold mt-8 ml-32 py-4">
                Or play alone
              </p>
              <button
                className="boton ml-2 w-80 h-16 bg-white text-black 
                hover:bg-gray-100">
                ⚙️ Play against computer
              </button>
            </div>
            </div>
        </block> 
      </div>
    </div>
  );
}
