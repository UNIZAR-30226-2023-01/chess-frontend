export default function Legal({
  title,
  desciption,
  list,
}) {
  return (
    <div className=''>
      <h2 className='text-xl font-bold py-2 mb-2'>{title}</h2>
      <p className='text-sm tracking-wide'>{desciption}</p>
      {list && (
        <ul className='list-disc list-inside mt-4'>
          {list.map((listItem, index) => (
            <li key={index} className='ml-8 text-sm tracking-wide list-disc list-outside'>{listItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
