import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface GDPRConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const GDPRConsent = ({ onAccept, onDecline }: GDPRConsentProps) => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [readPolicy, setReadPolicy] = useState(false);

  const handleAccept = () => {
    if (consentGiven && readPolicy) {
      // Сохраняем согласие в localStorage с временной меткой
      const consentData = {
        accepted: true,
        timestamp: new Date().toISOString(),
        version: "1.0",
      };
      localStorage.setItem("gdpr_consent", JSON.stringify(consentData));
      onAccept();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Согласие на обработку персональных данных
            </h1>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              В соответствии с Общим регламентом по защите данных (GDPR) и законодательством Германии, 
              мы обязаны получить ваше явное согласие на обработку персональных данных.
            </AlertDescription>
          </Alert>

          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Какие данные мы собираем:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Данные авторизации (имя, фамилия, username, ID из Telegram/Instagram)</li>
                <li>Контактная информация (телефон, email, социальные сети)</li>
                <li>Медицинские данные из анкеты здоровья</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Цель обработки данных:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Обработка и анализ анкет здоровья</li>
                <li>Связь с вами по вопросам анкеты</li>
                <li>Предоставление медицинских консультаций (при необходимости)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Правовая основа:</h3>
              <p className="ml-2">
                Обработка данных осуществляется на основе вашего явного согласия (ст. 6 п. 1 лит. a GDPR).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Срок хранения:</h3>
              <p className="ml-2">
                Данные хранятся до отзыва вашего согласия или в течение срока, необходимого для выполнения целей обработки, 
                но не более 3 лет с момента последнего обращения.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">5. Ваши права:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Право на доступ к вашим персональным данным (ст. 15 GDPR)</li>
                <li>Право на исправление неточных данных (ст. 16 GDPR)</li>
                <li>Право на удаление данных (ст. 17 GDPR)</li>
                <li>Право на ограничение обработки (ст. 18 GDPR)</li>
                <li>Право на переносимость данных (ст. 20 GDPR)</li>
                <li>Право на отзыв согласия в любое время (ст. 7 п. 3 GDPR)</li>
                <li>Право на подачу жалобы в надзорный орган (ст. 77 GDPR)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">6. Передача данных третьим лицам:</h3>
              <p className="ml-2">
                Данные передаются только в Telegram для отправки уведомлений администратору. 
                Мы не передаем данные другим третьим лицам без вашего согласия, за исключением случаев, 
                предусмотренных законом.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">7. Контактная информация:</h3>
              <p className="ml-2">
                По вопросам обработки персональных данных обращайтесь через Telegram: 
                <a href="https://t.me/+S3Ru-enHHixkY2Yy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                  группа "Анкета"
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="read-policy"
                checked={readPolicy}
                onCheckedChange={(checked) => setReadPolicy(checked === true)}
              />
              <Label htmlFor="read-policy" className="text-sm cursor-pointer">
                Я прочитал(а) и понял(а){" "}
                <Link to="/privacy" target="_blank" className="text-primary hover:underline inline-flex items-center gap-1">
                  Политику конфиденциальности
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                checked={consentGiven}
                onCheckedChange={(checked) => setConsentGiven(checked === true)}
              />
              <Label htmlFor="consent" className="text-sm cursor-pointer font-semibold">
                Я даю свое явное согласие на обработку моих персональных данных в соответствии с 
                вышеизложенной информацией и понимаю, что могу отозвать согласие в любое время.
              </Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onDecline}
              className="flex-1"
            >
              Отклонить
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!consentGiven || !readPolicy}
              className="flex-1"
            >
              Принять и продолжить
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Без вашего согласия мы не сможем обработать вашу анкету
          </p>
        </div>
      </motion.div>
    </div>
  );
};

