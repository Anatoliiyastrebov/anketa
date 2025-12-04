import { QuestionGroup } from "@/types/questionnaire";

export const womanQuestions: QuestionGroup[] = [
  {
    id: "personal",
    title: "Личные данные",
    questions: [
      { id: "name", text: "Имя", type: "text", placeholder: "Ваше имя", required: true },
      { id: "surname", text: "Фамилия", type: "text", placeholder: "Ваша фамилия", required: true },
      { id: "age", text: "Возраст", type: "number", placeholder: "Полных лет", required: true, validation: { min: 1, max: 120 } },
      { id: "weight", text: "Вес (кг)", type: "number", placeholder: "Ваш вес", required: true, validation: { min: 20, max: 300 } },
    ],
  },
  {
    id: "covid",
    title: "Ковид / Вакцинация",
    questions: [
      {
        id: "covid_vaccine",
        text: "Был ли ковид или вакцина?",
        type: "radio",
        options: ["Да, был ковид", "Да, была вакцина", "Было и то, и другое", "Нет"],
        required: true,
      },
    ],
  },
  {
    id: "digestion",
    title: "Пищеварение",
    questions: [
      {
        id: "digestion_issues",
        text: "Есть ли проблемы с пищеварением?",
        type: "checkbox",
        options: ["Изжога", "Вздутие", "Диарея", "Запор", "Нет проблем"],
        required: true,
      },
    ],
  },
  {
    id: "hair",
    title: "Волосы",
    questions: [
      {
        id: "hair_issues",
        text: "Состояние волос:",
        type: "checkbox",
        options: ["Выпадают", "Секутся", "Сухие", "Всё в порядке"],
        required: true,
      },
    ],
  },
  {
    id: "teeth",
    title: "Зубы и дёсны",
    questions: [
      {
        id: "teeth_issues",
        text: "Проблемы с зубами и дёснами:",
        type: "checkbox",
        options: ["Крошатся зубы", "Часто портятся", "Запах изо рта", "Кровоточат дёсны", "Нет проблем"],
        required: true,
      },
    ],
  },
  {
    id: "joints",
    title: "Суставы",
    questions: [
      {
        id: "joints_issues",
        text: "Состояние суставов:",
        type: "checkbox",
        options: ["Хрустят", "Болят", "Всё в порядке"],
        required: true,
      },
    ],
  },
  {
    id: "circulation",
    title: "Кровообращение",
    questions: [
      {
        id: "cold_hands_feet",
        text: "Холодные руки-ноги даже летом?",
        type: "radio",
        options: ["Да", "Иногда", "Нет"],
        required: true,
      },
    ],
  },
  {
    id: "head",
    title: "Голова",
    questions: [
      {
        id: "headaches",
        text: "Головные боли, мигрени:",
        type: "radio",
        options: ["Часто", "Иногда", "Редко", "Никогда"],
        required: true,
      },
      {
        id: "head_injuries",
        text: "Были ли травмы головы?",
        type: "radio",
        options: ["Да", "Нет"],
        required: true,
      },
    ],
  },
  {
    id: "surgeries",
    title: "Операции",
    questions: [
      {
        id: "surgeries_list",
        text: "Какие операции были? (если не было — напишите 'нет')",
        type: "textarea",
        placeholder: "Опишите операции...",
        required: true,
      },
    ],
  },
  {
    id: "formations",
    title: "Образования",
    questions: [
      {
        id: "formations_issues",
        text: "Есть ли кисты, миомы, камни?",
        type: "checkbox",
        options: ["Кисты", "Миомы", "Камни в почках", "Камни в желчном", "Нет"],
        required: true,
      },
    ],
  },
  {
    id: "pressure",
    title: "Давление",
    questions: [
      {
        id: "blood_pressure",
        text: "Проблемы с давлением:",
        type: "radio",
        options: ["Повышенное", "Пониженное", "Скачет", "В норме"],
        required: true,
      },
      {
        id: "pressure_meds",
        text: "Принимаете ли лекарства от давления?",
        type: "textarea",
        placeholder: "Какие препараты (или 'нет')",
        required: true,
      },
    ],
  },
  {
    id: "cycle",
    title: "Менструальный цикл",
    questions: [
      {
        id: "menstrual_status",
        text: "Ваш статус:",
        type: "radio",
        options: ["Регулярный цикл", "Нерегулярный цикл", "Менопауза", "Постменопауза"],
        required: true,
      },
      {
        id: "cycle_details",
        text: "Дополнительная информация о цикле:",
        type: "textarea",
        placeholder: "Болезненность, обильность и т.д.",
        required: false,
      },
    ],
  },
  {
    id: "discharge",
    title: "Выделения",
    questions: [
      {
        id: "discharge_issues",
        text: "Есть ли проблемы:",
        type: "checkbox",
        options: ["Молочница", "Папилломы", "Герпес", "Нет проблем"],
        required: true,
      },
    ],
  },
  {
    id: "allergies",
    title: "Аллергии",
    questions: [
      {
        id: "allergies_list",
        text: "Есть ли аллергии? На что?",
        type: "textarea",
        placeholder: "Опишите аллергии (или 'нет')",
        required: true,
      },
    ],
  },
  {
    id: "skin",
    title: "Кожа",
    questions: [
      {
        id: "skin_issues",
        text: "Состояние кожи:",
        type: "checkbox",
        options: ["Сухая", "Жирная", "Высыпания", "Пигментация", "Всё в порядке"],
        required: true,
      },
    ],
  },
  {
    id: "sleep",
    title: "Сон",
    questions: [
      {
        id: "sleep_quality",
        text: "Качество сна:",
        type: "radio",
        options: ["Хороший", "Просыпаюсь ночью", "Трудно заснуть", "Плохой сон"],
        required: true,
      },
    ],
  },
  {
    id: "energy",
    title: "Энергия",
    questions: [
      {
        id: "energy_level",
        text: "Уровень энергии:",
        type: "radio",
        options: ["Высокий", "Нормальный", "Низкий", "Очень низкий"],
        required: true,
      },
    ],
  },
  {
    id: "water",
    title: "Вода",
    questions: [
      {
        id: "water_intake",
        text: "Сколько воды пьёте в день?",
        type: "radio",
        options: ["Менее 1 литра", "1-1.5 литра", "1.5-2 литра", "Более 2 литров"],
        required: true,
      },
    ],
  },
  {
    id: "veins",
    title: "Вены",
    questions: [
      {
        id: "veins_issues",
        text: "Проблемы с венами:",
        type: "checkbox",
        options: ["Варикоз", "Геморрой", "Нет проблем"],
        required: true,
      },
    ],
  },
  {
    id: "additional",
    title: "Дополнительно",
    questions: [
      {
        id: "additional_info",
        text: "Что ещё важно знать?",
        type: "textarea",
        placeholder: "Любая дополнительная информация...",
        required: false,
      },
    ],
  },
];

