import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuestionGroup } from "@/types/questionnaire";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface QuestionStepProps {
  group: QuestionGroup;
  answers: Record<string, string | string[] | number>;
  onAnswer: (questionId: string, value: string | string[] | number) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
  stepIndex: number;
}

export const QuestionStep = ({
  group,
  answers,
  onAnswer,
  onNext,
  onBack,
  isFirst,
  isLast,
  stepIndex,
}: QuestionStepProps) => {
  const [localAnswers, setLocalAnswers] = useState<Record<string, string | string[] | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const initial: Record<string, string | string[] | number> = {};
    group.questions.forEach((q) => {
      initial[q.id] = answers[q.id] ?? (q.type === "checkbox" ? [] : "");
    });
    setLocalAnswers(initial);
  }, [group, answers]);

  const handleInputChange = (questionId: string, value: string | number) => {
    setLocalAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => ({ ...prev, [questionId]: "" }));
    onAnswer(questionId, value);
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const current = (localAnswers[questionId] as string[]) || [];
    let updated: string[];
    
    if (checked) {
      updated = [...current, option];
    } else {
      updated = current.filter((item) => item !== option);
    }
    
    setLocalAnswers((prev) => ({ ...prev, [questionId]: updated }));
    setErrors((prev) => ({ ...prev, [questionId]: "" }));
    onAnswer(questionId, updated);
  };

  const handleRadioChange = (questionId: string, value: string) => {
    setLocalAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => ({ ...prev, [questionId]: "" }));
    onAnswer(questionId, value);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    group.questions.forEach((q) => {
      if (q.required !== false) {
        const answer = localAnswers[q.id];
        if (q.type === "checkbox") {
          if (!answer || (Array.isArray(answer) && answer.length === 0)) {
            newErrors[q.id] = "Выберите хотя бы один вариант";
            isValid = false;
          }
        } else if (!answer || (typeof answer === "string" && answer.trim() === "")) {
          newErrors[q.id] = "Это поле обязательно";
          isValid = false;
        }
      }

      if (q.validation && localAnswers[q.id]) {
        const value = Number(localAnswers[q.id]);
        if (q.validation.min !== undefined && value < q.validation.min) {
          newErrors[q.id] = `Минимальное значение: ${q.validation.min}`;
          isValid = false;
        }
        if (q.validation.max !== undefined && value > q.validation.max) {
          newErrors[q.id] = `Максимальное значение: ${q.validation.max}`;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <motion.div
      key={stepIndex}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg mx-auto"
    >
      {group.title && (
        <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
          {group.title}
        </h2>
      )}

      <div className="space-y-6">
        {group.questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <label className="block text-lg font-medium text-foreground">
              {question.text}
              {question.required !== false && (
                <span className="text-accent ml-1">*</span>
              )}
            </label>

            {question.type === "text" && (
              <Input
                type="text"
                placeholder={question.placeholder}
                value={(localAnswers[question.id] as string) || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                className="h-12 text-base"
              />
            )}

            {question.type === "number" && (
              <Input
                type="number"
                placeholder={question.placeholder}
                value={(localAnswers[question.id] as number) || ""}
                onChange={(e) => handleInputChange(question.id, Number(e.target.value))}
                className="h-12 text-base"
                min={question.validation?.min}
                max={question.validation?.max}
              />
            )}

            {question.type === "textarea" && (
              <Textarea
                placeholder={question.placeholder}
                value={(localAnswers[question.id] as string) || ""}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                className="min-h-24 text-base resize-none"
              />
            )}

            {question.type === "radio" && question.options && (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleRadioChange(question.id, option)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      localAnswers[question.id] === option
                        ? "border-primary bg-secondary/50 shadow-soft"
                        : "border-border bg-card hover:border-primary/30 hover:bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          localAnswers[question.id] === option
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {localAnswers[question.id] === option && (
                          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      <span className="text-foreground">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {question.type === "checkbox" && question.options && (
              <div className="space-y-2">
                {question.options.map((option) => {
                  const isChecked = ((localAnswers[question.id] as string[]) || []).includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleCheckboxChange(question.id, option, !isChecked)}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                        isChecked
                          ? "border-primary bg-secondary/50 shadow-soft"
                          : "border-border bg-card hover:border-primary/30 hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                            isChecked
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="text-foreground">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <AnimatePresence>
              {errors[question.id] && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-destructive text-sm"
                >
                  {errors[question.id]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8 gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isFirst}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
        <Button
          variant={isLast ? "accent" : "default"}
          size="lg"
          onClick={handleNext}
          className="flex-1"
        >
          {isLast ? (
            <>
              Отправить
              <Check className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Далее
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};
