import React, { createContext, useState, ReactNode } from 'react';

interface Theme {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<Theme>({
  theme: 'light',
  setTheme: (data) => {
    console.log(data);
  },
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
