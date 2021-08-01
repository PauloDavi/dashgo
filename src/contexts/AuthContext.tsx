import {
  useContext,
  useState,
  ReactNode,
  useEffect,
  createContext,
} from 'react';

import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { authApi } from '@services/authApi';

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  singIn: (credentials: SingInCredentials) => Promise<void>;
  singOut: () => void;
  user: User;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  permissions: string[];
  roles: string[];
}

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function singOut() {
  destroyCookie(undefined, 'dashGo.token');
  destroyCookie(undefined, 'dashGo.refreshToken');

  authChannel.postMessage('singOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = message => {
      switch (message.data) {
        case 'singOut':
          Router.push('/');
          break;
        case 'singIn':
          Router.push('/dashboard');
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { 'dashGo.token': token } = parseCookies();

    if (token) {
      authApi
        .get('me')
        .then(response => {
          const { email, permissions, roles } = response.data;

          setUser({
            email,
            permissions,
            roles,
          });
        })
        .catch(() => {
          singOut();
        });
    }
  }, []);

  async function singIn({ email, password }: SingInCredentials) {
    try {
      const { data } = await authApi.post('sessions', {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = data;

      setCookie(undefined, 'dashGo.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setCookie(undefined, 'dashGo.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      authApi.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser({
        email,
        permissions,
        roles,
      });

      authChannel.postMessage('singIn');

      Router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        user,
        singIn,
        singOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
