import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('business'); // Default theme is "business"

  // On initial load, set theme based on localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      // Default to "business" theme if no local storage value is present
      setTheme('business');
      document.documentElement.setAttribute('data-theme', 'business');
    }
  }, []);

  // Function to toggle between "business" and "winter" themes
  const toggleTheme = () => {
    const newTheme = theme === 'business' ? 'winter' : 'business';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm rounded-full border bg-base-300">
      {theme === 'business' ? (
        <MoonIcon className="h-4 w-4" />
      ) : (
        <SunIcon className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
