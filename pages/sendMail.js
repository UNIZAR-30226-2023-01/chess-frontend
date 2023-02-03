import Image from 'next/image';
export default function sendMail() {
  return (

    <div className="flex flex-row h-full w-full overflow-hidden">

      <div className="w-1/2 bg-white md:flex flex-none items-center
     justify-center p-10 overflow-hidden ">
        <div className="ml-10 items-center justify-center">
          <Image src={'/unblock.jpg'}
            width="600"
            height="600"
            className="mx-auto w-2/3 h-2/3"
            alt="Sample image"
          />
        </div>
      </div>

      <div className=" h-screen w-full items-end p-10
      overflow-hidden justify-self-end align-middle ">


        <block className="bg-details justify-self-end
        align-middle flex flex-col col-2 h-2/3 w-full mt-20 drop-shadow-lg " >
          <h1 className="text-xl font-body leading-tight
         tracking-tight text-gray-900 mb-10 mt-8 ">
          Forgot password?
            <p className="ml-2 justify-self-end mt-3 mb-3">
          Don not worry! It occurs.
          Please enter the email address linked with your account.</p>
          </h1>
          <input
            className="ml-2  px-5 py-1 h-16 w-80 mt-3
            focus:outline-none focus:bg-white"
            placeholder="   Enter your email"
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            required
          />


          <button className ="ml-2 w-80 h-16 mt-3">
           Send Code
          </button>

        </block>


      </div>
    </div>
  );
}
