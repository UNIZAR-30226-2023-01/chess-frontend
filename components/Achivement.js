export default function Achivement({
  imageUrl,
  name,
  id,
  unlocked,
}) {
  return (
    <div className="flex flex-1 flex-col p-8 items-center">
      <div className="flex-shrink-0 relative">
        {unlocked && <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full" src={imageUrl} alt="" />}
        {!unlocked && <img className="mx-auto h-24 w-24 flex-shrink-0 rounded-full" src={`/assets/achievements_false/${id}.png`} alt="" />}
      </div>
      <h3 className="mt-6 text-sm font-medium text-gray-900 dark:text-white">{name}</h3>
    </div>
  );
}
