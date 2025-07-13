
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AdminPanel = () => {
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
  }

  return <AdminInterface />;
};

const AdminInterface = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Админ-панель проектов</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 mb-4">Функции админ-панели будут добавлены в следующих обновлениях:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Редактирование названий проектов</li>
            <li>Загрузка новых изображений</li>
            <li>Изменение описаний</li>
            <li>Добавление/удаление проектов</li>
            <li>Управление категориями</li>
          </ul>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
};

const SecretAccess = ({ children }: { children: React.ReactNode }) => {
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
            <h2 className="text-xl font-bold">Скрытый доступ</h2>
            <button 
              onClick={() => setShowAdmin(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          <button 
            onClick={() => window.location.href = '/admin'}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Открыть админ панель
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SecretAccess>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SecretAccess>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;