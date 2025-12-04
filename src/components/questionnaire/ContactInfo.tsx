import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactInfo } from "@/types/questionnaire";
import { Instagram, MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";

interface ContactInfoProps {
  telegramUser?: { username?: string; id: number };
  instagramUser?: { username: string };
  onSubmit: (contactInfo: ContactInfo) => void;
  onSkip?: () => void;
}

export const ContactInfoForm = ({ telegramUser, instagramUser, onSubmit, onSkip }: ContactInfoProps) => {
  const [instagram, setInstagram] = useState(instagramUser?.username || "");
  const [telegram, setTelegram] = useState(telegramUser?.username || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactInfo: ContactInfo = {};
    if (instagram.trim()) contactInfo.instagram = instagram.trim().replace(/^@/, "");
    if (telegram.trim()) contactInfo.telegram = telegram.trim().replace(/^@/, "");
    if (phone.trim()) contactInfo.phone = phone.trim();
    if (email.trim()) contactInfo.email = email.trim();
    onSubmit(contactInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Контактная информация
          </h2>
          <p className="text-muted-foreground">
            Укажите способы связи, чтобы мы могли с вами связаться
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!instagramUser && (
            <div className="space-y-2">
              <Label htmlFor="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </Label>
              <Input
                id="instagram"
                type="text"
                placeholder="@username или username"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
          )}
          {instagramUser && (
            <div className="bg-muted/50 rounded-lg p-3 text-sm">
              <p className="text-muted-foreground">
                Instagram: <span className="font-semibold text-foreground">@{instagramUser.username}</span> (из авторизации)
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="telegram" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Telegram
            </Label>
            <Input
              id="telegram"
              type="text"
              placeholder="@username или username"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
            {telegramUser?.username && (
              <p className="text-xs text-muted-foreground">
                Автоматически заполнено из авторизации
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Телефон
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            {onSkip && (
              <Button
                type="button"
                variant="outline"
                onClick={onSkip}
                className="flex-1"
              >
                Пропустить
              </Button>
            )}
            <Button type="submit" className="flex-1">
              Продолжить
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Укажите хотя бы один способ связи
          </p>
        </form>
      </motion.div>
    </div>
  );
};

