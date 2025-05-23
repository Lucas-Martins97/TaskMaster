import React, { createContext, useState, ReactNode } from 'react';

interface User {
  login: string;
  setLogin: (login: string) => void;
}

const LoginContext = createContext<User>({
  login: '',
  setLogin: (data) => {},
});

export const LoginProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [login, setLogin] = useState('');
  return <LoginContext.Provider value={{ login, setLogin }}>{children}</LoginContext.Provider>;
};

export default LoginContext;
