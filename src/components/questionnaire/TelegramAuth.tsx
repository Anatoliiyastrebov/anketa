import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { TelegramUser } from "@/types/questionnaire";
import { MessageCircle, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TELEGRAM_CONFIG } from "@/config/telegram";
import { isTelegramWebApp, getTelegramUser, initTelegramWebApp } from "@/utils/telegram-webapp";

interface TelegramAuthProps {
  onAuth: (user: TelegramUser) => void;
  onBack?: () => void;
}

export const TelegramAuth = ({ onAuth, onBack }: TelegramAuthProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState<TelegramUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const widgetLoadedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    // Сначала проверяем, открыт ли сайт через Telegram WebApp
    initTelegramWebApp();
    
    if (isTelegramWebApp()) {
      const webAppUser = getTelegramUser();
      if (webAppUser) {
        console.log("Using Telegram WebApp auth");
        setIsAuthorized(true);
        setAuthorizedUser(webAppUser);
        setIsLoading(false);
        setTimeout(() => {
          onAuth(webAppUser);
        }, 500);
        return;
      }
    }

    const botUsername = TELEGRAM_CONFIG.BOT_USERNAME;

    // Глобальный колбэк, который вызовет Telegram Login Widget после авторизации
    (window as any).onTelegramAuth = (user: any) => {
      console.log("Telegram auth callback called:", user);
      
      if (!user) {
        setError("Не удалось получить данные пользователя");
        setIsLoading(false);
        return;
      }

      try {
        const mapped: TelegramUser = {
          id: user.id,
          first_name: user.first_name || "Пользователь",
          last_name: user.last_name,
          username: user.username,
          language_code: user.language_code,
          is_premium: user.is_premium,
          photo_url: user.photo_url,
        };

        setIsAuthorized(true);
        setAuthorizedUser(mapped);
        setIsLoading(false);
        setError(null);

        // Небольшая задержка для показа успешной авторизации
        setTimeout(() => {
          onAuth(mapped);
        }, 1000);
      } catch (err) {
        console.error("Error processing Telegram auth:", err);
        setError("Ошибка при обработке данных авторизации");
        setIsLoading(false);
      }
    };

    // Функция для загрузки виджета
    const loadWidget = () => {
      const container = containerRef.current || document.getElementById("telegram-login-widget");
      if (!container) {
        console.error("Container not found");
        setError("Не удалось найти контейнер для виджета");
        setIsLoading(false);
        return;
      }

      // Проверяем, не загружен ли уже виджет
      if (widgetLoadedRef.current || container.children.length > 0) {
        setIsLoading(false);
        return;
      }

      // Очищаем контейнер перед добавлением скрипта
      container.innerHTML = "";

      // Проверяем, не загружен ли уже скрипт виджета
      const existingScript = document.querySelector('script[src="https://telegram.org/js/telegram-widget.js"]');
      if (existingScript) {
        setIsLoading(false);
        widgetLoadedRef.current = true;
        return;
      }

      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      
      script.onload = () => {
        console.log("Telegram widget script loaded");
        setIsLoading(false);
        widgetLoadedRef.current = true;
      };

      script.onerror = () => {
        console.error("Failed to load Telegram widget script");
        setError("Не удалось загрузить виджет авторизации. Проверьте подключение к интернету.");
        setIsLoading(false);
      };

      // Устанавливаем атрибуты виджета
      script.setAttribute("data-telegram-login", botUsername);
      script.setAttribute("data-size", "large");
      script.setAttribute("data-userpic", "true");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("data-onauth", "onTelegramAuth");
      script.setAttribute("data-radius", "10");
      
      container.appendChild(script);
    };

    // Задержка для обеспечения готовности DOM
    const timer = setTimeout(() => {
      loadWidget();
    }, 100);

    // Очистка при размонтировании
    return () => {
      clearTimeout(timer);
      const container = containerRef.current || document.getElementById("telegram-login-widget");
      if (container) {
        container.innerHTML = "";
      }
      delete (window as any).onTelegramAuth;
      widgetLoadedRef.current = false;
    };
  }, [onAuth]);

  if (isAuthorized && authorizedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center"
          >
            <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Авторизация успешна!
          </h3>
          <p className="text-muted-foreground">
            {authorizedUser.first_name}
            {authorizedUser.last_name && ` ${authorizedUser.last_name}`}
            {authorizedUser.username && ` (@${authorizedUser.username})`}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-6">
          <MessageCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Авторизация через Telegram
          </h2>
          <p className="text-muted-foreground mb-4">
            Нажмите кнопку ниже, чтобы авторизоваться через Telegram.
            Вам будет предложено войти через ваш аккаунт Telegram.
          </p>
          
          {error && (
            <Alert className="mb-4 text-left" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mb-4 min-h-[200px]">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <div className="text-muted-foreground">Загрузка виджета авторизации...</div>
          </div>
        ) : (
          <div 
            id="telegram-login-widget" 
            ref={containerRef}
            className="flex justify-center mb-4 min-h-[60px]"
          />
        )}
        
        {!isLoading && !error && (
          <Alert className="mb-4 text-left">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Если кнопка не появилась:</strong>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Откройте @BotFather в Telegram</li>
                <li>Отправьте команду /mybots</li>
                <li>Выберите вашего бота ({TELEGRAM_CONFIG.BOT_USERNAME})</li>
                <li>Выберите "Bot Settings" → "Domain"</li>
                <li>Добавьте домен вашего сайта (например: anketaopros.netlify.app)</li>
              </ol>
            </AlertDescription>
          </Alert>
        )}
        
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="mt-6 w-full"
          >
            Выбрать другой способ
          </Button>
        )}
      </motion.div>
    </div>
  );
};

