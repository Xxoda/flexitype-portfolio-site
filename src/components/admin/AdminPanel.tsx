import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminInterface from './AdminInterface';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminInterface />;
};

export default AdminPanel;