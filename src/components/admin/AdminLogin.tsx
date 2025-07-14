import { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "flexitype2025") {
      onLogin();
    } else {
      alert("Неверный пароль");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Вход в админ-панель</h2>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Пароль админа"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;