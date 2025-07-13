import { useState, useEffect } from "react";

interface SecretAdminAccessProps {
  children: React.ReactNode;
}

const SecretAdminAccess = ({ children }: SecretAdminAccessProps) => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const secretSequence = ['a', 'd', 'm', 'i', 'n'];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const newSequence = [...keySequence, event.key.toLowerCase()].slice(-5);
      setKeySequence(newSequence);
      
      if (newSequence.join('') === secretSequence.join('')) {
        setShowAdmin(true);
        setKeySequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence]);

  if (showAdmin) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Админ доступ</h2>
            <button 
              onClick={() => setShowAdmin(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <AdminContent />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const AdminContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "flexitype2025") {
      setIsAuthenticated(true);
    } else {
      alert("Неверный пароль");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-4">
        <input
          type="password"
          placeholder="Пароль админа"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Войти
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold">Админ панель активна</h3>
      <p className="text-sm text-gray-600">
        Перейдите на /admin для управления проектами
      </p>
      <button 
        onClick={() => window.location.href = '/admin'}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Открыть админ панель
      </button>
    </div>
  );
};

export default SecretAdminAccess;