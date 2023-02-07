export default function index() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <section className="w-full text-gray-600 body-font overflow-hidden mx-auto">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-5xl text-4xl font-bold title-font mb-2 text-gray-900">Play Chess</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500 max-w-prose">Join the game of chess and challenge your strategic skills. Play against opponents from all over the world and improve your skills, discover the thrill of playing chess now!</p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium uppercase">Play vs the machine</h2>
                <h1 className="text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  Play Computer
                </h1>
                <button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Play Now
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">Literally you probably haven&apost heard of them jean shorts.</p>
              </div>
            </div>
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
              <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium uppercase">Play with someone at your level</h2>
                <h1 className="text-4xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  Play Online
                </h1>
                <button className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Play Now
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">Literally you probably haven&apost heard of them jean shorts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
