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

      <div className=" h-screen mt-10 mr-10 ml-20 items-end p-10
         overflow-hidden justify-self-end ">

        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300
          rounded-full mix-blend-multiply filter blur-xl
        opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-2 right-20 w-72 h-72
          bg-purple-300 rounded-full mix-blend-multiply filter
        blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <h1 className="text-xl font-body leading-tight tracking-tight
          text-gray-900 mb-10 ">
                  Log in
        </h1>
        <block className=" justify-self-end flex flex-col col-2 h-1/2
          w-96 drop-shadow-lg">
          <input
            className="ml-2  px-5 py-1 h-16 w-80 mt-3 focus:outline-none
              focus:bg-white"
            placeholder="   Enter your email"
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            required
          />

          <input
            className="ml-2  px-5 py-1 h-16 w-80 mt-3 focus:outline-none
              focus:bg-white"
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
            className ="ml-2 w-80 h-16 mt-3">
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


        <div className="flex flex-row justify-center items-center space-x-3">
          <a href="" target="_blank"
            className="w-11 h-11 items-center justify-center inline-flex
              rounded-2xl font-bold text-lg
              bg-blue-900 hover:shadow-lg cursor-pointer transition
              ease-in duration-300" rel="noreferrer">


          </a>
          <a href="" target="_blank"
            className="w-11 h-11 items-center justify-center
               inline-flex rounded-2xl font-bold text-lg  text-white
               bg-blue-400 hover:shadow-lg cursor-pointer
                transition ease-in duration-300" rel="noreferrer">

          </a>
          <a href=""
            target="_blank"
            className="w-11 h-11 items-center justify-center
              inline-flex rounded-2xl font-bold text-lg
              text-white bg-blue-500 hover:shadow-lg cursor-pointer
              transition ease-in duration-300" rel="noreferrer">
          </a>
        </div>

        <Link
          href="/juego"
          className="justify-self-end mt-3 mb-3">Play
        </Link>
      </div>
    </div>
  );
}
