import {useState, useEffect} from 'react';
import { SunIcon, MoonIcon} from '@heroicons/react/24/outline';

export default function Theme() {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const localTheme = localStorage.getItem('editor-theme');
    if (localTheme !== 'null' && localTheme !== 'undefined') {
      setTheme(localTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('editor-theme', theme);
  }, [theme]);

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

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
