
export default function socketTest() {
  return (
    <div className='h-screen flex items-center flex-col w-full p-6'>
      <div className='max-w-prose w-full flex flex-col items-center gap-y-2'>
        <form className='flex items-center justify-center gap-x-2 h-10'>
          <input type="text" placeholder='roomId' className='h-full flex-1' />
          <button
            className='bg-black text-white py-2 px-4 rounded-none h-full w-24'
          >
          search
          </button>
        </form>
        <form className='flex items-center justify-center gap-x-2 h-10'>
          <input type="text" placeholder='message' className='h-full flex-1' />
          <button
            className='bg-black text-white py-2 px-4 rounded-none h-full w-24'
          >
          send
          </button>
        </form>
      </div>
      <div className='max-w-prose w-full p-6'>
        <div className='flex justify-center h-96 border-4 border-dashed p-4'>
          mensajes
        </div>
      </div>
    </div>
  );
}
