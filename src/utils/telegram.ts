import { TELEGRAM_CONFIG, isTelegramConfigured } from "@/config/telegram";
import { FormData } from "@/types/questionnaire";
import { getQuestionsForUserType } from "@/data/questions";

const formatUserType = (type: string) => {
  switch (type) {
    case "woman":
      return "👩 Женщина";
    case "man":
      return "👨 Мужчина";
    case "child":
      return "👶 Ребёнок";
    default:
      return type;
  }
};

export const formatMessageForTelegram = (data: FormData): string => {
  if (!data.userType) return "";

  const questions = getQuestionsForUserType(data.userType);
  let message = `📋 *НОВАЯ АНКЕТА*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  // Добавляем данные пользователя Telegram вверху
  if (data.telegramUser) {
    message += `👤 *ДАННЫЕ ПОЛЬЗОВАТЕЛЯ*\n`;
    message += `Имя: ${data.telegramUser.first_name}`;
    if (data.telegramUser.last_name) {
      message += ` ${data.telegramUser.last_name}`;
    }
    message += `\n`;
    if (data.telegramUser.username) {
      message += `Username: @${data.telegramUser.username}\n`;
    }
    message += `ID: \`${data.telegramUser.id}\`\n`;
    message += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
  }
  
  message += `Тип анкеты: ${formatUserType(data.userType)}\n\n`;

  questions.forEach((group) => {
    message += `*${group.title}*\n`;
    group.questions.forEach((q) => {
      const answer = data.answers[q.id];
      if (answer !== undefined && answer !== "") {
        const formattedAnswer = Array.isArray(answer) ? answer.join(", ") : String(answer);
        message += `• ${q.text}: ${formattedAnswer}\n`;
      }
    });
    message += `\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🕐 ${new Date().toLocaleString("ru-RU")}`;

  return message;
};

export const sendToTelegram = async (data: FormData): Promise<{ success: boolean; error?: string }> => {
  if (!isTelegramConfigured()) {
    console.warn("Telegram is not configured. Please create .env file with VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID");
    return { 
      success: false, 
      error: "Telegram не настроен. Создайте файл .env в корне проекта и добавьте VITE_TELEGRAM_BOT_TOKEN и VITE_TELEGRAM_CHAT_ID" 
    };
  }

  const message = formatMessageForTelegram(data);
  const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;

  // Создаем кнопку для ответа пользователю, если есть данные пользователя
  const replyMarkup = data.telegramUser ? {
    inline_keyboard: [[
      {
        text: `💬 Ответить пользователю (ID: ${data.telegramUser.id})`,
        url: data.telegramUser.username 
          ? `https://t.me/${data.telegramUser.username}`
          : `tg://user?id=${data.telegramUser.id}`
      }
    ]]
  } : undefined;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: message,
        parse_mode: "Markdown",
        reply_markup: replyMarkup,
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      return { success: false, error: result.description || "Ошибка отправки" };
    }

    return { success: true };
  } catch (error) {
    console.error("Network error:", error);
    return { success: false, error: "Ошибка сети. Проверьте подключение." };
  }
};
