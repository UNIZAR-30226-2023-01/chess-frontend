
export default function Achivement({
  imageUrl,
  name,
  title,
}) {
  return (
    <div className="flex flex-1 flex-col p-8 items-center">
      <div className="flex-shrink-0 relative">
        <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full" src={imageUrl} alt="" />
        <div className="w-full h-full rounded-full opacity-60 bg-black absolute top-0 left-0 z-10"/>
      </div>
      <h3 className="mt-6 text-sm font-medium text-gray-900">{name}</h3>
      <dl className="mt-1 flex flex-grow flex-col justify-between">
        <dt className="sr-only">Title</dt>
        <dd className="text-sm text-gray-500">{title}</dd>
      </dl>
    </div>
  );
}
