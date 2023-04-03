import React, {useState, useContext, useEffect} from 'react';

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({children}) {
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
    <ThemeContext.Provider value={{
      theme,
      handleThemeChange,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
