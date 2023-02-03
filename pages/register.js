import Image from 'next/image';
export default function Home() {
  return (
    <div className="flex flex-row h-full w-full">

      <div className="w-2/5 bg-details md:flex flex-none items-center
       justify-center p-10 overflow-hidden ">

        <div className="ml-10 items-center justify-center">

          <Image src={'/ajedrez.png'}
            className="mx-auto w-2/3"
            alt="Sample image"
          />

          <div className="sm:text-4xl xl:text-5xl mt-10 font-bold
          leading-tight mb-6 text-center">REIGN</div>

        </div>

      </div>


      <div className=" h-screen mt-10 mr-10 ml-20 items-end
      p-10 overflow-hidden justify-self-end ">

        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300
        rounded-full mix-blend-multiply filter blur-xl opacity-70
        animate-blob animation-delay-2000">

        </div>

        <div className="absolute bottom-2 right-20 w-72 h-72 bg-purple-300
        rounded-full mix-blend-multiply filter blur-xl
         opacity-70 animate-blob animation-delay-4000">

        </div>

        <h1 className="text-xl font-body leading-tight
        tracking-tight text-gray-900 mb-10 ">
                  Don not have an account?

                  Register.
        </h1>

        <block className=" justify-self-end flex flex-col col-2 h-1/2
        w-96 drop-shadow-lg">
          <input
            className="ml-2 h-16 w-80 mt-5  px-5 py-1
            focus:outline-none focus:bg-white"
            placeholder="   Email"
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
          />

          <input
            className="ml-2 px-5 py-1  h-16 w-80 mt-5
            focus:outline-none focus:bg-white"
            placeholder="   Username"
            type="name"
            id="username"
            name="username"
            autoComplete="username"
            required
          />

          <input
            className="ml-2  px-5 py-1 h-16 w-80 mt-5
            focus:outline-none focus:bg-white"
            placeholder="   Enter your password"
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            required
          />

          <input
            className="ml-2 px-5 py-1 h-16 w-80 mt-5
             focus:outline-none focus:bg-white"
            placeholder="   Confirm your password"
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            required
          />


          <button className ="ml-2 w-80 h-16 mb-5 mt-6">
          Register
          </button>

        </block>

        <div
          className=" mt-10 flex items-center my-4
            before:flex-1 before:border-t before:border-gray-300
            before:mt-0.5 after:flex-1 after:border-t
            after:border-gray-300 after:mt-0.5"
        >
          <p className="text-center font-semibold mx-4 mb-0">
              OR REGISTER WITH</p>
        </div>


        <div className="flex flex-row justify-center items-center space-x-3">
          <a href="https://www.behance.net/ajeeshmon"
            target="_blank"
            className="w-11 h-11 items-center justify-center
              inline-flex rounded-2xl font-bold text-lg
              bg-blue-900 hover:shadow-lg cursor-pointer
              transition ease-in duration-300" rel="noreferrer">


          </a>
          <a href="https://twitter.com/ajeemon?lang=en"
            target="_blank"
            className="w-11 h-11 items-center justify-center
              inline-flex rounded-2xl font-bold text-lg
              text-white bg-blue-400 hover:shadow-lg cursor-pointer
              transition ease-in duration-300" rel="noreferrer">


          </a>
          <a href="https://in.linkedin.com/in/ajeeshmon"
            target="_blank"
            className="w-11 h-11 items-center justify-center
               inline-flex rounded-2xl font-bold text-lg
               text-white bg-blue-500 hover:shadow-lg cursor-pointer
               transition ease-in duration-300" rel="noreferrer">
          </a>
        </div>

      </div>
    </div>
  );
}
