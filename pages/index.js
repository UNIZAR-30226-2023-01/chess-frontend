export default function Home() {
  return (
    <div className="flex flex-row h-full w-full">
      <div className="bg-details h-screen w-1/4 ">
        <h1 className="font-serif">
          Reign
        </h1>
      </div>
      <div className="h-screen">
        <block className="flex flex-col h-1/2 w-96 ">
          <input
            className="h-16 w-80 mt-3"
            placeholder="Enter your email"
          />
          <input
            className="h-16 w-80 mt-3"
            placeholder="Enter your password"
          />
          <p className="justify-self-end">Forgot Password?</p>
          <button className ="w-80 h-16 mt-3">
          Login
          </button>
          <p className="justify-self-end">Not registered yet?</p>
        </block>
      </div>
    </div>
  );
}
