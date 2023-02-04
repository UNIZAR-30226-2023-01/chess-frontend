import Image from 'next/image';
export default function Register() {
  return (
    <div className="flex flex-row h-full w-full">

      <div className="w-2/5 bg-details md:flex flex-none items-center
       justify-center p-10 overflow-hidden ">

        <div className="ml-10 items-center justify-center">

          <Image src={'/ajedrez.png'}
            className="mx-auto w-2/3"
            width="400"
            height="400"
            alt="Sample image"
          />

          <div className="sm:text-4xl xl:text-5xl mt-10 font-bold
          leading-tight mb-6 text-center">REIGN</div>

        </div>

      </div>


      <div className=" h-screen mt-10 mr-10 ml-20 items-end
      p-10 overflow-hidden justify-self-end ">

        <div className=" circulo top-0 -right-4  bg-blue-300
          rounded-full "></div>

        <div className=" circulo bottom-2 right-20
          bg-purple-300 rounded-full "></div>

        <h1 className="text-xl font-body leading-tight
        tracking-tight text-gray-900 mb-10 ">
                  Don not have an account?

                  Register.
        </h1>

        <block className=" justify-self-end flex flex-col col-2 h-1/2
        w-96 drop-shadow-lg">
          <input
            className="focus:bg-white mt-10"
            placeholder="   Email"
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
          />

          <input
            className="focus:bg-white"
            placeholder="   Username"
            type="name"
            id="username"
            name="username"
            autoComplete="username"
            required
          />

          <input
            className="focus:bg-white"
            placeholder="   Enter your password"
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            required
          />

          <input
            className="focus:bg-white"
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

        <p></p>

      </div>
    </div>
  );
}
