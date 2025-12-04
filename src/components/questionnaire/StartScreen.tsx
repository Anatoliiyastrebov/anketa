import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserType, TelegramUser } from "@/types/questionnaire";
import { User, Users, Baby } from "lucide-react";

interface StartScreenProps {
  onSelect: (type: UserType) => void;
  telegramUser: TelegramUser;
}

export const StartScreen = ({ onSelect, telegramUser }: StartScreenProps) => {
  const options = [
    { type: "woman" as UserType, label: "Женщина", icon: User },
    { type: "man" as UserType, label: "Мужчина", icon: Users },
    { type: "child" as UserType, label: "Ребёнок / Малыш", icon: Baby },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-button">
            <svg
              className="w-10 h-10 text-primary-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Анкета здоровья
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Пожалуйста, ответьте на несколько вопросов
          </p>
          {telegramUser && (
            <div className="bg-muted/50 rounded-lg p-3 mb-4 text-sm">
              <p className="text-muted-foreground">
                Вы авторизованы как: <span className="font-semibold text-foreground">
                  {telegramUser.first_name}
                  {telegramUser.last_name && ` ${telegramUser.last_name}`}
                  {telegramUser.username && ` (@${telegramUser.username})`}
                </span>
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Кто вы?
          </h2>
          <div className="space-y-3">
            {options.map((option, index) => (
              <motion.div
                key={option.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              >
                <Button
                  variant="selection"
                  size="xl"
                  className="w-full justify-start gap-4"
                  onClick={() => onSelect(option.type)}
                >
                  <option.icon className="w-6 h-6 text-primary" />
                  <span>{option.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          Ваши данные конфиденциальны и защищены
        </motion.p>
      </motion.div>
    </div>
  );
};
