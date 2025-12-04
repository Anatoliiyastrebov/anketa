import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TelegramUser } from "@/types/questionnaire";
import { isTelegramWebApp, getTelegramUser, initTelegramWebApp } from "@/utils/telegram-webapp";
import { Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TelegramAuthProps {
  onAuth: (user: TelegramUser) => void;
  onBack?: () => void;
}

export const TelegramAuth = ({ onAuth, onBack }: TelegramAuthProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useWidget, setUseWidget] = useState(false);

  useEffect(() => {
    // Попытка авторизации через Telegram WebApp (если анкета открыта внутри Telegram)
    initTelegramWebApp();

    const tryWebAppAuth = () => {
      if (isTelegramWebApp()) {
        const user = getTelegramUser();
        if (user) {
          onAuth(user);
        } else {
          setIsChecking(false);
          setError("Не удалось получить данные пользователя из Telegram WebApp.");
        }
      } else {
        // Если не внутри Telegram WebApp — переключаемся на виджет авторизации
        setIsChecking(false);
        setUseWidget(true);
      }
    };

    setTimeout(tryWebAppAuth, 100);
  }, [onAuth]);

  useEffect(() => {
    // Инициализация Telegram Login Widget, если мы не в WebApp
    if (!useWidget) return;
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const botUsername = "ZdorovAnketaBot"; // имя вашего бота для Telegram Login Widget

    // Глобальный колбэк, который вызовет Telegram Login Widget после авторизации
    (window as any).onTelegramAuth = (user: any) => {
      if (!user) return;
      const mapped: TelegramUser = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        is_premium: user.is_premium,
        photo_url: user.photo_url,
      };
      onAuth(mapped);
    };

    const container = document.getElementById("telegram-login-widget");
    if (!container || container.children.length > 0) return;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth");
    container.appendChild(script);
  }, [useWidget, onAuth]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Проверка авторизации...</p>
        </motion.div>
      </div>
    );
  }

  if (useWidget) {
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
            </p>
          </div>
          <div id="telegram-login-widget" className="flex justify-center" />
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
  }

  if (error && !useWidget) {
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
              Требуется авторизация
            </h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <div className="bg-muted/50 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground font-medium mb-2">
                📱 Как авторизоваться:
              </p>
              <ol className="text-sm text-muted-foreground text-left space-y-1 list-decimal list-inside">
                <li>Откройте анкету через Telegram бота</li>
                <li>Или перейдите по ссылке из Telegram</li>
                <li>Авторизация происходит автоматически</li>
              </ol>
            </div>
            {onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className="mt-4 w-full"
              >
                Выбрать другой способ
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

