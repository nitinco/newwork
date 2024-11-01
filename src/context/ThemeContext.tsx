import { createContext, useContext } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'LIGHT',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext); 