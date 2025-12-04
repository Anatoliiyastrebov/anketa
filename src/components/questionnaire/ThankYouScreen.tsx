import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, RotateCcw, Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ThankYouScreenProps {
  onReset: () => void;
}

export const ThankYouScreen = ({ onReset }: ThankYouScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-button"
        >
          <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-4"
        >
          Спасибо!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-muted-foreground mb-8"
        >
          Анкета успешно отправлена. Мы свяжемся с вами в ближайшее время.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-left">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">Ваши права:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
              <li>Вы можете запросить доступ к вашим данным</li>
              <li>Вы можете потребовать исправления или удаления данных</li>
              <li>Вы можете отозвать согласие в любое время</li>
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">
              По вопросам обработки данных обращайтесь через{" "}
              <a 
                href="https://t.me/+S3Ru-enHHixkY2Yy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
              >
                Telegram группу
              </a>
              {" "}или ознакомьтесь с{" "}
              <Link to="/privacy" className="text-primary hover:underline inline-flex items-center gap-1">
                Политикой конфиденциальности
                <ExternalLink className="w-3 h-3" />
              </Link>
            </p>
          </div>

          <Button variant="outline" size="lg" onClick={onReset} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Заполнить ещё раз
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
