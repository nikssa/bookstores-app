import { useState } from 'react';
import './ThemeButton.scss';

type ThemeButtonProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

function ThemeButton({ theme, setTheme }: ThemeButtonProps) {
  const [isOn, setIsOn] = useState(false);
  return (
    <button
      className={`theme-toggle-button ${isOn ? 'on' : 'pulse'} ${theme}`}
      onMouseEnter={() => setIsOn(true)}
      onMouseLeave={() => setIsOn(false)}
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        setIsOn(false);
      }}>
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}

export default ThemeButton;
