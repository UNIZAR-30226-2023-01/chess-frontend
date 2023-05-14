import Tippy from '@tippyjs/react';

export default function GameButton({text, Icon, onClick}) {
  return (
    <Tippy
      placement='top'
      duration={0}
      arrow={true}
      content={
        <span className="bg-white text-gray-900 tracking-wide font-medium text-xs py-1 px-2 rounded-md">
          {text}
        </span>
      }
    >
      <button
        onClick={onClick}
        className='flex-1 p-2 border rounded-lg hover:bg-gray-50/20 duration-300'
      >
        <Icon className='w-5 h-5 mx-auto text-white' />
      </button>
    </Tippy>
  );
}
