export default function Table() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 py-10 border-gray-100  ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
                Name
            </th>
            <th scope="col" className="px-6 py-3">
                Ends
            </th>
            <th scope="col" className="px-6 py-3">
                Players
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Torneo 1
            </th>
            <td className="px-6 py-4">
                4/4
            </td>
            <td className="px-6 py-4">
                8
            </td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white">
               Torneo 2
            </th>
            <td className="px-6 py-4">
              4/4
            </td>
            <td className="px-6 py-4">
                8
            </td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Torneo 3
            </th>
            <td className="px-6 py-4">
              4/4
            </td>
            <td className="px-6 py-4">
              8
            </td>
            <td className="px-6 py-4 text-right">
              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
