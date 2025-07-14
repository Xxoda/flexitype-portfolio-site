import { useState, useEffect } from 'react';

interface SecretAccessProps {
  children: React.ReactNode;
}

const SecretAccess = ({ children }: SecretAccessProps) => {
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

export default SecretAccess;