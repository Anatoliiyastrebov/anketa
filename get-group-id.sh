#!/bin/bash
# Скрипт для получения Chat ID группы Telegram

BOT_TOKEN="8348191426:AAFSipqYQpzfxvx-ICEVttfoJDo3XGzHE8Q"

echo "Получение обновлений от бота..."
echo "Убедитесь, что бот добавлен в группу и в группу отправлено хотя бы одно сообщение"
echo ""

RESPONSE=$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getUpdates")

# Ищем Chat ID группы (отрицательные числа)
GROUP_ID=$(echo "$RESPONSE" | grep -o '"chat":{"id":-[0-9]*' | grep -o -- '-[0-9]*' | head -1)

if [ -z "$GROUP_ID" ]; then
    echo "❌ Chat ID группы не найден."
    echo ""
    echo "Инструкция:"
    echo "1. Добавьте бота @ZdorovAnketaBot в группу https://t.me/+S3Ru-enHHixkY2Yy"
    echo "2. Отправьте любое сообщение в группу"
    echo "3. Запустите этот скрипт снова"
    echo ""
    echo "Полный ответ API:"
    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
else
    echo "✅ Chat ID группы найден: $GROUP_ID"
    echo ""
    echo "Обновите конфигурацию в src/config/telegram.ts:"
    echo "CHAT_ID: \"$GROUP_ID\""
fi

