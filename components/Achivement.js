export default function Achivement({
  name,
  imgSrc,
  imgAlt,
  achieved,
}) {
  return (
    <div className="flex flex-col p-2 items-center">
      <div className="relative">
        <img
          src={imgSrc}
          className={`mx-auto h-20 w-20 ${!achieved && 'grayscale opacity-75 brightness-90'}`}
          alt={imgAlt}
        />
      </div>
    </div>
  );
}
