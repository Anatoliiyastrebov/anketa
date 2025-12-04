import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstagramUser } from "@/types/questionnaire";
import { Instagram, ArrowRight, ArrowLeft } from "lucide-react";

interface InstagramAuthProps {
  onAuth: (user: InstagramUser) => void;
  onBack: () => void;
}

export const InstagramAuth = ({ onAuth, onBack }: InstagramAuthProps) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateUsername = (username: string): boolean => {
    // Instagram username validation: 1-30 characters, letters, numbers, periods, underscores
    const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
    return instagramRegex.test(username.replace(/^@/, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUsername = username.trim().replace(/^@/, "");
    
    if (!cleanUsername) {
      setError("Введите username Instagram");
      return;
    }

    if (!validateUsername(cleanUsername)) {
      setError("Некорректный формат username. Используйте только буквы, цифры, точки и подчеркивания.");
      return;
    }

    setIsLoading(true);

    // Имитация проверки (в реальном приложении можно проверить через API)
    setTimeout(() => {
      const user: InstagramUser = {
        username: cleanUsername,
        full_name: fullName.trim() || undefined,
      };
      setIsLoading(false);
      onAuth(user);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
            <Instagram className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Авторизация через Instagram
          </h2>
          <p className="text-muted-foreground">
            Введите ваш Instagram username
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagram-username" className="flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram Username *
            </Label>
            <Input
              id="instagram-username"
              type="text"
              placeholder="@username или username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(null);
              }}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Без символа @ в начале
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full-name">
              Полное имя (необязательно)
            </Label>
            <Input
              id="full-name"
              type="text"
              placeholder="Ваше полное имя"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isLoading}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="flex-1"
            >
              {isLoading ? "Проверка..." : "Авторизоваться"}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

