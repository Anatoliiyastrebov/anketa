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
  
  // Добавляем данные пользователя и контакты вверху
  message += `👤 *ДАННЫЕ АВТОРИЗАЦИИ И КОНТАКТЫ*\n`;
  
  // Информация об авторизации
  if (data.authUser) {
    if (data.authUser.platform === "telegram") {
      message += `🔐 Авторизация: Telegram\n`;
      message += `Имя: ${data.authUser.user.first_name}`;
      if (data.authUser.user.last_name) {
        message += ` ${data.authUser.user.last_name}`;
      }
      message += `\n`;
      if (data.authUser.user.username) {
        message += `Telegram: @${data.authUser.user.username}\n`;
      }
      message += `Telegram ID: \`${data.authUser.user.id}\`\n`;
    } else if (data.authUser.platform === "instagram") {
      message += `🔐 Авторизация: Instagram\n`;
      message += `Instagram: @${data.authUser.user.username}\n`;
      if (data.authUser.user.full_name) {
        message += `Полное имя: ${data.authUser.user.full_name}\n`;
      }
    }
    message += `\n`;
  } else if (data.telegramUser) {
    // Обратная совместимость
    message += `🔐 Авторизация: Telegram\n`;
    message += `Имя: ${data.telegramUser.first_name}`;
    if (data.telegramUser.last_name) {
      message += ` ${data.telegramUser.last_name}`;
    }
    message += `\n`;
    if (data.telegramUser.username) {
      message += `Telegram: @${data.telegramUser.username}\n`;
    }
    message += `Telegram ID: \`${data.telegramUser.id}\`\n\n`;
  }
  
  // Добавляем дополнительные контакты
  const contacts: string[] = [];
  
  // Instagram из контактной информации (если отличается от авторизации)
  if (data.contactInfo?.instagram) {
    const isAuthInstagram = data.authUser?.platform === "instagram" && 
                           data.authUser.user.username === data.contactInfo.instagram;
    if (!isAuthInstagram) {
      contacts.push(`📷 Instagram (доп.): @${data.contactInfo.instagram}`);
    }
  }
  
  // Telegram из контактной информации
  if (data.contactInfo?.telegram) {
    const isAuthTelegram = (data.authUser?.platform === "telegram" && 
                           data.authUser.user.username === data.contactInfo.telegram) ||
                          (data.telegramUser?.username === data.contactInfo.telegram);
    if (!isAuthTelegram) {
      contacts.push(`💬 Telegram (доп.): @${data.contactInfo.telegram}`);
    }
  }
  
  if (data.contactInfo?.phone) {
    contacts.push(`📞 Телефон: ${data.contactInfo.phone}`);
  }
  if (data.contactInfo?.email) {
    contacts.push(`📧 Email: ${data.contactInfo.email}`);
  }
  
  if (contacts.length > 0) {
    message += `*Дополнительные контакты:*\n`;
    message += contacts.join('\n') + '\n';
  }
  
  message += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
  
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

  // Создаем кнопки для связи с пользователем
  const buttons: Array<Array<{ text: string; url: string }>> = [];
  
  // Кнопка авторизации (Telegram или Instagram)
  if (data.authUser) {
    if (data.authUser.platform === "telegram") {
      const telegramUrl = data.authUser.user.username 
        ? `https://t.me/${data.authUser.user.username}`
        : `tg://user?id=${data.authUser.user.id}`;
      buttons.push([{
        text: `💬 Telegram (@${data.authUser.user.username || `ID: ${data.authUser.user.id}`})`,
        url: telegramUrl
      }]);
    } else if (data.authUser.platform === "instagram") {
      buttons.push([{
        text: `📷 Instagram (@${data.authUser.user.username})`,
        url: `https://instagram.com/${data.authUser.user.username}`
      }]);
    }
  } else if (data.telegramUser) {
    // Обратная совместимость
    const telegramUrl = data.telegramUser.username 
      ? `https://t.me/${data.telegramUser.username}`
      : `tg://user?id=${data.telegramUser.id}`;
    buttons.push([{
      text: `💬 Telegram (@${data.telegramUser.username || `ID: ${data.telegramUser.id}`})`,
      url: telegramUrl
    }]);
  }
  
  // Кнопка Instagram из контактной информации (если отличается от авторизации)
  if (data.contactInfo?.instagram) {
    const isAuthInstagram = data.authUser?.platform === "instagram" && 
                           data.authUser.user.username === data.contactInfo.instagram;
    if (!isAuthInstagram) {
      buttons.push([{
        text: `📷 Instagram доп. (@${data.contactInfo.instagram})`,
        url: `https://instagram.com/${data.contactInfo.instagram}`
      }]);
    }
  }
  
  // Кнопка дополнительного Telegram
  if (data.contactInfo?.telegram && data.contactInfo.telegram !== data.telegramUser?.username) {
    buttons.push([{
      text: `💬 Telegram доп. (@${data.contactInfo.telegram})`,
      url: `https://t.me/${data.contactInfo.telegram}`
    }]);
  }
  
  // Кнопка телефона
  if (data.contactInfo?.phone) {
    buttons.push([{
      text: `📞 Позвонить (${data.contactInfo.phone})`,
      url: `tel:${data.contactInfo.phone.replace(/\s/g, '')}`
    }]);
  }
  
  // Кнопка email
  if (data.contactInfo?.email) {
    buttons.push([{
      text: `📧 Email (${data.contactInfo.email})`,
      url: `mailto:${data.contactInfo.email}`
    }]);
  }
  
  const replyMarkup = buttons.length > 0 ? {
    inline_keyboard: buttons
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
