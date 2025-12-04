import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram } from "lucide-react";
import { AuthPlatform } from "@/types/questionnaire";

interface AuthPlatformSelectProps {
  onSelect: (platform: AuthPlatform) => void;
}

export const AuthPlatformSelect = ({ onSelect }: AuthPlatformSelectProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Авторизация
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Выберите способ авторизации
          </p>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="selection"
              size="xl"
              className="w-full justify-start gap-4"
              onClick={() => onSelect("telegram")}
            >
              <MessageCircle className="w-6 h-6 text-primary" />
              <div className="flex-1 text-left">
                <div className="font-semibold">Telegram</div>
                <div className="text-sm text-muted-foreground">
                  Авторизация через Telegram Web App
                </div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="selection"
              size="xl"
              className="w-full justify-start gap-4"
              onClick={() => onSelect("instagram")}
            >
              <Instagram className="w-6 h-6 text-primary" />
              <div className="flex-1 text-left">
                <div className="font-semibold">Instagram</div>
                <div className="text-sm text-muted-foreground">
                  Авторизация через Instagram
                </div>
              </div>
            </Button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-muted-foreground mt-8"
        >
          Ваши данные конфиденциальны и защищены
        </motion.p>
      </motion.div>
    </div>
  );
};

