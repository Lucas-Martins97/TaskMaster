import { useContext } from 'react';
import LoginContext from '../context/loginContext';

export default function useLogin() {
  return useContext(LoginContext);
}
