// ============================================
// TELEGRAM CONFIGURATION
// ============================================
// 
// Настройка через переменные окружения:
// 
// 1. Создайте файл .env в корне проекта
// 2. Добавьте следующие переменные:
//    VITE_TELEGRAM_BOT_TOKEN=ваш_токен_бота
//    VITE_TELEGRAM_CHAT_ID=ваш_chat_id_группы
// 
// Как получить Chat ID группы:
// 1. Добавьте бота @ZdorovAnketaBot в группу https://t.me/+S3Ru-enHHixkY2Yy
// 2. Добавьте в группу бота @RawDataBot или @getidsbot
// 3. Отправьте любое сообщение в группу
// 4. Бот @RawDataBot покажет Chat ID группы (отрицательное число, например: -1001234567890)
// 5. Или используйте скрипт: ./get-group-id.sh
//
// ============================================

export const TELEGRAM_CONFIG = {
  BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "8348191426:AAFSipqYQpzfxvx-ICEVttfoJDo3XGzHE8Q",
  // Chat ID группы "Анкета" (https://t.me/+S3Ru-enHHixkY2Yy)
  CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || "-5004769540",
  // Имя бота для Telegram Login Widget (без @)
  BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME || "ZdorovAnketaBot",
};

export const isTelegramConfigured = () => {
  return (
    Boolean(TELEGRAM_CONFIG.BOT_TOKEN) &&
    Boolean(TELEGRAM_CONFIG.CHAT_ID) &&
    TELEGRAM_CONFIG.BOT_TOKEN.trim() !== "" &&
    TELEGRAM_CONFIG.CHAT_ID.trim() !== ""
  );
};
