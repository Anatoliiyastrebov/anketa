import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TelegramUser } from "@/types/questionnaire";
import { isTelegramWebApp, getTelegramUser, initTelegramWebApp } from "@/utils/telegram-webapp";
import { Loader2, MessageCircle } from "lucide-react";

interface TelegramAuthProps {
  onAuth: (user: TelegramUser) => void;
}

export const TelegramAuth = ({ onAuth }: TelegramAuthProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Инициализируем Telegram Web App
    initTelegramWebApp();

    // Проверяем авторизацию
    const checkAuth = () => {
      if (isTelegramWebApp()) {
        const user = getTelegramUser();
        if (user) {
          onAuth(user);
        } else {
          setIsChecking(false);
          setError("Не удалось получить данные пользователя. Пожалуйста, откройте анкету через Telegram.");
        }
      } else {
        // Если не в Telegram, разрешаем продолжить без авторизации (для разработки)
        setIsChecking(false);
        setError("Откройте анкету через Telegram для авторизации");
      }
    };

    // Небольшая задержка для инициализации Telegram Web App
    setTimeout(checkAuth, 100);
  }, [onAuth]);

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

  if (error) {
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
            <p className="text-muted-foreground mb-6">{error}</p>
          </div>
          <Button
            onClick={() => {
              const user = getTelegramUser();
              if (user) {
                onAuth(user);
              } else {
                // Для разработки - разрешаем продолжить без авторизации
                onAuth({
                  id: Date.now(), // Временный ID для разработки
                  first_name: "Гость",
                });
              }
            }}
            variant="default"
            size="lg"
          >
            Продолжить без авторизации (для разработки)
          </Button>
        </motion.div>
      </div>
    );
  }

  return null;
};

