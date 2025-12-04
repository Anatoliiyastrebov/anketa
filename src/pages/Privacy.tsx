import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Политика конфиденциальности — Анкета здоровья</title>
        <meta name="description" content="Политика конфиденциальности и обработки персональных данных" />
      </Helmet>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к анкете
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-lg shadow-lg p-6 md:p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Политика конфиденциальности
              </h1>
            </div>

            <div className="text-sm text-muted-foreground space-y-6">
              <div>
                <p className="mb-2">
                  <strong className="text-foreground">Дата последнего обновления:</strong> {new Date().toLocaleDateString("ru-RU")}
                </p>
                <p>
                  Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем 
                  ваши персональные данные в соответствии с Общим регламентом по защите данных (GDPR) 
                  и законодательством Германии.
                </p>
              </div>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">1. Ответственный за обработку данных</h2>
                <p>
                  Ответственный за обработку персональных данных: администратор группы Telegram 
                  <a href="https://t.me/+S3Ru-enHHixkY2Yy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                    "Анкета"
                  </a>
                </p>
                <p className="mt-2">
                  Контакты для связи по вопросам обработки данных: через Telegram группу 
                  <a href="https://t.me/+S3Ru-enHHixkY2Yy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                    https://t.me/+S3Ru-enHHixkY2Yy
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">2. Какие данные мы собираем</h2>
                <h3 className="font-semibold text-foreground mb-2">2.1. Данные авторизации:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>При авторизации через Telegram: имя, фамилия, username, Telegram ID</li>
                  <li>При авторизации через Instagram: username, полное имя</li>
                </ul>

                <h3 className="font-semibold text-foreground mb-2 mt-4">2.2. Контактная информация:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Телефонный номер</li>
                  <li>Адрес электронной почты</li>
                  <li>Дополнительные контакты в социальных сетях</li>
                </ul>

                <h3 className="font-semibold text-foreground mb-2 mt-4">2.3. Медицинские данные:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ответы на вопросы анкеты здоровья</li>
                  <li>Информация о состоянии здоровья</li>
                  <li>Данные о вакцинации и перенесенных заболеваниях</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">3. Цели обработки данных</h2>
                <p>Мы обрабатываем ваши персональные данные для следующих целей:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Обработка и анализ анкет здоровья</li>
                  <li>Связь с вами по вопросам, связанным с анкетой</li>
                  <li>Предоставление медицинских консультаций и рекомендаций</li>
                  <li>Улучшение качества предоставляемых услуг</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">4. Правовая основа обработки</h2>
                <p>
                  Обработка персональных данных осуществляется на основе вашего явного согласия 
                  (ст. 6 п. 1 лит. a GDPR). Вы имеете право отозвать свое согласие в любое время.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">5. Срок хранения данных</h2>
                <p>
                  Ваши персональные данные хранятся до отзыва вашего согласия или в течение срока, 
                  необходимого для выполнения целей обработки, но не более 3 лет с момента последнего обращения.
                </p>
                <p className="mt-2">
                  После истечения срока хранения данные автоматически удаляются или обезличиваются.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">6. Передача данных третьим лицам</h2>
                <p>
                  Мы передаем данные только в Telegram для отправки уведомлений администратору через бота. 
                  Мы не передаем ваши данные другим третьим лицам без вашего явного согласия, за исключением случаев:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Когда это требуется по закону</li>
                  <li>Когда это необходимо для защиты наших законных интересов</li>
                  <li>Когда это необходимо для выполнения договорных обязательств</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">7. Ваши права в соответствии с GDPR</h2>
                <p>Вы имеете следующие права:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    <strong className="text-foreground">Право на доступ (ст. 15 GDPR):</strong> Вы можете запросить информацию о том, 
                    какие персональные данные мы обрабатываем.
                  </li>
                  <li>
                    <strong className="text-foreground">Право на исправление (ст. 16 GDPR):</strong> Вы можете потребовать исправления 
                    неточных или неполных данных.
                  </li>
                  <li>
                    <strong className="text-foreground">Право на удаление (ст. 17 GDPR):</strong> Вы можете потребовать удаления 
                    ваших данных при определенных обстоятельствах.
                  </li>
                  <li>
                    <strong className="text-foreground">Право на ограничение обработки (ст. 18 GDPR):</strong> Вы можете потребовать 
                    ограничения обработки ваших данных.
                  </li>
                  <li>
                    <strong className="text-foreground">Право на переносимость данных (ст. 20 GDPR):</strong> Вы можете получить 
                    ваши данные в структурированном формате.
                  </li>
                  <li>
                    <strong className="text-foreground">Право на отзыв согласия (ст. 7 п. 3 GDPR):</strong> Вы можете отозвать 
                    свое согласие в любое время без ущерба для законности обработки, основанной на согласии до его отзыва.
                  </li>
                  <li>
                    <strong className="text-foreground">Право на возражение (ст. 21 GDPR):</strong> Вы можете возразить против 
                    обработки ваших данных в определенных случаях.
                  </li>
                  <li>
                    <strong className="text-foreground">Право на подачу жалобы (ст. 77 GDPR):</strong> Вы имеете право подать жалобу 
                    в надзорный орган, если считаете, что обработка ваших данных нарушает GDPR.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">8. Как реализовать свои права</h2>
                <p>
                  Для реализации своих прав обращайтесь к нам через Telegram группу 
                  <a href="https://t.me/+S3Ru-enHHixkY2Yy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                    "Анкета"
                  </a>
                  . Мы ответим на ваш запрос в течение 30 дней.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">9. Безопасность данных</h2>
                <p>
                  Мы применяем технические и организационные меры для защиты ваших персональных данных от 
                  несанкционированного доступа, потери, уничтожения или изменения.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">10. Изменения в политике конфиденциальности</h2>
                <p>
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                  О существенных изменениях мы уведомим вас через наш сайт или другими способами.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">11. Контактная информация</h2>
                <p>
                  По всем вопросам, связанным с обработкой персональных данных, обращайтесь:
                </p>
                <p className="mt-2">
                  Telegram группа:{" "}
                  <a href="https://t.me/+S3Ru-enHHixkY2Yy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    https://t.me/+S3Ru-enHHixkY2Yy
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">12. Надзорный орган</h2>
                <p>
                  В случае нарушения ваших прав вы можете подать жалобу в надзорный орган по защите данных:
                </p>
                <p className="mt-2">
                  <strong className="text-foreground">Для Германии:</strong><br />
                  Die Bundesbeauftragte für den Datenschutz und die Informationsfreiheit<br />
                  Graurheindorfer Str. 153<br />
                  53117 Bonn<br />
                  Телефон: +49 (0)228-997799-0<br />
                  Email: poststelle@bfdi.bund.de<br />
                  Веб-сайт:{" "}
                  <a href="https://www.bfdi.bund.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    https://www.bfdi.bund.de
                  </a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Privacy;

