// Утилиты для работы с Telegram Web App API

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            photo_url?: string;
          };
          chat?: {
            id: number;
            type: string;
            title?: string;
            username?: string;
            first_name?: string;
            last_name?: string;
          };
        };
        version: string;
        platform: string;
        colorScheme: "light" | "dark";
        themeParams: Record<string, any>;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: (leaveActive?: boolean) => void;
          hideProgress: () => void;
          setParams: (params: {
            text?: string;
            color?: string;
            text_color?: string;
            is_active?: boolean;
            is_visible?: boolean;
          }) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
          notificationOccurred: (type: "error" | "success" | "warning") => void;
          selectionChanged: () => void;
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        sendData: (data: string) => void;
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink: (url: string) => void;
        openInvoice: (url: string, callback?: (status: string) => void) => void;
        showPopup: (params: {
          title?: string;
          message: string;
          buttons?: Array<{
            id?: string;
            type?: "default" | "ok" | "close" | "cancel" | "destructive";
            text: string;
          }>;
        }, callback?: (id: string) => void) => void;
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
        showScanQrPopup: (params: {
          text?: string;
        }, callback?: (data: string) => void) => void;
        closeScanQrPopup: () => void;
        readTextFromClipboard: (callback?: (text: string) => void) => void;
        requestWriteAccess: (callback?: (granted: boolean) => void) => void;
        requestContact: (callback?: (granted: boolean) => void) => void;
        onEvent: (eventType: string, eventHandler: () => void) => void;
        offEvent: (eventType: string, eventHandler: () => void) => void;
      };
    };
  }
}

export const isTelegramWebApp = (): boolean => {
  return typeof window !== "undefined" && window.Telegram?.WebApp !== undefined;
};

export const getTelegramUser = () => {
  if (!isTelegramWebApp()) {
    return null;
  }

  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (!user) {
    return null;
  }

  // Валидация обязательных полей
  if (!user.id || !user.first_name) {
    console.error("Invalid Telegram user data: missing required fields");
    return null;
  }

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    language_code: user.language_code,
    is_premium: user.is_premium,
    photo_url: user.photo_url,
  };
};

/**
 * Проверяет, что initData содержит валидные данные пользователя
 */
export const validateTelegramInitData = (): boolean => {
  if (!isTelegramWebApp()) {
    return false;
  }

  const initData = window.Telegram?.WebApp?.initData;
  const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe;
  
  if (!initData || !initDataUnsafe) {
    return false;
  }

  const user = initDataUnsafe.user;
  if (!user || !user.id || !user.first_name) {
    return false;
  }

  // Проверяем, что initData не пустая
  if (initData.trim().length === 0) {
    return false;
  }

  return true;
};

/**
 * Получает полную информацию о пользователе Telegram
 */
export const getTelegramUserInfo = () => {
  if (!isTelegramWebApp()) {
    return null;
  }

  const user = getTelegramUser();
  if (!user) {
    return null;
  }

  const webApp = window.Telegram?.WebApp;
  
  return {
    user,
    platform: webApp?.platform || "unknown",
    version: webApp?.version || "unknown",
    isExpanded: webApp?.isExpanded || false,
    themeParams: webApp?.themeParams || {},
  };
};

export const initTelegramWebApp = () => {
  if (isTelegramWebApp()) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export const getTelegramChatId = (): number | null => {
  if (!isTelegramWebApp()) {
    return null;
  }

  const chat = window.Telegram?.WebApp?.initDataUnsafe?.chat;
  if (chat) {
    return chat.id;
  }

  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  if (user) {
    return user.id;
  }

  return null;
};

