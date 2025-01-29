// pages/login.tsx
import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const LoginPage: NextPage = () => {
  const { signIn, signUp, signInWithDiscord } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDiscordLogin = async () => {
    try {
      await signInWithDiscord();
      // Supabase will handle the redirect and the onAuthStateChange 
      // will update the user once they return.
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: '10px' }}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <button style={{ marginTop: '10px' }} onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
      </button>

      <hr style={{ margin: '20px 0' }} />

      <button onClick={handleDiscordLogin} style={{ background: '#7289da', color: 'white' }}>
        Sign in with Discord
      </button>
    </div>
  );
};

export default LoginPage;
