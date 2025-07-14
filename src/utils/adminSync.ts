const API_BASE_URL = '/api/admin';

export interface AdminData {
  about?: any;
  projects?: any;
  contacts?: any;
}

class AdminSyncManager {
  private syncInterval: number = 2000; // 2 секунды
  private isOnline: boolean = navigator.onLine;

  constructor() {
    this.setupOnlineListener();
  }

  private setupOnlineListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncFromServer();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Сохранение данных на сервер
  async saveToServer(key: string, data: any): Promise<boolean> {
    if (!this.isOnline) {
      console.warn('Offline mode - data saved locally only');
      return false;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error saving to server:', error);
      return false;
    }
  }

  // Загрузка данных с сервера
  async loadFromServer(key: string): Promise<any | null> {
    if (!this.isOnline) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${key}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error loading from server:', error);
      return null;
    }
  }

  // Синхронизация данных
  async syncData(key: string, data: any): Promise<void> {
    // Сохраняем локально
    localStorage.setItem(key, JSON.stringify(data));
    
    // Пытаемся сохранить на сервер
    const serverSaved = await this.saveToServer(key, data);
    
    if (serverSaved) {
      // Уведомляем все вкладки/устройства
      this.broadcastUpdate(key, data);
    }
  }

  // Получение данных (с сервера или локально)
  async getData(key: string, defaultData: any): Promise<any> {
    // Сначала пытаемся получить с сервера
    const serverData = await this.loadFromServer(key);
    
    if (serverData) {
      // Обновляем локальные данные
      localStorage.setItem(key, JSON.stringify(serverData));
      return serverData;
    }

    // Если сервер недоступен, берем из localStorage
    const localData = localStorage.getItem(key);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch {
        return defaultData;
      }
    }

    return defaultData;
  }

  // Широковещательное обновление
  private broadcastUpdate(key: string, data: any): void {
    // Кастомное событие для мгновенной синхронизации
    window.dispatchEvent(new CustomEvent('admin-sync-update', {
      detail: { key, data, timestamp: Date.now() }
    }));

    // Storage event для совместимости
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue: JSON.stringify(data),
      oldValue: localStorage.getItem(key)
    }));
  }

  // Синхронизация с сервера
  async syncFromServer(): Promise<void> {
    const keys = ['admin-about', 'admin-projects', 'admin-contacts'];
    
    for (const key of keys) {
      const serverData = await this.loadFromServer(key);
      if (serverData) {
        const localData = localStorage.getItem(key);
        const localParsed = localData ? JSON.parse(localData) : null;
        
        // Проверяем, отличаются ли данные
        if (JSON.stringify(serverData) !== JSON.stringify(localParsed)) {
          localStorage.setItem(key, JSON.stringify(serverData));
          this.broadcastUpdate(key, serverData);
        }
      }
    }
  }

  // Автоматическая синхронизация
  startAutoSync(): void {
    setInterval(() => {
      this.syncFromServer();
    }, this.syncInterval);
  }
}

export const adminSyncManager = new AdminSyncManager();