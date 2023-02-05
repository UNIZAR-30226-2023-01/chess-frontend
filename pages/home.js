export default function Home() {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex flex-col items-center mt-20">
        <h1 className="leading-tight tracking-tight
          text-gray-900 mb-10">
            Choose a game mode
        </h1>
        <block className="flex flex-col col-2 w-1/3
          grid justify-items-start">
          <div className='ml-4 mb-2 mt-2'>Joe mama</div>
          <div className="flex flex-row row-2">
            <div className="grid h-full w-1/2">
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
              <p className="font-semibold mt-8 mr-24">
                * Keep in mind that matches played against
                friends dont alter the ELOs of both sides,
                therefore the ranks wont be updated
              </p>
              <p className="font-semibold mt-4 ml-32 py-4">
                Or play alone
              </p>
              <button
                className="boton ml-2 w-80 h-16 bg-white text-black
                hover:bg-gray-100 mb-8">
                ⚙️ Play against computer
              </button>
            </div>
          </div>
        </block>
      </div>
    </div>
  );
}
