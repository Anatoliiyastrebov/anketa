import { Questionnaire } from "@/components/questionnaire/Questionnaire";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Анкета здоровья — Онлайн опросник</title>
        <meta name="description" content="Заполните анкету здоровья онлайн. Быстро, удобно и конфиденциально." />
      </Helmet>
      <main className="min-h-screen flex flex-col">
        <Questionnaire />
        <footer className="mt-auto py-4 px-6 border-t bg-muted/30">
          <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
            <Link 
              to="/privacy" 
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <Shield className="w-3 h-3" />
              Политика конфиденциальности
            </Link>
            <p className="mt-2 text-xs">
              В соответствии с GDPR и законодательством Германии
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
