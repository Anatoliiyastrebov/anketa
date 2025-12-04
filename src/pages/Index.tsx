import { Questionnaire } from "@/components/questionnaire/Questionnaire";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Анкета здоровья — Онлайн опросник</title>
        <meta name="description" content="Заполните анкету здоровья онлайн. Быстро, удобно и конфиденциально." />
      </Helmet>
      <main className="min-h-screen">
        <Questionnaire />
      </main>
    </>
  );
};

export default Index;
