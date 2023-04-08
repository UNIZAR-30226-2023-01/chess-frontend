import Layout from '@/components/Layout';

export default function Home() {
  return (
    <div className="container px-6 py-10 mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl dark:text-white">Partidas en curso</h1>

      <div className="grid grid-cols-1 gap-10 mt-8 justify-items-center md:grid-cols-2">

        <div className=" mt-20 h-45 w-2/3 bg-white border rounded-lg shadow -xl dark:bg-gray-800 dark:border-gray-900" >
          <img className=" ml-10 pl-10 mt-10 object-cover w-50 h-50 rounded-lg lg:w-64" src="/assets/images/board.png" alt="" />
          <div className="p-5 text-center">
            <a href="#">
              <h5 className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">persona a  persona b</h5>
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-300">On: 15:40</span>
          </div>
        </div>


        <div className=" mt-20 h-45 w-2/3 bg-white border rounded-lg shadow -xl dark:bg-gray-800 dark:border-gray-900" >
          <img className=" ml-10 pl-10 mt-10 object-cover w-50 h-50 rounded-lg lg:w-64" src="/assets/images/board.png" alt="" />
          <div className="p-5 text-center">
            <a href="#">
              <h5 className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">persona a  persona b</h5>
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-300">On: 15:40</span>
          </div>
        </div>

        <div className=" mt-20 h-45 w-2/3 bg-white border rounded-lg shadow -xl dark:bg-gray-800 dark:border-gray-900" >
          <img className=" ml-10 pl-10 mt-10 object-cover w-50 h-50 rounded-lg lg:w-64" src="/assets/images/board.png" alt="" />
          <div className="p-5 text-center">
            <a href="#">
              <h5 className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">persona a  persona b</h5>
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-300">On: 15:40</span>
          </div>
        </div>
        <div className=" mt-20 h-45 w-2/3 bg-white border rounded-lg shadow -xl dark:bg-gray-800 dark:border-gray-900" >
          <img className=" ml-10 pl-10 mt-10 object-cover w-50 h-50 rounded-lg lg:w-64" src="/assets/images/board.png" alt="" />
          <div className="p-5 text-center">
            <a href="#">
              <h5 className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">persona a  persona b</h5>
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-300">On: 15:40</span>
          </div>
        </div>

        <div className=" mt-20 h-45 w-2/3 bg-white border rounded-lg shadow -xl dark:bg-gray-800 dark:border-gray-900" >
          <img className=" ml-10 pl-10 mt-10 object-cover w-50 h-50 rounded-lg lg:w-64" src="/assets/images/board.png" alt="" />
          <div className="p-5 text-center">
            <a href="#">
              <h5 className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">persona a  persona b</h5>
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-300">On: 15:40</span>
          </div>
        </div>
        <div className=" mt-20 h-45 w-2/3 bg-white border rounded-lg shadow -xl dark:bg-gray-800 dark:border-gray-900" >
          <img className=" ml-10 pl-10 mt-10 object-cover w-50 h-50 rounded-lg lg:w-64" src="/assets/images/board.png" alt="" />
          <div className="p-5 text-center">
            <a href="#">
              <h5 className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">persona a  persona b</h5>
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-300">On: 15:40</span>
          </div>
        </div>
      </div>
    </div>

  );
}

Home.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ req }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify`, {
    method: 'POST',
    headers: {
      Cookie: req.headers.cookie,
    },
  })
      .catch((err)=>console.log(err));

  if (!res.ok || res.status !== 200) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { },
  };
}
