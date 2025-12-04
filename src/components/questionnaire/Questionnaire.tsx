import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StartScreen } from "./StartScreen";
import { QuestionStep } from "./QuestionStep";
import { ProgressBar } from "./ProgressBar";
import { ThankYouScreen } from "./ThankYouScreen";
import { TelegramAuth } from "./TelegramAuth";
import { UserType, FormData, TelegramUser } from "@/types/questionnaire";
import { getQuestionsForUserType } from "@/data/questions";
import { sendToTelegram } from "@/utils/telegram";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Questionnaire = () => {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const questions = userType ? getQuestionsForUserType(userType) : [];
  const totalSteps = questions.length;

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentStep(0);
    setAnswers({});
  };

  const handleAnswer = (questionId: string, value: string | string[] | number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleBackToStart = () => {
    setUserType(null);
    setCurrentStep(0);
    setAnswers({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const formData: FormData = {
      userType,
      answers,
      telegramUser: telegramUser || undefined,
    };

    // Log the data to console for debugging
    console.log("Form Data (JSON):", JSON.stringify(formData, null, 2));

    const result = await sendToTelegram(formData);
    
    setIsSubmitting(false);

    if (result.success) {
      setIsComplete(true);
      toast.success("Анкета успешно отправлена!");
    } else {
      toast.error(result.error || "Ошибка при отправке анкеты");
      // Still show success for demo purposes if Telegram isn't configured
      if (result.error?.includes("не настроен")) {
        console.log("Demo mode: Form would be submitted to Telegram");
        setIsComplete(true);
      }
    }
  };

  const handleReset = () => {
    setUserType(null);
    setCurrentStep(0);
    setAnswers({});
    setIsComplete(false);
  };

  const handleTelegramAuth = (user: TelegramUser) => {
    setTelegramUser(user);
  };

  if (!telegramUser) {
    return <TelegramAuth onAuth={handleTelegramAuth} />;
  }

  if (isComplete) {
    return <ThankYouScreen onReset={handleReset} />;
  }

  if (!userType) {
    return <StartScreen onSelect={handleUserTypeSelect} telegramUser={telegramUser} />;
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="max-w-lg mx-auto w-full">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToStart}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            К выбору анкеты
          </Button>
        </div>

        <ProgressBar current={currentStep} total={totalSteps} />
      </div>

      <div className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground">Отправка анкеты...</p>
            </motion.div>
          ) : (
            <QuestionStep
              key={currentStep}
              group={questions[currentStep]}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onBack={handleBack}
              isFirst={currentStep === 0}
              isLast={currentStep === totalSteps - 1}
              stepIndex={currentStep}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
