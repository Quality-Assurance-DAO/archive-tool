// pages/admin/index.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import type { NextPage } from 'next';

const AdminPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div>Welcome, Admin!</div>;
};

export default AdminPage;
