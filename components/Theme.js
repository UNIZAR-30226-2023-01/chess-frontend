import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

export default function Theme({active}) {
  const { theme, handleThemeChange } = useTheme();

  return (
    <button
      key={theme}
      onClick={handleThemeChange}
      className='flex items-center text-sm w-full px-4 py-3'
    >
      {theme === 'dark' ?
      <>
        <SunIcon
          className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
          aria-hidden="true"
        />
        Modo claro
      </> :
       <>
         <MoonIcon
           className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
           aria-hidden="true"
         />
        Modo oscuro
       </>
      }
    </button>
  );
}
