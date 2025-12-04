import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TelegramUser } from "@/types/questionnaire";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TELEGRAM_CONFIG } from "@/config/telegram";

interface TelegramAuthProps {
  onAuth: (user: TelegramUser) => void;
  onBack?: () => void;
}

export const TelegramAuth = ({ onAuth, onBack }: TelegramAuthProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const botUsername = TELEGRAM_CONFIG.BOT_USERNAME;

    // Глобальный колбэк, который вызовет Telegram Login Widget после авторизации
    (window as any).onTelegramAuth = (user: any) => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      const mapped: TelegramUser = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        is_premium: user.is_premium,
        photo_url: user.photo_url,
      };

      setIsAuthorized(true);
      setAuthorizedUser(mapped);
      setIsLoading(false);

      // Небольшая задержка для показа успешной авторизации
      setTimeout(() => {
        onAuth(mapped);
      }, 1000);
    };

    // Инициализация виджета
    const container = document.getElementById("telegram-login-widget");
    if (!container) return;

    // Очищаем контейнер перед добавлением скрипта
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth");
    script.setAttribute("data-radius", "10");
    
    container.appendChild(script);
    setIsLoading(false);

    // Очистка при размонтировании
    return () => {
      if (container) {
        container.innerHTML = "";
      }
      delete (window as any).onTelegramAuth;
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
        </div>
        
        {isLoading ? (
          <div className="flex justify-center mb-4">
            <div className="animate-pulse text-muted-foreground">Загрузка виджета...</div>
          </div>
        ) : (
          <div id="telegram-login-widget" className="flex justify-center mb-4" />
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

