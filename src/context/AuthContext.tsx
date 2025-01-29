// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithDiscord: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signIn: async () => null,
  signUp: async () => null,
  signOut: async () => {},
  signInWithDiscord: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      // getSession in Supabase JS v2
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);

      // Listen for changes to the auth state
      const {
        data: authListener,
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    fetchSession();
  }, []);

  /**
   * signIn - logs in an existing user with email/password
   */
  const signIn = async (email: string, password: string): Promise<User | null> => {
    // If you're on v2, signInWithPassword is recommended:
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) throw error;
    // return data.user;
    //
    // But if you're mixing v1 and v2 usage:
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
    return user;
  };

  /**
   * signUp - creates a new user with email/password
   */
  const signUp = async (email: string, password: string): Promise<User | null> => {
    // In v2:
    // const { data, error } = await supabase.auth.signUp({ email, password });
    // if (error) throw error;
    // return data.user;
    //
    // But to match your old usage:
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return user;
  };

  /**
   * signOut - logs out the current user
   */
  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * signInWithDiscord - OAuth with Discord
   */
  const signInWithDiscord = async (): Promise<void> => {
    // In Supabase JS v2, the recommended method is signInWithOAuth
    // For Discord, just pass `provider: 'discord'`.
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        // Provide a redirect if you want a custom callback:
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) throw error;

    // data.url is the Discord OAuth URL
    // Supabase will typically handle the redirect automatically in a new window,
    // or you can programmatically redirect if you prefer.
    // window.location.href = data.url
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        signInWithDiscord,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
