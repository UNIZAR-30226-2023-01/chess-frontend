import Link from 'next/link';

import Image from 'next/image';
export default function Home() {
  return (

    <div className="flex flex-row h-full w-full overflow-hidden">

      <div className="w-2/5 bg-details md:flex flex-none items-center
        justify-center p-10 overflow-hidden ">
        <div className="ml-10 items-center justify-center">
          <Image src={'/ajedrez.png'}
            width="400"
            height="400"
            className="mx-auto w-2/3"
            alt="Sample image"
          />
          <div className="sm:text-4xl xl:text-5xl mt-10 font-bold
           leading-tight mb-6 text-center">REIGN</div>


        </div>

      </div>


      {/*
                  INICIO DE LA MITAD DERECHA
        */}

      <div className=" h-screen mt-10 mr-10 ml-20 items-end p-10
         overflow-hidden justify-self-end ">
        {/*
          circulos de la derecha
          se pueden animar usando animate y animation-delay
        */}


        <div className=" circulo top-0 right-1 bg-blue-300
          rounded-full "></div>

        <div className=" circulo bottom-7 right-19
          bg-purple-300 rounded-full "></div>

        <h1 className="text-xl font-body leading-tight tracking-tight
          text-gray-900 mb-10 ">
                  Log in
        </h1>


        <block className=" flex flex-col col-2 h-1/2
          w-96 drop-shadow-lg">
          <input
            className="focus:bg-white mt-10"
            placeholder="   Enter your email"
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            required
          />

          <input
            className="focus:bg-white mt-5"
            placeholder="   Enter your password"
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            required
          />

          <Link
            href="/sendMail"
            className="justify-self-end mt-3 mb-3">Forgot password?
          </Link>

          <button
            className ="boton bg-black text-white rounded ml-2 w-80 h-16 mt-3">
          Login
          </button>

          <Link
            href="/register"
            className="justify-self-end mt-3 mb-3">Not registered yet?
          </Link>
        </block>

        <div
          className="flex items-center my-4 before:flex-1 before:border-t
             before:border-gray-300 before:mt-0.5
            after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
        >
          <p className="text-center font-semibold mx-4 mb-0">OR LOGIN WITH
          </p>
        </div>

        {/* BOTONES PARA LAS RSS  */}
        <div className="flex flex-row justify-center items-center space-x-3">
          <a href="" target="_blank"
            className="boton-RRSS inline-flex
              rounded-2xl text-lg
              bg-blue-900 hover:shadow-lg cursor-pointer"
            rel="noreferrer">
          </a>
          <a href="" target="_blank"
            className=" boton-RRSS
              inline-flex rounded-2xl text-lg  text-white
              bg-blue-400 hover:shadow-lg cursor-pointer"
            rel="noreferrer">
          </a>
          <a href="" target="_blank"
            className=" boton-RRSS
              inline-flex rounded-2xl text-lg
              text-white bg-blue-500 hover:shadow-lg cursor-pointer"
            rel="noreferrer">
          </a>
        </div>

        <Link
          href="/juego"
          className="">Play
        </Link>
      </div>
    </div>
  );
}
