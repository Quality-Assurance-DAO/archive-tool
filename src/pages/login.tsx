// pages/login.tsx
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const LoginPage: NextPage = () => {
  const { user, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleDiscordLogin = async () => {
    try {
      await signIn();
      // If signIn doesn't redirect immediately, 
      // you can manually redirect. But typically
      // OAuth flow will handle that automatically.
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>Log In with Discord</h2>
      <button
        onClick={handleDiscordLogin}
        style={{
          backgroundColor: '#5865F2',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          fontSize: '16px',
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        Sign In with Discord
      </button>
    </div>
  );
};

export default LoginPage;
