import Tippy from '@tippyjs/react';

export default function Achivement({
  name,
  imgSrc,
  imgAlt,
  achieved,
}) {
  return (
    <Tippy
      key={name}
      placement='bottom'
      duration={0}
      arrow={true}
      content={
        <span className="bg-gray-900/50 text-white tracking-wide font-medium text-xs py-1 px-2 rounded-md">
          {name}
        </span>
      }
    >
      <div className="flex flex-col p-2 items-center">
        <div className="relative">
          <img
            src={imgSrc}
            className={`mx-auto h-20 w-20 ${!achieved && 'grayscale opacity-75 brightness-90'}`}
            alt={imgAlt}
          />
        </div>
      </div>
    </Tippy>

  );
}
