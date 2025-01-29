// pages/index.tsx
import { NextPage } from 'next';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If there's no user, redirect to login
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: '50px' }}>
      <h1>Welcome to the Discord Auth Demo!</h1>
      <p>Logged in as: {user.email ?? 'Unknown Discord user'}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
};

export default HomePage;