// Man questions - same as woman but without gynecological questions
export const manQuestions: QuestionGroup[] = womanQuestions.filter(
  (group) => !["cycle", "discharge"].includes(group.id)
);

export const childQuestions: QuestionGroup[] = [
  {
    id: "personal",
    title: "Данные ребёнка",
    questions: [
      { id: "name", text: "Имя ребёнка", type: "text", placeholder: "Имя", required: true },
      { id: "age", text: "Возраст", type: "number", placeholder: "Полных лет (или месяцев для малышей)", required: true, validation: { min: 0, max: 18 } },
      { id: "weight", text: "Вес (кг)", type: "number", placeholder: "Вес ребёнка", required: true, validation: { min: 2, max: 150 } },
    ],
  },
  {
    id: "digestion",
    title: "Пищеварение",
    questions: [
      {
        id: "digestion_issues",
        text: "Проблемы с пищеварением:",
        type: "checkbox",
        options: ["Боли в животе", "Вздутие", "Диарея", "Запор", "Нет проблем"],
        required: true,
      },
    ],
  },
  {
    id: "teeth",
    title: "Зубы",
    questions: [
      {
        id: "teeth_issues",
        text: "Зубы быстро портятся?",
        type: "radio",
        options: ["Да", "Нет"],
        required: true,
      },
    ],
  },
  {
    id: "sleep_habits",
    title: "Сон",
    questions: [
      {
        id: "sleep_sweat",
        text: "Потеет во сне?",
        type: "radio",
        options: ["Да, часто", "Иногда", "Нет"],
        required: true,
      },
      {
        id: "teeth_grinding",
        text: "Скрипит зубами во сне?",
        type: "radio",
        options: ["Да", "Иногда", "Нет"],
        required: true,
      },
    ],
  },
  {
    id: "breath",
    title: "Запах изо рта",
    questions: [
      {
        id: "bad_breath",
        text: "Есть запах изо рта?",
        type: "radio",
        options: ["Да", "Иногда", "Нет"],
        required: true,
      },
    ],
  },
  {
    id: "sweet",
    title: "Сладкое",
    questions: [
      {
        id: "sweet_dependency",
        text: "Зависимость от сладкого:",
        type: "radio",
        options: ["Сильная", "Умеренная", "Нет"],
        required: true,
      },
    ],
  },
  {
    id: "skin",
    title: "Кожа",
    questions: [
      {
        id: "skin_issues",
        text: "Кожные проявления:",
        type: "checkbox",
        options: ["Много родинок", "Бородавки", "Высыпания", "Всё в порядке"],
        required: true,
      },
    ],
  },
  {
    id: "allergies",
    title: "Аллергии",
    questions: [
      {
        id: "allergies_list",
        text: "Есть ли аллергии? На что?",
        type: "textarea",
        placeholder: "Опишите аллергии (или 'нет')",
        required: true,
      },
    ],
  },
  {
    id: "activity",
    title: "Активность",
    questions: [
      {
        id: "activity_level",
        text: "Уровень активности:",
        type: "radio",
        options: ["Гиперактивный", "Нормальный", "Часто устаёт", "Вялый"],
        required: true,
      },
    ],
  },
  {
    id: "water",
    title: "Вода",
    questions: [
      {
        id: "water_intake",
        text: "Сколько воды пьёт?",
        type: "radio",
        options: ["Мало пьёт", "Нормально", "Много пьёт"],
        required: true,
      },
    ],
  },
  {
    id: "injuries",
    title: "Травмы",
    questions: [
      {
        id: "injuries_list",
        text: "Были ли травмы, падения?",
        type: "textarea",
        placeholder: "Опишите (или 'нет')",
        required: true,
      },
    ],
  },
  {
    id: "head_sleep",
    title: "Голова и сон",
    questions: [
      {
        id: "headaches",
        text: "Головные боли:",
        type: "radio",
        options: ["Часто", "Иногда", "Редко", "Нет"],
        required: true,
      },
      {
        id: "sleep_quality",
        text: "Качество сна:",
        type: "radio",
        options: ["Хороший", "Беспокойный", "Плохо засыпает", "Часто просыпается"],
        required: true,
      },
    ],
  },
  {
    id: "illness",
    title: "Болезни",
    questions: [
      {
        id: "illness_frequency",
        text: "Как часто болеет?",
        type: "radio",
        options: ["Редко", "Несколько раз в год", "Часто", "Очень часто"],
        required: true,
      },
      {
        id: "antibiotics",
        text: "Принимал антибиотики?",
        type: "radio",
        options: ["Нет", "1-2 раза", "Несколько раз", "Много раз"],
        required: true,
      },
    ],
  },
  {
    id: "additional",
    title: "Дополнительно",
    questions: [
      {
        id: "additional_info",
        text: "Что ещё важно знать?",
        type: "textarea",
        placeholder: "Любая дополнительная информация...",
        required: false,
      },
    ],
  },
];

export const getQuestionsForUserType = (userType: "woman" | "man" | "child") => {
  switch (userType) {
    case "woman":
      return womanQuestions;
    case "man":
      return manQuestions;
    case "child":
      return childQuestions;
  }
};
