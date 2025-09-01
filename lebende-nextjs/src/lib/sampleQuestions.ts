import { Question } from '@/types/quiz';

export const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Wie viele Bundesländer hat die Bundesrepublik Deutschland?",
    options: ["14", "15", "16", "17"],
    correct: 2,
    category: "Politik in der Demokratie",
    explanation: "Deutschland besteht aus 16 Bundesländern: Baden-Württemberg, Bayern, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommern, Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein und Thüringen."
  },
  {
    id: 2,
    question: "Was ist die Hauptstadt der Bundesrepublik Deutschland?",
    options: ["Hamburg", "München", "Berlin", "Köln"],
    correct: 2,
    category: "Politik in der Demokratie",
    explanation: "Berlin ist seit der Wiedervereinigung 1990 die Hauptstadt Deutschlands und Sitz der Bundesregierung."
  },
  {
    id: 3,
    question: "Wann wurde das Grundgesetz der Bundesrepublik Deutschland verkündet?",
    options: ["1945", "1949", "1950", "1955"],
    correct: 1,
    category: "Geschichte und Verantwortung",
    explanation: "Das Grundgesetz wurde am 23. Mai 1949 verkündet und trat am 24. Mai 1949 in Kraft."
  },
  {
    id: 4,
    question: "Welche Farben hat die deutsche Flagge?",
    options: ["Schwarz-Rot-Gold", "Schwarz-Weiß-Rot", "Blau-Weiß-Rot", "Schwarz-Gelb-Rot"],
    correct: 0,
    category: "Politik in der Demokratie",
    explanation: "Die deutsche Flagge zeigt die Farben Schwarz-Rot-Gold in horizontalen Streifen."
  },
  {
    id: 5,
    question: "Was bedeutet 'Meinungsfreiheit'?",
    options: [
      "Man darf seine Meinung nur zu Hause äußern",
      "Man darf seine Meinung frei äußern, solange man andere nicht beleidigt",
      "Man darf seine Meinung nur in der Familie äußern",
      "Man darf seine Meinung nur bei der Polizei äußern"
    ],
    correct: 1,
    category: "Mensch und Gesellschaft",
    explanation: "Meinungsfreiheit bedeutet, dass jeder das Recht hat, seine Meinung frei zu äußern und zu verbreiten, solange er dabei nicht die Rechte anderer verletzt oder gegen Gesetze verstößt."
  }
];

export const bundeslandSample = {
  bayern: [
    {
      id: 301,
      question: "Welches Wappen gehört zum Freistaat Bayern?",
      options: ["Bild 1", "Bild 2", "Bild 3", "Bild 4"],
      correct: 3,
      category: "Politik in der Demokratie" as const,
      hasImage: true,
      explanation: "Das bayerische Wappen zeigt die weiß-blauen Rauten, den fränkischen Rechen und den pfälzischen Löwen."
    },
    {
      id: 302,
      question: "Was ist die Landeshauptstadt von Bayern?",
      options: ["Nürnberg", "München", "Augsburg", "Würzburg"],
      correct: 1,
      category: "Politik in der Demokratie" as const,
      explanation: "München ist die Hauptstadt des Freistaates Bayern und die drittgrößte Stadt Deutschlands."
    }
  ]
};