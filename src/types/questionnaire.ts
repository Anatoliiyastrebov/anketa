export type UserType = "woman" | "man" | "child" | null;

export interface Question {
  id: string;
  text: string;
  type: "text" | "textarea" | "radio" | "checkbox" | "number";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface QuestionGroup {
  id: string;
  title?: string;
  questions: Question[];
}

export type AuthPlatform = "telegram" | "instagram";

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface InstagramUser {
  username: string;
  full_name?: string;
  profile_picture?: string;
}

export type AuthUser = 
  | { platform: "telegram"; user: TelegramUser }
  | { platform: "instagram"; user: InstagramUser };

export interface ContactInfo {
  instagram?: string;
  telegram?: string;
  phone?: string;
  email?: string;
}

export interface FormData {
  userType: UserType;
  answers: Record<string, string | string[] | number>;
  authUser?: AuthUser;
  telegramUser?: TelegramUser; // Для обратной совместимости
  contactInfo?: ContactInfo;
}
