import { useState, useEffect } from 'react';

interface AdminDataHook<T> {
  data: T;
  setData: (data: T) => void;
  saveData: () => void;
}

const SYNC_INTERVAL = 1000; // 1 секунда
const STORAGE_SYNC_KEY = 'admin-sync-timestamp';

export const useAdminData = <T>(
  key: string,
  initialData: T,
  successMessage: string = 'Данные сохранены!'
): AdminDataHook<T> => {
  const [data, setData] = useState<T>(initialData);
  const [lastSyncTime, setLastSyncTime] = useState<number>(0);

  // Функция для загрузки данных из localStorage
  const loadData = () => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsedData = JSON.parse(saved);
        setData(parsedData);
        return parsedData;
      }
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
    }
    return initialData;
  };

  // Функция для сохранения данных
  const saveData = () => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      
      // Обновляем timestamp синхронизации
      const syncTime = Date.now();
      localStorage.setItem(STORAGE_SYNC_KEY, syncTime.toString());
      setLastSyncTime(syncTime);
      
      // Уведомляем другие вкладки/окна об изменении
      window.dispatchEvent(new CustomEvent('admin-data-changed', {
        detail: { key, data, timestamp: syncTime }
      }));
      
      // Эмулируем событие storage для синхронизации
      window.dispatchEvent(new StorageEvent('storage', {
        key,
        newValue: JSON.stringify(data),
        oldValue: localStorage.getItem(key)
      }));
      
      alert(successMessage);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      alert('Ошибка при сохранении данных');
    }
  };

  // Проверка обновлений с других устройств/вкладок
  const checkForUpdates = () => {
    try {
      const currentSyncTime = parseInt(localStorage.getItem(STORAGE_SYNC_KEY) || '0');
      if (currentSyncTime > lastSyncTime) {
        const updatedData = loadData();
        setLastSyncTime(currentSyncTime);
        
        // Уведомляем компоненты об обновлении
        window.dispatchEvent(new CustomEvent('admin-data-updated', {
          detail: { key, data: updatedData }
        }));
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  // Инициализация при загрузке
  useEffect(() => {
    const initialData = loadData();
    const syncTime = parseInt(localStorage.getItem(STORAGE_SYNC_KEY) || '0');
    setLastSyncTime(syncTime);
  }, []);

  // Слушатель изменений в localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const updatedData = JSON.parse(e.newValue);
          setData(updatedData);
        } catch (error) {
          console.error('Error parsing storage update:', error);
        }
      }
    };

    // Слушатель кастомных событий
    const handleCustomEvent = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setData(e.detail.data);
        setLastSyncTime(e.detail.timestamp);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('admin-data-changed', handleCustomEvent as EventListener);
    
    // Периодическая проверка обновлений
    const interval = setInterval(checkForUpdates, SYNC_INTERVAL);
    
    // Проверка при фокусе на окно
    const handleFocus = () => {
      checkForUpdates();
    };
    
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('admin-data-changed', handleCustomEvent as EventListener);
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [key, lastSyncTime]);

  return {
    data,
    setData,
    saveData
  };
};