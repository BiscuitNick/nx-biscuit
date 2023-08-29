'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

export const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="absolute right-4 top-4"
      onClick={(e) => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
    >
      {theme === 'dark' ? <FaMoon /> : <FaSun />}
    </button>
  );
};
