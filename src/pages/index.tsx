// pages/index.tsx

import type { NextPage } from 'next';
import { useAuth } from '../context/AuthContext';

const HomePage: NextPage = () => {
  const { user, signOut } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={signOut}>Logout</button>
        </>
      ) : (
        <p>Please login.</p>
      )}
    </div>
  );
};

export default HomePage;
