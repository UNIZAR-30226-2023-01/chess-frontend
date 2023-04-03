import { SunIcon, MoonIcon} from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

export default function Theme() {
  const { theme, handleThemeChange } = useTheme();

  return (
    <button
      key={theme}
      onClick={handleThemeChange}
      className='cursor-pointer text-gray-200 hover:bg-gray-800/30 group flex items-center px-3 py-3 text-sm font-medium rounded-md w-full'
    >
      {theme === 'dark' ?
      <>
        <SunIcon
          className='text-gray-200  mr-3 flex-shrink-0 h-5 w-5'
          aria-hidden="true"
        />
        Light mode
      </> :
       <>
         <MoonIcon
           className='text-gray-200  mr-3 flex-shrink-0 h-5 w-5'
           aria-hidden="true"
         />
        Dark mode
       </>
      }
    </button>
  );
}
