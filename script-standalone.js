class LebenInDeutschlandQuiz {
    constructor() {
        this.allQuestions = []; // Will be loaded from JSON
        this.questions = []; // Current quiz questions
        this.quizMode = 'practice'; // 'practice', 'exam', 'all'
        this.showCorrectAnswer = false;
        
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.isQuizActive = false;
        this.achievements = {
            'first-question': false,
            'streak-5': false,
            'half-way': false,
            'perfect-score': false
        };
        this.currentStreak = 0;
        
        // Dashboard data
        this.userProfile = {
            name: 'Student',
            avatar: '🇩🇪',
            totalSessions: 0,
            studyTimeMinutes: 0,
            successRate: 0,
            totalQuestionsAnswered: 0,
            averageAnswerTime: 0,
            bestStreak: 0,
            daysStudied: 0,
            lastStudyDate: null
        };
        
        this.quizHistory = [];
        this.studyStreak = 0;
        this.weakAreas = {
            'Politik in der Demokratie': { correct: 0, total: 0 },
            'Geschichte und Verantwortung': { correct: 0, total: 0 },
            'Mensch und Gesellschaft': { correct: 0, total: 0 }
        };
        
        this.bundeslandQuestions = {}; // Will store state-specific questions
        
        // Load fallback questions immediately so quiz always works
        console.log('Loading fallback questions in constructor...');
        this.loadFallbackQuestions();
        console.log(`Constructor: Loaded ${this.allQuestions.length} fallback questions`);
        
        this.init();
    }
    
    async init() {
        // Try to load questions from JSON, but fallback is already loaded
        await this.loadQuestions();
        
        console.log(`Quiz initialized with ${this.allQuestions.length} questions`);
        
        this.loadUserData();
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupThemeToggle();
        this.setupScrollAnimations();
        this.setupParticleSystem();
        this.setupScrollIndicator();
        this.setupSoundEffects();
        this.setupMagneticEffects();
        this.setupDashboard();
    }
    
    async loadQuestions() {
        // Embedded questions data (no server required)
        const embeddedData = {
        "questions": [
                {
                        "number": 1,
                        "question": "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil …",
                        "options": [
                                "hier Religionsfreiheit gilt.",
                                "die Menschen Steuern zahlen.",
                                "die Menschen das Wahlrecht haben.",
                                "hier Meinungsfreiheit gilt."
                        ],
                        "answer": "hier Meinungsfreiheit gilt."
                },
                {
                        "number": 2,
                        "question": "In Deutschland können Eltern bis zum 14. Lebensjahr ihres Kindes entscheiden, ob es in der Schule am …",
                        "options": [
                                "Geschichtsunterricht teilnimmt.",
                                "Religionsunterricht teilnimmt.",
                                "Politikunterricht teilnimmt.",
                                "Sprachunterricht teilnimmt."
                        ],
                        "answer": "Religionsunterricht teilnimmt."
                },
                {
                        "number": 3,
                        "question": "Deutschland ist ein Rechtsstaat. Was ist damit gemeint?",
                        "options": [
                                "Alle Einwohnerinnen/Einwohner und der Staat müssen sich an die Gesetze halten.",
                                "Der Staat muss sich nicht an die Gesetze halten.",
                                "Nur Deutsche müssen die Gesetze befolgen.",
                                "Die Gerichte machen die Gesetze."
                        ],
                        "answer": "Alle Einwohnerinnen/Einwohner und der Staat müssen sich an die Gesetze halten."
                },
                {
                        "number": 4,
                        "question": "Welches Recht gehört zu den Grundrechten in Deutschland?",
                        "options": [
                                "Waffenbesitz",
                                "Faustrecht",
                                "Meinungsfreiheit",
                                "Selbstjustiz"
                        ],
                        "answer": "Meinungsfreiheit"
                },
                {
                        "number": 5,
                        "question": "Wahlen in Deutschland sind frei. Was bedeutet das?",
                        "options": [
                                "Man darf Geld annehmen, wenn man dafür eine bestimmte Kandidatin/einen bestimmten Kandidaten wählt.",
                                "Nur Personen, die noch nie im Gefängnis waren, dürfen wählen.",
                                "Die Wählerin/der Wähler darf bei der Wahl weder beeinflusst noch zu einer bestimmten Stimmabgabe gezwungen werden und keine Nachteile durch die Wahl haben.",
                                "Alle wahlberechtigten Personen müssen wählen."
                        ],
                        "answer": "Die Wählerin/der Wähler darf bei der Wahl weder beeinflusst noch zu einer bestimmten Stimmabgabe gezwungen werden und keine Nachteile durch die Wahl haben."
                },
                {
                        "number": 6,
                        "question": "Wie heißt die deutsche Verfassung?",
                        "options": [
                                "Volksgesetz",
                                "Bundesgesetz",
                                "Deutsches Gesetz",
                                "Grundgesetz"
                        ],
                        "answer": "Grundgesetz"
                },
                {
                        "number": 7,
                        "question": "Welches Recht gehört zu den Grundrechten, die nach der deutschen Verfassung garantiert werden? Das Recht auf …",
                        "options": [
                                "Glaubens- und Gewissensfreiheit",
                                "Unterhaltung",
                                "Arbeit",
                                "Wohnung"
                        ],
                        "answer": "Glaubens- und Gewissensfreiheit"
                },
                {
                        "number": 8,
                        "question": "Was steht nicht im Grundgesetz von Deutschland?",
                        "options": [
                                "Die Würde des Menschen ist unantastbar.",
                                "Alle sollen gleich viel Geld haben.",
                                "Jeder Mensch darf seine Meinung sagen.",
                                "Alle sind vor dem Gesetz gleich."
                        ],
                        "answer": "Alle sollen gleich viel Geld haben."
                },
                {
                        "number": 9,
                        "question": "Welches Grundrecht gilt in Deutschland nur für Ausländerinnen/Ausländer? Das Grundrecht auf …",
                        "options": [
                                "Schutz der Familie",
                                "Menschenwürde",
                                "Asyl",
                                "Meinungsfreiheit"
                        ],
                        "answer": "Asyl"
                },
                {
                        "number": 10,
                        "question": "Was ist mit dem deutschen Grundgesetz vereinbar?",
                        "options": [
                                "die Prügelstrafe",
                                "die Folter",
                                "die Todesstrafe",
                                "die Geldstrafe"
                        ],
                        "answer": "die Geldstrafe"
                },
                {
                        "number": 11,
                        "question": "Wie wird die Verfassung der Bundesrepublik Deutschland genannt?",
                        "options": [
                                "Grundgesetz",
                                "Bundesverfassung",
                                "Gesetzbuch",
                                "Verfassungsvertrag"
                        ],
                        "answer": "Grundgesetz"
                },
                {
                        "number": 12,
                        "question": "Eine Partei im Deutschen Bundestag will die Pressefreiheit abschaffen. Ist das möglich?",
                        "options": [
                                "Ja, wenn mehr als die Hälfte der Abgeordneten im Bundestag dafür sind.",
                                "Ja, aber dazu müssen zwei Drittel der Abgeordneten im Bundestag dafür sein.",
                                "Nein, denn die Pressefreiheit ist ein Grundrecht. Sie kann nicht abgeschafft werden.",
                                "Nein, denn nur der Bundesrat kann die Pressefreiheit abschaffen."
                        ],
                        "answer": "Nein, denn die Pressefreiheit ist ein Grundrecht. Sie kann nicht abgeschafft werden."
                },
                {
                        "number": 13,
                        "question": "Im Parlament steht der Begriff 'Opposition' für …",
                        "options": [
                                "die regierenden Parteien.",
                                "die Fraktion mit den meisten Abgeordneten.",
                                "alle Parteien, die bei der letzten Wahl die 5%-Hürde erreichen konnten.",
                                "alle Abgeordneten, die nicht zu der Regierungspartei/den Regierungsparteien gehören."
                        ],
                        "answer": "alle Abgeordneten, die nicht zu der Regierungspartei/den Regierungsparteien gehören."
                },
                {
                        "number": 14,
                        "question": "Meinungsfreiheit in Deutschland heißt, dass ich …",
                        "options": [
                                "Passanten auf der Straße beschimpfen darf.",
                                "meine Meinung im Internet äußern kann.",
                                "Nazi-, Hamas- oder Islamischer Staat-Symbole öffentlich tragen darf.",
                                "meine Meinung nur dann äußern darf, solange ich der Regierung nicht widerspreche."
                        ],
                        "answer": "meine Meinung im Internet äußern kann."
                },
                {
                        "number": 15,
                        "question": "Was verbietet das deutsche Grundgesetz?",
                        "options": [
                                "Militärdienst",
                                "Zwangsarbeit",
                                "freie Berufswahl",
                                "Arbeit im Ausland"
                        ],
                        "answer": "Zwangsarbeit"
                },
                {
                        "number": 16,
                        "question": "Wann ist die Meinungsfreiheit in Deutschland eingeschränkt?",
                        "options": [
                                "bei der öffentlichen Verbreitung falscher Behauptungen über einzelne Personen",
                                "bei Meinungsäußerungen über die Bundesregierung",
                                "bei Diskussionen über Religionen",
                                "bei Kritik am Staat"
                        ],
                        "answer": "bei der öffentlichen Verbreitung falscher Behauptungen über einzelne Personen"
                },
                {
                        "number": 17,
                        "question": "Die deutschen Gesetze verbieten …",
                        "options": [
                                "Meinungsfreiheit der Einwohnerinnen und Einwohner.",
                                "Petitionen der Bürgerinnen und Bürger.",
                                "Versammlungsfreiheit der Einwohnerinnen und Einwohner.",
                                "Ungleichbehandlung der Bürgerinnen und Bürger durch den Staat."
                        ],
                        "answer": "Ungleichbehandlung der Bürgerinnen und Bürger durch den Staat."
                },
                {
                        "number": 18,
                        "question": "Welches Grundrecht ist in Artikel 1 des Grundgesetzes der Bundesrepublik Deutschland garantiert?",
                        "options": [
                                "die Unantastbarkeit der Menschenwürde",
                                "das Recht auf Leben",
                                "Religionsfreiheit",
                                "Meinungsfreiheit"
                        ],
                        "answer": "die Unantastbarkeit der Menschenwürde"
                },
                {
                        "number": 19,
                        "question": "Was versteht man unter dem Recht der 'Freizügigkeit' in Deutschland?",
                        "options": [
                                "Man darf sich seinen Wohnort selbst aussuchen.",
                                "Man kann seinen Beruf wechseln.",
                                "Man darf sich für eine andere Religion entscheiden.",
                                "Man darf sich in der Öffentlichkeit nur leicht bekleidet bewegen."
                        ],
                        "answer": "Man darf sich seinen Wohnort selbst aussuchen."
                },
                {
                        "number": 20,
                        "question": "Eine Partei in Deutschland verfolgt das Ziel, eine Diktatur zu errichten. Sie ist dann …",
                        "options": [
                                "tolerant.",
                                "rechtsstaatlich orientiert.",
                                "gesetzestreu.",
                                "verfassungswidrig."
                        ],
                        "answer": "verfassungswidrig."
                },
                {
                        "number": 21,
                        "question": "Welches ist das Wappen der Bundesrepublik Deutschland?",
                        "options": [
                                "Bild 1",
                                "Bild 2",
                                "Bild 3",
                                "Bild 4"
                        ],
                        "answer": "Bild 1"
                },
                {
                        "number": 22,
                        "question": "Was für eine Staatsform hat Deutschland?",
                        "options": [
                                "Monarchie",
                                "Diktatur",
                                "Republik",
                                "Fürstentum"
                        ],
                        "answer": "Republik"
                },
                {
                        "number": 23,
                        "question": "In Deutschland sind die meisten Erwerbstätigen …",
                        "options": [
                                "in kleinen Familienunternehmen beschäftigt.",
                                "ehrenamtlich für ein Bundesland tätig.",
                                "selbstständig mit einer eigenen Firma tätig.",
                                "bei einer Firma oder Behörde beschäftigt."
                        ],
                        "answer": "bei einer Firma oder Behörde beschäftigt."
                },
                {
                        "number": 24,
                        "question": "Wie viele Bundesländer hat die Bundesrepublik Deutschland?",
                        "options": [
                                "14",
                                "15",
                                "16",
                                "17"
                        ],
                        "answer": "16"
                },
                {
                        "number": 25,
                        "question": "Was ist kein Bundesland der Bundesrepublik Deutschland?",
                        "options": [
                                "Elsass-Lothringen",
                                "Nordrhein-Westfalen",
                                "Mecklenburg-Vorpommern",
                                "Sachsen-Anhalt"
                        ],
                        "answer": "Elsass-Lothringen"
                },
                {
                        "number": 26,
                        "question": "Deutschland ist …",
                        "options": [
                                "eine kommunistische Republik.",
                                "ein demokratischer und sozialer Bundesstaat.",
                                "eine kapitalistische und soziale Monarchie.",
                                "ein sozialer und sozialistischer Bundesstaat."
                        ],
                        "answer": "ein demokratischer und sozialer Bundesstaat."
                },
                {
                        "number": 27,
                        "question": "Deutschland ist …",
                        "options": [
                                "ein sozialistischer Staat.",
                                "ein Bundesstaat.",
                                "eine Diktatur.",
                                "eine Monarchie."
                        ],
                        "answer": "ein Bundesstaat."
                },
                {
                        "number": 28,
                        "question": "Wer wählt in Deutschland die Abgeordneten zum Bundestag?",
                        "options": [
                                "das Militär",
                                "die Wirtschaft",
                                "das wahlberechtigte Volk",
                                "die Verwaltung"
                        ],
                        "answer": "das wahlberechtigte Volk"
                },
                {
                        "number": 29,
                        "question": "Welches Tier ist das Wappentier der Bundesrepublik Deutschland?",
                        "options": [
                                "Löwe",
                                "Adler",
                                "Bär",
                                "Pferd"
                        ],
                        "answer": "Adler"
                },
                {
                        "number": 30,
                        "question": "Was ist kein Merkmal unserer Demokratie?",
                        "options": [
                                "regelmäßige Wahlen",
                                "Pressezensur",
                                "Meinungsfreiheit",
                                "verschiedene Parteien"
                        ],
                        "answer": "Pressezensur"
                },
                {
                        "number": 31,
                        "question": "Die Zusammenarbeit von Parteien zur Bildung einer Regierung nennt man in Deutschland …",
                        "options": [
                                "Einheit.",
                                "Koalition.",
                                "Ministerium.",
                                "Fraktion."
                        ],
                        "answer": "Koalition"
                },
                {
                        "number": 32,
                        "question": "Was ist keine staatliche Gewalt in Deutschland?",
                        "options": [
                                "Gesetzgebung",
                                "Regierung",
                                "Presse",
                                "Rechtsprechung"
                        ],
                        "answer": "Presse"
                },
                {
                        "number": 33,
                        "question": "Welche Aussage ist richtig? In Deutschland …",
                        "options": [
                                "sind Staat und Religionsgemeinschaften voneinander getrennt.",
                                "bilden die Religionsgemeinschaften den Staat.",
                                "ist der Staat abhängig von den Religionsgemeinschaften.",
                                "bilden Staat und Religionsgemeinschaften eine Einheit."
                        ],
                        "answer": "sind Staat und Religionsgemeinschaften voneinander getrennt."
                },
                {
                        "number": 34,
                        "question": "Was ist Deutschland nicht?",
                        "options": [
                                "eine Demokratie",
                                "ein Rechtsstaat",
                                "eine Monarchie",
                                "ein Sozialstaat"
                        ],
                        "answer": "eine Monarchie"
                },
                {
                        "number": 35,
                        "question": "Womit finanziert der deutsche Staat die Sozialversicherung?",
                        "options": [
                                "Kirchensteuer",
                                "Sozialabgaben",
                                "Spendengeldern",
                                "Vereinsbeiträgen"
                        ],
                        "answer": "Sozialabgaben"
                },
                {
                        "number": 36,
                        "question": "Welche Maßnahme schafft in Deutschland soziale Sicherheit?",
                        "options": [
                                "die Krankenversicherung",
                                "die Autoversicherung",
                                "die Gebäudeversicherung",
                                "die Haftpflichtversicherung"
                        ],
                        "answer": "die Krankenversicherung"
                },
                {
                        "number": 37,
                        "question": "Wie werden die Regierungschefinnen/Regierungschefs der meisten Bundesländer in Deutschland genannt?",
                        "options": [
                                "Erste Ministerin/Erster Minister",
                                "Premierministerin/Premierminister",
                                "Senatorin/Senator",
                                "Ministerpräsidentin/Ministerpräsident"
                        ],
                        "answer": "Ministerpräsidentin/Ministerpräsident"
                },
                {
                        "number": 38,
                        "question": "Die Bundesrepublik Deutschland ist ein demokratischer und sozialer …",
                        "options": [
                                "Staatenverbund.",
                                "Bundesstaat.",
                                "Staatenbund.",
                                "Zentralstaat."
                        ],
                        "answer": "Bundesstaat."
                },
                {
                        "number": 39,
                        "question": "Was hat jedes deutsche Bundesland?",
                        "options": [
                                "eine eigene Außenministerin/einen eigenen Außenminister",
                                "eine eigene Währung",
                                "eine eigene Armee",
                                "eine eigene Regierung"
                        ],
                        "answer": "eine eigene Regierung"
                },
                {
                        "number": 40,
                        "question": "Mit welchen Worten beginnt die deutsche Nationalhymne?",
                        "options": [
                                "Völker, hört die Signale …",
                                "Einigkeit und Recht und Freiheit …",
                                "Freude schöner Götterfunken …",
                                "Deutschland einig Vaterland …"
                        ],
                        "answer": "Einigkeit und Recht und Freiheit …"
                },
                {
                        "number": 41,
                        "question": "Warum gibt es in einer Demokratie mehr als eine Partei?",
                        "options": [
                                "weil dadurch die unterschiedlichen Meinungen der Bürgerinnen und Bürger vertreten werden",
                                "damit Bestechung in der Politik begrenzt wird",
                                "um politische Demonstrationen zu verhindern",
                                "um wirtschaftlichen Wettbewerb anzuregen"
                        ],
                        "answer": "weil dadurch die unterschiedlichen Meinungen der Bürgerinnen und Bürger vertreten werden"
                },
                {
                        "number": 42,
                        "question": "Wer beschließt in Deutschland ein neues Gesetz?",
                        "options": [
                                "die Regierung",
                                "das Parlament",
                                "die Gerichte",
                                "die Polizei"
                        ],
                        "answer": "das Parlament"
                },
                {
                        "number": 43,
                        "question": "Wann kann in Deutschland eine Partei verboten werden?",
                        "options": [
                                "wenn ihr Wahlkampf zu teuer ist",
                                "wenn sie gegen die Verfassung kämpft",
                                "wenn sie Kritik am Staatsoberhaupt äußert",
                                "wenn ihr Programm eine neue Richtung vorschlägt"
                        ],
                        "answer": "wenn sie gegen die Verfassung kämpft"
                },
                {
                        "number": 44,
                        "question": "Wen kann man als Bürgerin/Bürger in Deutschland nicht direkt wählen?",
                        "options": [
                                "Abgeordnete des EU-Parlaments",
                                "Die Bundespräsidentin/den Bundespräsidenten",
                                "Landtagsabgeordnete",
                                "Bundestagsabgeordnete"
                        ],
                        "answer": "Die Bundespräsidentin/den Bundespräsidenten"
                },
                {
                        "number": 45,
                        "question": "Zu welcher Versicherung gehört die Pflegeversicherung?",
                        "options": [
                                "Sozialversicherung",
                                "Unfallversicherung",
                                "Hausratsversicherung",
                                "Haftpflicht- und Feuerversicherung"
                        ],
                        "answer": "Sozialversicherung"
                },
                {
                        "number": 46,
                        "question": "Der deutsche Staat hat viele Aufgaben. Welche Aufgabe gehört dazu?",
                        "options": [
                                "Er baut Straßen und Schulen.",
                                "Er verkauft Lebensmittel und Kleidung.",
                                "Er versorgt alle Einwohnerinnen und Einwohner kostenlos mit Zeitungen.",
                                "Er produziert Autos und Busse."
                        ],
                        "answer": "Er baut Straßen und Schulen."
                },
                {
                        "number": 47,
                        "question": "Der deutsche Staat hat viele Aufgaben. Welche Aufgabe gehört nicht dazu?",
                        "options": [
                                "Er bezahlt für alle Staatsangehörigen Urlaubsreisen.",
                                "Er zahlt Kindergeld.",
                                "Er unterstützt Museen.",
                                "Er fördert Sportlerinnen und Sportler."
                        ],
                        "answer": "Er bezahlt für alle Staatsangehörigen Urlaubsreisen."
                },
                {
                        "number": 48,
                        "question": "Welches Organ gehört nicht zu den Verfassungsorganen Deutschlands?",
                        "options": [
                                "der Bundesrat",
                                "die Bundespräsidentin/der Bundespräsident",
                                "die Bürgerversammlung",
                                "die Regierung"
                        ],
                        "answer": "die Bürgerversammlung"
                },
                {
                        "number": 49,
                        "question": "Wer bestimmt in Deutschland die Schulpolitik?",
                        "options": [
                                "die Lehrer und Lehrerinnen",
                                "die Bundesländer",
                                "das Familienministerium",
                                "die Universitäten"
                        ],
                        "answer": "die Bundesländer"
                },
                {
                        "number": 50,
                        "question": "Die Wirtschaftsform in Deutschland nennt man …",
                        "options": [
                                "freie Zentralwirtschaft.",
                                "soziale Marktwirtschaft.",
                                "gelenkte Zentralwirtschaft.",
                                "Planwirtschaft."
                        ],
                        "answer": "soziale Marktwirtschaft."
                },
                {
                        "number": 51,
                        "question": "Zu einem demokratischen Rechtsstaat gehört es nicht, dass …",
                        "options": [
                                "Menschen sich kritisch über die Regierung äußern können.",
                                "Bürger friedlich demonstrieren gehen dürfen.",
                                "Menschen von einer Privatpolizei ohne Grund verhaftet werden.",
                                "jemand ein Verbrechen begeht und deshalb verhaftet wird."
                        ],
                        "answer": "Menschen von einer Privatpolizei ohne Grund verhaftet werden."
                },
                {
                        "number": 52,
                        "question": "Was bedeutet \"Volkssouveränität\"? Alle Staatsgewalt geht vom ...",
                        "options": [
                                "Volke aus.",
                                "Bundestag aus.",
                                "preußischen König aus.",
                                "Bundesverfassungsgericht aus."
                        ],
                        "answer": "Volke aus."
                },
                {
                        "number": 53,
                        "question": "Was bedeutet \"Rechtsstaat\" in Deutschland?",
                        "options": [
                                "Der Staat hat Recht.",
                                "Es gibt nur rechte Parteien.",
                                "Die Bürgerinnen und Bürger entscheiden über Gesetze.",
                                "Der Staat muss die Gesetze einhalten."
                        ],
                        "answer": "Der Staat muss die Gesetze einhalten."
                },
                {
                        "number": 54,
                        "question": "Was ist keine staatliche Gewalt in Deutschland?",
                        "options": [
                                "Legislative",
                                "Judikative",
                                "Exekutive",
                                "Direktive"
                        ],
                        "answer": "Direktive"
                },
                {
                        "number": 55,
                        "question": "Was zeigt dieses Bild?",
                        "options": [
                                "den Bundestagssitz in Berlin",
                                "das Bundesverfassungsgericht in Karlsruhe",
                                "das Bundesratsgebäude in Berlin",
                                "das Bundeskanzleramt in Berlin"
                        ],
                        "answer": "den Bundestagssitz in Berlin"
                },
                {
                        "number": 56,
                        "question": "Welches Amt gehört in Deutschland zur Gemeindeverwaltung?",
                        "options": [
                                "Pfarramt",
                                "Ordnungsamt",
                                "Finanzamt",
                                "Auswärtiges Amt"
                        ],
                        "answer": "Ordnungsamt"
                },
                {
                        "number": 57,
                        "question": "Wer wird meistens zur Präsidentin/zum Präsidenten des Deutschen Bundestages gewählt?",
                        "options": [
                                "die/der älteste Abgeordnete im Parlament",
                                "die Ministerpräsidentin/der Ministerpräsident des größten Bundeslandes",
                                "eine ehemalige Bundeskanzlerin/ein ehemaliger Bundeskanzler",
                                "eine Abgeordnete/ein Abgeordneter der stärksten Fraktion"
                        ],
                        "answer": "eine Abgeordnete/ein Abgeordneter der stärksten Fraktion"
                },
                {
                        "number": 58,
                        "question": "Wer ernennt in Deutschland die Ministerinnen/die Minister der Bundesregierung?",
                        "options": [
                                "die Präsidentin/der Präsident des Bundesverfassungsgerichtes",
                                "die Bundespräsidentin/der Bundespräsident",
                                "die Bundesratspräsidentin/der Bundesratspräsident",
                                "die Bundestagspräsidentin/der Bundestagspräsident"
                        ],
                        "answer": "die Bundespräsidentin/der Bundespräsident"
                },
                {
                        "number": 59,
                        "question": "Vor wie vielen Jahren gab es erstmals eine jüdische Gemeinde auf dem Gebiet des heutigen Deutschlands?",
                        "options": [
                                "vor etwa 300 Jahren",
                                "vor etwa 700 Jahren",
                                "vor etwa 1150 Jahren",
                                "vor etwa 1700 Jahren"
                        ],
                        "answer": "vor etwa 1700 Jahren"
                },
                {
                        "number": 60,
                        "question": "In Deutschland gehören der Bundestag und der Bundesrat zur …",
                        "options": [
                                "Exekutive.",
                                "Legislative.",
                                "Direktive.",
                                "Judikative."
                        ],
                        "answer": "Legislative."
                },
                {
                        "number": 61,
                        "question": "Was bedeutet \"Volkssouveränität\"?",
                        "options": [
                                "Die Königin/der König herrscht über das Volk.",
                                "Das Bundesverfassungsgericht steht über der Verfassung.",
                                "Die Interessenverbände üben die Souveränität zusammen mit der Regierung aus.",
                                "Die Staatsgewalt geht vom Volke aus."
                        ],
                        "answer": "Die Staatsgewalt geht vom Volke aus."
                },
                {
                        "number": 62,
                        "question": "Wenn das Parlament eines deutschen Bundeslandes gewählt wird, nennt man das …",
                        "options": [
                                "Kommunalwahl",
                                "Landtagswahl",
                                "Europawahl",
                                "Bundestagswahl"
                        ],
                        "answer": "Landtagswahl"
                },
                {
                        "number": 63,
                        "question": "Was gehört in Deutschland nicht zur Exekutive?",
                        "options": [
                                "die Polizei",
                                "die Gerichte",
                                "das Finanzamt",
                                "die Ministerien"
                        ],
                        "answer": "die Gerichte"
                },
                {
                        "number": 64,
                        "question": "Die Bundesrepublik Deutschland ist heute gegliedert in …",
                        "options": [
                                "vier Besatzungszonen.",
                                "einen Oststaat und einen Weststaat.",
                                "16 Kantone.",
                                "Bund, Länder und Kommunen."
                        ],
                        "answer": "Bund, Länder und Kommunen."
                },
                {
                        "number": 65,
                        "question": "Es gehört nicht zu den Aufgaben des Deutschen Bundestages, …",
                        "options": [
                                "Gesetze zu entwerfen.",
                                "die Bundesregierung zu kontrollieren.",
                                "die Bundeskanzlerin/den Bundeskanzler zu wählen.",
                                "das Bundeskabinett zu bilden."
                        ],
                        "answer": "das Bundeskabinett zu bilden."
                },
                {
                        "number": 66,
                        "question": "Welche Städte haben die größten jüdischen Gemeinden in Deutschland?",
                        "options": [
                                "Berlin und München",
                                "Hamburg und Essen",
                                "Nürnberg und Stuttgart",
                                "Worms und Speyer"
                        ],
                        "answer": "Berlin und München"
                },
                {
                        "number": 67,
                        "question": "Was ist in Deutschland vor allem eine Aufgabe der Bundesländer?",
                        "options": [
                                "Verteidigungspolitik",
                                "Außenpolitik",
                                "Wirtschaftspolitik",
                                "Schulpolitik"
                        ],
                        "answer": "Schulpolitik"
                },
                {
                        "number": 68,
                        "question": "Warum kontrolliert der Staat in Deutschland das Schulwesen?",
                        "options": [
                                "weil es in Deutschland nur staatliche Schulen gibt",
                                "weil alle Schülerinnen und Schüler einen Schulabschluss haben müssen",
                                "weil es in den Bundesländern verschiedene Schulen gibt",
                                "weil es nach dem Grundgesetz seine Aufgabe ist"
                        ],
                        "answer": "weil es nach dem Grundgesetz seine Aufgabe ist"
                },
                {
                        "number": 69,
                        "question": "Die Bundesrepublik Deutschland hat einen dreistufigen Verwaltungsaufbau. Wie heißt die unterste politische Stufe?",
                        "options": [
                                "Stadräte",
                                "Landräte",
                                "Gemeinden",
                                "Bezirksämter"
                        ],
                        "answer": "Gemeinden"
                },
                {
                        "number": 70,
                        "question": "Der deutsche Bundespräsident Gustav Heinemann gibt Helmut Schmidt 1974 die Ernennungsurkunde zum deutschen Bundeskanzler. Was gehört zu den Aufgaben der deutschen Bundespräsidentin/des deutschen Bundespräsidenten?",
                        "options": [
                                "Sie/Er führt die Regierungsgeschäfte.",
                                "Sie/Er kontrolliert die Regierungspartei.",
                                "Sie/Er wählt die Ministerinnen/Minister aus.",
                                "Sie/Er schlägt die Kanzlerin/den Kanzler zur Wahl vor."
                        ],
                        "answer": "Sie/Er schlägt die Kanzlerin/den Kanzler zur Wahl vor."
                },
                {
                        "number": 71,
                        "question": "Wo hält sich die deutsche Bundeskanzlerin/der deutsche Bundeskanzler am häufigsten auf? Am häufigsten ist sie/er …",
                        "options": [
                                "in Bonn, weil sich dort das Bundeskanzleramt und der Bundestag befinden.",
                                "auf Schloss Meseberg, dem Gästehaus der Bundesregierung, um Staatsgäste zu empfangen.",
                                "auf Schloss Bellevue, dem Amtssitz der Bundespräsidentin/des Bundespräsidenten, um Staatsgäste zu empfangen.",
                                "in Berlin, weil sich dort das Bundeskanzleramt und der Bundestag befinden."
                        ],
                        "answer": "in Berlin, weil sich dort das Bundeskanzleramt und der Bundestag befinden."
                },
                {
                        "number": 72,
                        "question": "Wie heißt die jetzige Bundeskanzlerin/der jetzige Bundeskanzler von Deutschland?",
                        "options": [
                                "Gerhard Schröder",
                                "Angela Merkel",
                                "Ursula von der Leyen",
                                "Friedrich Merz"
                        ],
                        "answer": "Angela Merkel"
                },
                {
                        "number": 73,
                        "question": "Die beiden größten Fraktionen im Deutschen Bundestag heißen zurzeit …",
                        "options": [
                                "CDU/CSU und AfD.",
                                "Die Linke und Bündnis 90/Die Grünen.",
                                "Bündnis 90/Die Grünen und SPD.",
                                "Die Linke und CDU/CSU."
                        ],
                        "answer": "CDU/CSU und AfD."
                },
                {
                        "number": 74,
                        "question": "Wie heißt das Parlament für ganz Deutschland?",
                        "options": [
                                "Bundesversammlung",
                                "Volkskammer",
                                "Bundestag",
                                "Bundesgerichtshof"
                        ],
                        "answer": "Bundestag"
                },
                {
                        "number": 75,
                        "question": "Wie heißt Deutschlands heutiges Staatsoberhaupt?",
                        "options": [
                                "Frank-Walter Steinmeier",
                                "Bärbel Bas",
                                "Bodo Ramelow",
                                "Joachim Gauck"
                        ],
                        "answer": "Frank-Walter Steinmeier"
                },
                {
                        "number": 76,
                        "question": "Was bedeutet die Abkürzung CDU in Deutschland?",
                        "options": [
                                "Christliche Deutsche Union",
                                "Club Deutscher Unternehmer",
                                "Christlicher Deutscher Umweltschutz",
                                "Christlich Demokratische Union"
                        ],
                        "answer": "Christlich Demokratische Union"
                },
                {
                        "number": 77,
                        "question": "Was ist die Bundeswehr?",
                        "options": [
                                "die deutsche Polizei",
                                "ein deutscher Hafen",
                                "eine deutsche Bürgerinitiative",
                                "die deutsche Armee"
                        ],
                        "answer": "die deutsche Armee"
                },
                {
                        "number": 78,
                        "question": "Was bedeutet die Abkürzung SPD?",
                        "options": [
                                "Sozialistische Partei Deutschlands",
                                "Sozialpolitische Partei Deutschlands",
                                "Sozialdemokratische Partei Deutschlands",
                                "Sozialgerechte Partei Deutschlands"
                        ],
                        "answer": "Sozialdemokratische Partei Deutschlands"
                },
                {
                        "number": 79,
                        "question": "Was bedeutet die Abkürzung FDP in Deutschland?",
                        "options": [
                                "Friedliche Demonstrative Partei",
                                "Freie Deutschland Partei",
                                "Führende Demokratische Partei",
                                "Freie Demokratische Partei"
                        ],
                        "answer": "Freie Demokratische Partei"
                },
                {
                        "number": 80,
                        "question": "Welches Gericht in Deutschland ist zuständig für die Auslegung des Grundgesetzes?",
                        "options": [
                                "Oberlandesgericht",
                                "Amtsgericht",
                                "Bundesverfassungsgericht",
                                "Verwaltungsgericht"
                        ],
                        "answer": "Bundesverfassungsgericht"
                },
                {
                        "number": 81,
                        "question": "Wer wählt die Bundeskanzlerin/den Bundeskanzler in Deutschland?",
                        "options": [
                                "der Bundesrat",
                                "die Bundesversammlung",
                                "das Volk",
                                "der Bundestag"
                        ],
                        "answer": "der Bundestag"
                },
                {
                        "number": 82,
                        "question": "Wer leitet das deutsche Bundeskabinett?",
                        "options": [
                                "die Bundestagspräsidentin/der Bundestagspräsident",
                                "die Bundespräsidentin/der Bundespräsident",
                                "die Bundesratspräsidentin/der Bundesratspräsident",
                                "die Bundeskanzlerin/der Bundeskanzler"
                        ],
                        "answer": "die Bundeskanzlerin/der Bundeskanzler"
                },
                {
                        "number": 83,
                        "question": "Wer wählt die deutsche Bundeskanzlerin/den deutschen Bundeskanzler?",
                        "options": [
                                "das Volk",
                                "die Bundesversammlung",
                                "der Bundestag",
                                "die Bundesregierung"
                        ],
                        "answer": "der Bundestag"
                },
                {
                        "number": 84,
                        "question": "Welche Hauptaufgabe hat die deutsche Bundespräsidentin/der deutsche Bundespräsident? Sie/Er …",
                        "options": [
                                "regiert das Land.",
                                "entwirft die Gesetze.",
                                "repräsentiert das Land.",
                                "überwacht die Einhaltung der Gesetze."
                        ],
                        "answer": "repräsentiert das Land."
                },
                {
                        "number": 85,
                        "question": "Wer bildet den deutschen Bundesrat?",
                        "options": [
                                "die Abgeordneten des Bundestages",
                                "die Ministerinnen und Minister der Bundesregierung",
                                "die Regierungsvertreter der Bundesländer",
                                "die Parteimitglieder"
                        ],
                        "answer": "die Regierungsvertreter der Bundesländer"
                },
                {
                        "number": 86,
                        "question": "Wer wählt in Deutschland die Bundespräsidentin/den Bundespräsidenten?",
                        "options": [
                                "die Bundesversammlung",
                                "der Bundesrat",
                                "das Bundesparlament",
                                "das Bundesverfassungsgericht"
                        ],
                        "answer": "die Bundesversammlung"
                },
                {
                        "number": 87,
                        "question": "Wer ist das Staatsoberhaupt der Bundesrepublik Deutschland?",
                        "options": [
                                "die Bundeskanzlerin/der Bundeskanzler",
                                "die Bundespräsidentin/der Bundespräsident",
                                "die Bundesratspräsidentin/der Bundesratspräsident",
                                "die Bundestagspräsidentin/der Bundestagspräsident"
                        ],
                        "answer": "die Bundespräsidentin/der Bundespräsident"
                },
                {
                        "number": 88,
                        "question": "Die parlamentarische Opposition im Deutschen Bundestag …",
                        "options": [
                                "kontrolliert die Regierung.",
                                "entscheidet, wer Bundesministerin/Bundesminister wird.",
                                "bestimmt, wer im Bundesrat sitzt.",
                                "schlägt die Regierungschefinnen/Regierungschefs der Länder vor."
                        ],
                        "answer": "kontrolliert die Regierung."
                },
                {
                        "number": 89,
                        "question": "Wie nennt man in Deutschland die Vereinigung von Abgeordneten einer Partei im Parlament?",
                        "options": [
                                "Verband",
                                "Ältestenrat",
                                "Fraktion",
                                "Opposition"
                        ],
                        "answer": "Fraktion"
                },
                {
                        "number": 90,
                        "question": "Die deutschen Bundesländer wirken an der Gesetzgebung des Bundes mit durch …",
                        "options": [
                                "den Bundesrat.",
                                "die Bundesversammlung.",
                                "den Bundestag.",
                                "die Bundesregierung."
                        ],
                        "answer": "den Bundesrat."
                },
                {
                        "number": 91,
                        "question": "In Deutschland kann ein Regierungswechsel in einem Bundesland Auswirkungen auf die Bundespolitik haben. Das Regieren wird …",
                        "options": [
                                "schwieriger, wenn sich dadurch die Mehrheit im Bundestag ändert.",
                                "leichter, wenn dadurch neue Parteien in den Bundesrat kommen.",
                                "schwieriger, wenn dadurch die Mehrheit im Bundesrat verändert wird.",
                                "leichter, wenn es sich um ein reiches Bundesland handelt."
                        ],
                        "answer": "schwieriger, wenn dadurch die Mehrheit im Bundesrat verändert wird."
                },
                {
                        "number": 92,
                        "question": "Was bedeutet die Abkürzung CSU in Deutschland?",
                        "options": [
                                "Christlich Sichere Union",
                                "Christlich Süddeutsche Union",
                                "Christlich Sozialer Unternehmerverband",
                                "Christlich Soziale Union"
                        ],
                        "answer": "Christlich Soziale Union"
                },
                {
                        "number": 93,
                        "question": "Je mehr \"Zweitstimmen\" eine Partei bei einer Bundestagswahl bekommt, desto …",
                        "options": [
                                "weniger Erststimmen kann sie haben.",
                                "mehr Direktkandidaten der Partei ziehen ins Parlament ein.",
                                "größer ist das Risiko, eine Koalition bilden zu müssen.",
                                "mehr Sitze erhält die Partei im Parlament."
                        ],
                        "answer": "mehr Sitze erhält die Partei im Parlament."
                },
                {
                        "number": 94,
                        "question": "Ab welchem Alter darf man in Deutschland an der Wahl zum Deutschen Bundestag teilnehmen?",
                        "options": [
                                "16",
                                "18",
                                "21",
                                "23"
                        ],
                        "answer": "18"
                },
                {
                        "number": 95,
                        "question": "Was gilt für die meisten Kinder in Deutschland?",
                        "options": [
                                "Wahlpflicht",
                                "Schulpflicht",
                                "Schweigepflicht",
                                "Religionspflicht"
                        ],
                        "answer": "Schulpflicht"
                },
                {
                        "number": 96,
                        "question": "Wie kann jemand, der den Holocaust leugnet, bestraft werden?",
                        "options": [
                                "Kürzung sozialer Leistungen",
                                "bis zu 100 Sozialstunden",
                                "gar nicht, Holocaustleugnung ist erlaubt",
                                "mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe"
                        ],
                        "answer": "mit Freiheitsstrafe bis zu fünf Jahren oder mit Geldstrafe"
                },
                {
                        "number": 97,
                        "question": "Was bezahlt man in Deutschland automatisch, wenn man fest angestellt ist?",
                        "options": [
                                "Sozialversicherung",
                                "Sozialhilfe",
                                "Kindergeld",
                                "Wohngeld"
                        ],
                        "answer": "Sozialversicherung"
                },
                {
                        "number": 98,
                        "question": "Wenn Abgeordnete im Deutschen Bundestag ihre Fraktion wechseln, …",
                        "options": [
                                "dürfen sie nicht mehr an den Sitzungen des Parlaments teilnehmen.",
                                "kann die Regierung ihre Mehrheit verlieren.",
                                "muss die Bundespräsidentin/der Bundespräsident zuvor ihr/sein Einverständnis geben.",
                                "dürfen die Wählerinnen/Wähler dieser Abgeordneten noch einmal wählen."
                        ],
                        "answer": "kann die Regierung ihre Mehrheit verlieren."
                },
                {
                        "number": 99,
                        "question": "Wer bezahlt in Deutschland die Sozialversicherungen?",
                        "options": [
                                "Arbeitgeberinnen/Arbeitgeber und Arbeitnehmerinnen/Arbeitnehmer",
                                "nur Arbeitnehmerinnen/Arbeitnehmer",
                                "alle Staatsangehörigen",
                                "nur Arbeitgeberinnen/Arbeitgeber"
                        ],
                        "answer": "Arbeitgeberinnen/Arbeitgeber und Arbeitnehmerinnen/Arbeitnehmer"
                },
                {
                        "number": 100,
                        "question": "Was gehört nicht zur gesetzlichen Sozialversicherung?",
                        "options": [
                                "die Lebensversicherung",
                                "die gesetzliche Rentenversicherung",
                                "die Arbeitslosenversicherung",
                                "die Pflegeversicherung"
                        ],
                        "answer": "die Lebensversicherung"
                },
                {
                        "number": 101,
                        "question": "Gewerkschaften sind Interessenverbände der …",
                        "options": [
                                "Jugendlichen.",
                                "Arbeitnehmerinnen und Arbeitnehmer.",
                                "Rentnerinnen und Rentner.",
                                "Arbeitgeberinnen und Arbeitgeber."
                        ],
                        "answer": "Arbeitnehmerinnen und Arbeitnehmer."
                },
                {
                        "number": 102,
                        "question": "Womit kann man in der Bundesrepublik Deutschland geehrt werden, wenn man auf politischem, wirtschaftlichem, kulturellem, geistigem oder sozialem Gebiet eine besondere Leistung erbracht hat? Mit dem …",
                        "options": [
                                "Bundesverdienstkreuz",
                                "Bundesadler",
                                "Vaterländischen Verdienstorden",
                                "Ehrentitel 'Held der Deutschen Demokratischen Republik'"
                        ],
                        "answer": "Bundesverdienstkreuz"
                },
                {
                        "number": 103,
                        "question": "Was wird in Deutschland als 'Ampelkoalition' bezeichnet? Die Zusammenarbeit …",
                        "options": [
                                "der Bundestagsfraktionen von CDU und CSU",
                                "von SPD, FDP und Bündnis 90/Die Grünen in einer Regierung",
                                "von CSU, Die LINKE und Bündnis 90/Die Grünen in einer Regierung",
                                "der Bundestagsfraktionen von CDU und SPD"
                        ],
                        "answer": "von SPD, FDP und Bündnis 90/Die Grünen in einer Regierung"
                },
                {
                        "number": 104,
                        "question": "Eine Frau in Deutschland verliert ihre Arbeit. Was darf nicht der Grund für diese Entlassung sein?",
                        "options": [
                                "Die Frau ist lange krank und arbeitsunfähig.",
                                "Die Frau kam oft zu spät zur Arbeit.",
                                "Die Frau erledigt private Sachen während der Arbeitszeit.",
                                "Die Frau bekommt ein Kind und ihr Chef weiß das."
                        ],
                        "answer": "Die Frau bekommt ein Kind und ihr Chef weiß das."
                },
                {
                        "number": 105,
                        "question": "Was ist eine Aufgabe von Wahlhelferinnen/Wahlhelfern in Deutschland?",
                        "options": [
                                "Sie helfen alten Menschen bei der Stimmabgabe in der Wahlkabine.",
                                "Sie schreiben die Wahlbenachrichtigungen vor der Wahl.",
                                "Sie geben Zwischenergebnisse an die Medien weiter.",
                                "Sie zählen die Stimmen nach dem Ende der Wahl."
                        ],
                        "answer": "Sie zählen die Stimmen nach dem Ende der Wahl."
                },
                {
                        "number": 106,
                        "question": "In Deutschland helfen ehrenamtliche Wahlhelferinnen und Wahlhelfer bei den Wahlen. Was ist eine Aufgabe von Wahlhelferinnen/Wahlhelfern?",
                        "options": [
                                "Sie helfen Kindern und alten Menschen beim Wählen.",
                                "Sie schreiben Karten und Briefe mit der Angabe des Wahllokals.",
                                "Sie geben Zwischenergebnisse an Journalisten weiter.",
                                "Sie zählen die Stimmen nach dem Ende der Wahl."
                        ],
                        "answer": "Sie zählen die Stimmen nach dem Ende der Wahl."
                },
                {
                        "number": 107,
                        "question": "Für wie viele Jahre wird der Bundestag in Deutschland gewählt?",
                        "options": [
                                "2 Jahre",
                                "4 Jahre",
                                "6 Jahre",
                                "8 Jahre"
                        ],
                        "answer": "4 Jahre"
                },
                {
                        "number": 108,
                        "question": "Bei einer Bundestagswahl in Deutschland darf jede/jeder wählen, die/der …",
                        "options": [
                                "in der Bundesrepublik Deutschland wohnt und wählen möchte.",
                                "Bürgerin/Bürger der Bundesrepublik Deutschland ist und mindestens 18 Jahre alt ist.",
                                "seit mindestens 3 Jahren in der Bundesrepublik Deutschland lebt.",
                                "Bürgerin/Bürger der Bundesrepublik Deutschland ist und mindestens 21 Jahre alt ist."
                        ],
                        "answer": "Bürgerin/Bürger der Bundesrepublik Deutschland ist und mindestens 18 Jahre alt ist."
                },
                {
                        "number": 109,
                        "question": "Wie oft gibt es normalerweise Bundestagswahlen in Deutschland?",
                        "options": [
                                "alle drei Jahre",
                                "alle vier Jahre",
                                "alle fünf Jahre",
                                "alle sechs Jahre"
                        ],
                        "answer": "alle vier Jahre"
                },
                {
                        "number": 110,
                        "question": "Für wie viele Jahre wird der Bundestag in Deutschland gewählt?",
                        "options": [
                                "2 Jahre",
                                "3 Jahre",
                                "4 Jahre",
                                "5 Jahre"
                        ],
                        "answer": "4 Jahre"
                },
                {
                        "number": 111,
                        "question": "Welche Handlungen mit Bezug auf den Staat Israel sind in Deutschland verboten?",
                        "options": [
                                "die Politik Israels öffentlich kritisieren",
                                "das Aufhängen einer israelischen Flagge auf dem Privatgrundstück",
                                "eine Diskussion über die Politik Israels",
                                "der öffentliche Aufruf zur Vernichtung Israels"
                        ],
                        "answer": "der öffentliche Aufruf zur Vernichtung Israels"
                },
                {
                        "number": 112,
                        "question": "Die Wahlen in Deutschland sind …",
                        "options": [
                                "speziell.",
                                "geheim.",
                                "berufsbezogen.",
                                "geschlechtsabhängig."
                        ],
                        "answer": "geheim."
                },
                {
                        "number": 113,
                        "question": "Wahlen in Deutschland gewinnt die Partei, die …",
                        "options": [
                                "die meisten Stimmen bekommt.",
                                "die meisten Männer mehrheitlich gewählt haben.",
                                "die meisten Stimmen bei den Arbeiterinnen/Arbeitern bekommen hat.",
                                "die meisten Erststimmen für ihre Kanzlerkandidatin/ihren Kanzlerkandidaten erhalten hat."
                        ],
                        "answer": "die meisten Stimmen bekommt."
                },
                {
                        "number": 114,
                        "question": "An demokratischen Wahlen in Deutschland teilzunehmen ist …",
                        "options": [
                                "eine Pflicht.",
                                "ein Recht.",
                                "ein Zwang.",
                                "eine Last."
                        ],
                        "answer": "ein Recht."
                },
                {
                        "number": 115,
                        "question": "Was bedeutet 'aktives Wahlrecht' in Deutschland?",
                        "options": [
                                "Man kann gewählt werden.",
                                "Man muss wählen gehen.",
                                "Man kann wählen.",
                                "Man muss zur Auszählung der Stimmen gehen."
                        ],
                        "answer": "Man kann wählen."
                },
                {
                        "number": 116,
                        "question": "Wenn Sie bei einer Bundestagswahl in Deutschland wählen dürfen, heißt das …",
                        "options": [
                                "aktive Wahlkampagne.",
                                "aktives Wahlverfahren.",
                                "aktiver Wahlkampf.",
                                "aktives Wahlrecht."
                        ],
                        "answer": "aktives Wahlrecht."
                },
                {
                        "number": 117,
                        "question": "Wie viel Prozent der Zweitstimmen müssen Parteien mindestens bekommen, um in den Deutschen Bundestag gewählt zu werden?",
                        "options": [
                                "3%",
                                "4%",
                                "5%",
                                "6%"
                        ],
                        "answer": "5%"
                },
                {
                        "number": 118,
                        "question": "Wer darf bei den rund 40 jüdischen Makkabi-Sportvereinen Mitglied werden?",
                        "options": [
                                "nur Deutsche",
                                "nur Israelis",
                                "nur religiöse Menschen",
                                "alle Menschen"
                        ],
                        "answer": "alle Menschen"
                },
                {
                        "number": 119,
                        "question": "Wahlen in Deutschland sind frei. Was bedeutet das?",
                        "options": [
                                "Alle verurteilten Straftäterinnen/Straftäter dürfen nicht wählen.",
                                "Wenn ich wählen gehen möchte, muss meine Arbeitgeberin/mein Arbeitgeber mir frei geben.",
                                "Jede Person kann ohne Zwang entscheiden, ob sie wählen möchte und wen sie wählen möchte.",
                                "Ich kann frei entscheiden, wo ich wählen gehen möchte."
                        ],
                        "answer": "Jede Person kann ohne Zwang entscheiden, ob sie wählen möchte und wen sie wählen möchte."
                },
                {
                        "number": 120,
                        "question": "Das Wahlsystem in Deutschland ist ein …",
                        "options": [
                                "Zensuswahlrecht.",
                                "Dreiklassenwahlrecht.",
                                "Mehrheits- und Verhältniswahlrecht.",
                                "allgemeines Männerwahlrecht."
                        ],
                        "answer": "Mehrheits- und Verhältniswahlrecht."
                },
                {
                        "number": 121,
                        "question": "Eine Partei möchte in den Deutschen Bundestag. Sie muss aber einen Mindestanteil an Wählerstimmen haben. Das heißt …",
                        "options": [
                                "5%-Hürde.",
                                "Zulassungsgrenze.",
                                "Basiswert.",
                                "Richtlinie."
                        ],
                        "answer": "5%-Hürde."
                },
                {
                        "number": 122,
                        "question": "Welchem Grundsatz unterliegen Wahlen in Deutschland? Wahlen in Deutschland sind …",
                        "options": [
                                "frei, gleich, geheim.",
                                "offen, sicher, frei.",
                                "geschlossen, gleich, sicher.",
                                "sicher, offen, freiwillig."
                        ],
                        "answer": "frei, gleich, geheim."
                },
                {
                        "number": 123,
                        "question": "Was ist in Deutschland die '5%-Hürde'?",
                        "options": [
                                "Abstimmungsregelung im Bundestag für kleine Parteien",
                                "Anwesenheitskontrolle im Bundestag für Abstimmungen",
                                "Mindestanteil an Wählerstimmen, um ins Parlament zu kommen",
                                "Anwesenheitskontrolle im Bundesrat für Abstimmungen"
                        ],
                        "answer": "Mindestanteil an Wählerstimmen, um ins Parlament zu kommen"
                },
                {
                        "number": 124,
                        "question": "Die Bundestagswahl in Deutschland ist die Wahl …",
                        "options": [
                                "der Bundeskanzlerin/des Bundeskanzlers.",
                                "der Parlamente der Länder.",
                                "des Parlaments für Deutschland.",
                                "der Bundespräsidentin/des Bundespräsidenten."
                        ],
                        "answer": "des Parlaments für Deutschland."
                },
                {
                        "number": 125,
                        "question": "In einer Demokratie ist eine Funktion von regelmäßigen Wahlen, …",
                        "options": [
                                "die Bürgerinnen und Bürger zu zwingen, ihre Stimme abzugeben.",
                                "nach dem Willen der Wählermehrheit den Wechsel der Regierung zu ermöglichen.",
                                "im Land bestehende Gesetze beizubehalten.",
                                "den Armen mehr Macht zu geben."
                        ],
                        "answer": "nach dem Willen der Wählermehrheit den Wechsel der Regierung zu ermöglichen."
                },
                {
                        "number": 126,
                        "question": "Was bekommen wahlberechtigte Bürgerinnen und Bürger in Deutschland vor einer Wahl?",
                        "options": [
                                "eine Wahlbenachrichtigung von der Gemeinde",
                                "eine Wahlerlaubnis von der Bundespräsidentin/von dem Bundespräsidenten",
                                "eine Benachrichtigung von der Bundesversammlung",
                                "eine Benachrichtigung vom Pfarramt"
                        ],
                        "answer": "eine Wahlbenachrichtigung von der Gemeinde"
                },
                {
                        "number": 127,
                        "question": "Warum gibt es die 5%-Hürde im Wahlgesetz der Bundesrepublik Deutschland? Es gibt sie, weil …",
                        "options": [
                                "die Programme von vielen kleinen Parteien viele Gemeinsamkeiten haben.",
                                "die Bürgerinnen und Bürger bei vielen kleinen Parteien die Orientierung verlieren können.",
                                "viele kleine Parteien die Regierungsbildung erschweren.",
                                "die kleinen Parteien nicht so viel Geld haben, um die Politikerinnen und Politiker zu bezahlen."
                        ],
                        "answer": "viele kleine Parteien die Regierungsbildung erschweren."
                },
                {
                        "number": 128,
                        "question": "Parlamentsmitglieder, die von den Bürgerinnen und Bürgern gewählt werden, nennt man …",
                        "options": [
                                "Abgeordnete.",
                                "Kanzlerinnen/Kanzler.",
                                "Botschafterinnen/Botschafter.",
                                "Ministerpräsidentinnen/Ministerpräsidenten."
                        ],
                        "answer": "Abgeordnete."
                },
                {
                        "number": 129,
                        "question": "Vom Volk gewählt wird in Deutschland …",
                        "options": [
                                "die Bundeskanzlerin/der Bundeskanzler.",
                                "die Ministerpräsidentin/der Ministerpräsident eines Bundeslandes.",
                                "der Bundestag.",
                                "die Bundespräsidentin/der Bundespräsident."
                        ],
                        "answer": "der Bundestag."
                },
                {
                        "number": 130,
                        "question": "Welcher Stimmzettel wäre bei einer Bundestagswahl gültig? In Anlehnung an Bundeswahlordnung (BWO), Anlage 26",
                        "options": [
                                "1",
                                "2",
                                "3",
                                "4"
                        ],
                        "answer": "2"
                },
                {
                        "number": 131,
                        "question": "In Deutschland ist eine Bürgermeisterin/ein Bürgermeister …",
                        "options": [
                                "die Leiterin/der Leiter einer Schule.",
                                "die Chefin/der Chef einer Bank.",
                                "das Oberhaupt einer Gemeinde.",
                                "die/der Vorsitzende einer Partei."
                        ],
                        "answer": "das Oberhaupt einer Gemeinde."
                },
                {
                        "number": 132,
                        "question": "Viele Menschen in Deutschland arbeiten in ihrer Freizeit ehrenamtlich. Was bedeutet das?",
                        "options": [
                                "Sie arbeiten als Soldatinnen/Soldaten.",
                                "Sie arbeiten freiwillig und unbezahlt in Vereinen und Verbänden.",
                                "Sie arbeiten in der Bundesregierung.",
                                "Sie arbeiten in einem Krankenhaus und verdienen dabei Geld."
                        ],
                        "answer": "Sie arbeiten freiwillig und unbezahlt in Vereinen und Verbänden."
                },
                {
                        "number": 133,
                        "question": "Was ist bei Bundestags- und Landtagswahlen in Deutschland erlaubt?",
                        "options": [
                                "Der Ehemann wählt für seine Frau mit.",
                                "Man kann durch Briefwahl seine Stimme abgeben.",
                                "Man kann am Wahltag telefonisch seine Stimme abgeben.",
                                "Kinder ab dem Alter von 14 Jahren dürfen wählen."
                        ],
                        "answer": "Man kann durch Briefwahl seine Stimme abgeben."
                },
                {
                        "number": 134,
                        "question": "Man will die Buslinie abschaffen, mit der Sie immer zur Arbeit fahren. Was können Sie machen, um die Buslinie zu erhalten?",
                        "options": [
                                "Ich beteilige mich an einer Bürgerinitiative für die Erhaltung der Buslinie oder gründe selber eine Initiative.",
                                "Ich werde Mitglied in einem Sportverein und trainiere Radfahren.",
                                "Ich wende mich an das Finanzamt, weil ich als Steuerzahlerin/Steuerzahler ein Recht auf die Buslinie habe.",
                                "Ich schreibe einen Brief an das Forstamt der Gemeinde."
                        ],
                        "answer": "Ich beteilige mich an einer Bürgerinitiative für die Erhaltung der Buslinie oder gründe selber eine Initiative."
                },
                {
                        "number": 135,
                        "question": "Wen vertreten die Gewerkschaften in Deutschland?",
                        "options": [
                                "große Unternehmen",
                                "kleine Unternehmen",
                                "Selbstständige",
                                "Arbeitnehmerinnen und Arbeitnehmer"
                        ],
                        "answer": "Arbeitnehmerinnen und Arbeitnehmer"
                },
                {
                        "number": 136,
                        "question": "Sie gehen in Deutschland zum Arbeitsgericht bei …",
                        "options": [
                                "falscher Nebenkostenabrechnung.",
                                "ungerechtfertigter Kündigung durch Ihre Chefin/Ihren Chef.",
                                "Problemen mit den Nachbarinnen/Nachbarn.",
                                "Schwierigkeiten nach einem Verkehrsunfall."
                        ],
                        "answer": "ungerechtfertigter Kündigung durch Ihre Chefin/Ihren Chef."
                },
                {
                        "number": 137,
                        "question": "Welches Gericht ist in Deutschland bei Konflikten in der Arbeitswelt zuständig?",
                        "options": [
                                "das Familiengericht",
                                "das Strafgericht",
                                "das Arbeitsgericht",
                                "das Amtsgericht"
                        ],
                        "answer": "das Arbeitsgericht"
                },
                {
                        "number": 138,
                        "question": "Was kann ich in Deutschland machen, wenn mir meine Arbeitgeberin/mein Arbeitgeber zu Unrecht gekündigt hat?",
                        "options": [
                                "weiterarbeiten und freundlich zur Chefin/zum Chef sein",
                                "ein Mahnverfahren gegen die Arbeitgeberin/den Arbeitgeber führen",
                                "Kündigungsschutzklage erheben",
                                "die Arbeitgeberin/den Arbeitgeber bei der Polizei anzeigen"
                        ],
                        "answer": "Kündigungsschutzklage erheben"
                },
                {
                        "number": 139,
                        "question": "Wann kommt es in Deutschland zu einem Prozess vor Gericht? Wenn jemand …",
                        "options": [
                                "zu einer anderen Religion übertritt.",
                                "eine Straftat begangen hat und angeklagt wird.",
                                "eine andere Meinung als die der Regierung vertritt.",
                                "sein Auto falsch geparkt hat und es abgeschleppt wird."
                        ],
                        "answer": "eine Straftat begangen hat und angeklagt wird."
                },
                {
                        "number": 140,
                        "question": "Was macht eine Schöffin/ein Schöffe in Deutschland? Sie/Er …",
                        "options": [
                                "entscheidet mit Richterinnen/Richtern über Schuld und Strafe.",
                                "gibt Bürgerinnen/Bürgern rechtlichen Rat.",
                                "stellt Urkunden aus.",
                                "verteidigt die Angeklagte/den Angeklagten."
                        ],
                        "answer": "entscheidet mit Richterinnen/Richtern über Schuld und Strafe."
                },
                {
                        "number": 141,
                        "question": "Was kann ein Gericht in Deutschland entscheiden?",
                        "options": [
                                "nur, ob jemand unschuldig ist",
                                "nur, ob jemand schuldig ist",
                                "ob eine Person schuldig oder unschuldig ist und welche Strafe verhängt wird",
                                "nur, wie hoch eine Geldstrafe ist"
                        ],
                        "answer": "ob eine Person schuldig oder unschuldig ist und welche Strafe verhängt wird"
                },
                {
                        "number": 142,
                        "question": "Welche Strafen können in Deutschland vor Gericht verhängt werden?",
                        "options": [
                                "nur Geldstrafen",
                                "nur Freiheitsstrafen",
                                "Geldstrafen und Freiheitsstrafen",
                                "nur Gemeindearbeit"
                        ],
                        "answer": "Geldstrafen und Freiheitsstrafen"
                },
                {
                        "number": 143,
                        "question": "In Deutschland entscheidet das Gericht über …",
                        "options": [
                                "alle Strafverfahren.",
                                "den Ausgang jeder Wahl.",
                                "die Höhe der Steuern.",
                                "das Einkommen von Politikern."
                        ],
                        "answer": "alle Strafverfahren."
                },
                {
                        "number": 144,
                        "question": "In welchem Land können sich Menschen gegen den Staat im Rahmen einer Klage wehren?",
                        "options": [
                                "In einem demokratischen Land wie Deutschland.",
                                "In Ländern mit einer starken Regierung.",
                                "In Ländern ohne Pressefreiheit.",
                                "In autoritären Staaten."
                        ],
                        "answer": "In einem demokratischen Land wie Deutschland."
                },
                {
                        "number": 145,
                        "question": "Wer entscheidet, ob ein Gesetz verfassungswidrig ist?",
                        "options": [
                                "Der Bundestag",
                                "Das Bundesverfassungsgericht",
                                "Die Bundesregierung",
                                "Der Bundesrat"
                        ],
                        "answer": "Das Bundesverfassungsgericht"
                },
                {
                        "number": 146,
                        "question": "Das Bundesverfassungsgericht kann …",
                        "options": [
                                "Gesetze ändern.",
                                "Gesetze für verfassungswidrig erklären.",
                                "Gesetze erlassen.",
                                "Regierungen wählen."
                        ],
                        "answer": "Gesetze für verfassungswidrig erklären."
                },
                {
                        "number": 147,
                        "question": "Welches Gericht in Deutschland ist für Verfassungsfragen zuständig?",
                        "options": [
                                "Der Bundesgerichtshof",
                                "Das Bundesverfassungsgericht",
                                "Das Landgericht",
                                "Das Arbeitsgericht"
                        ],
                        "answer": "Das Bundesverfassungsgericht"
                },
                {
                        "number": 148,
                        "question": "In Deutschland ist der Bundespräsident die/der …",
                        "options": [
                                "Vertreterin/Vertreter des Volkes.",
                                "oberste Regierungsbehörde.",
                                "oberste Richterschaft des Landes.",
                                "Repräsentantin/Repräsentant der Bundesregierung."
                        ],
                        "answer": "Vertreterin/Vertreter des Volkes."
                },
                {
                        "number": 149,
                        "question": "Das Bundesverfassungsgericht ist in Deutschland dafür zuständig, …",
                        "options": [
                                "Gesetze zu erlassen.",
                                "Gesetze zu überprüfen.",
                                "Regierungen zu wählen.",
                                "Bundespräsidenten zu wählen."
                        ],
                        "answer": "Gesetze zu überprüfen."
                },
                {
                        "number": 150,
                        "question": "Das Grundgesetz für die Bundesrepublik Deutschland legt fest, dass …",
                        "options": [
                                "alle Menschen in Deutschland gleiche Rechte haben.",
                                "nur Deutsche bestimmte Rechte haben.",
                                "die Menschenrechte nicht gelten.",
                                "der Präsident des Bundes eine absolute Macht hat."
                        ],
                        "answer": "alle Menschen in Deutschland gleiche Rechte haben."
                },
                {
                        "number": 151,
                        "question": "Welches Recht schützt das Grundgesetz für die Bundesrepublik Deutschland?",
                        "options": [
                                "Das Recht, die Wohnung jederzeit zu betreten.",
                                "Das Recht auf Arbeit.",
                                "Das Recht auf Bildung.",
                                "Das Recht auf freie Meinungsäußerung."
                        ],
                        "answer": "Das Recht auf freie Meinungsäußerung."
                },
                {
                        "number": 152,
                        "question": "Die Bundesrepublik Deutschland ist ein Land mit …",
                        "options": [
                                "einer zentralisierten Regierung.",
                                "einem föderalen System.",
                                "einer Monarchie.",
                                "einem Einparteienstaat."
                        ],
                        "answer": "einem föderalen System."
                },
                {
                        "number": 153,
                        "question": "Wie viele Bundesländer hat Deutschland?",
                        "options": [
                                "16",
                                "13",
                                "14",
                                "12"
                        ],
                        "answer": "16"
                },
                {
                        "number": 154,
                        "question": "In welchem Jahr wurde die Bundesrepublik Deutschland gegründet?",
                        "options": [
                                "1949",
                                "1950",
                                "1961",
                                "1989"
                        ],
                        "answer": "1949"
                },
                {
                        "number": 155,
                        "question": "Welche Funktion hat der Bundesrat in Deutschland?",
                        "options": [
                                "Er entscheidet über die Verfassung.",
                                "Er vertritt die Länder und muss Gesetzen zustimmen.",
                                "Er überprüft die Wahl des Bundeskanzlers.",
                                "Er spricht im Namen der Bundesregierung."
                        ],
                        "answer": "Er vertritt die Länder und muss Gesetzen zustimmen."
                },
                {
                        "number": 156,
                        "question": "Welches Amt wird in Deutschland vom Bundespräsidenten ausgeübt?",
                        "options": [
                                "Die Oberste Regierungsmacht.",
                                "Das Staatsoberhaupt.",
                                "Die Kanzlerschaft.",
                                "Die Kontrolle über das Parlament."
                        ],
                        "answer": "Das Staatsoberhaupt."
                },
                {
                        "number": 157,
                        "question": "Was ist die Aufgabe der Bundeskanzlerin/des Bundeskanzlers in Deutschland?",
                        "options": [
                                "Er/Sie ist der/die Vorsitzende des Bundesrats.",
                                "Er/Sie leitet die Regierung und bestimmt die Politik.",
                                "Er/Sie vertritt den Bundestag.",
                                "Er/Sie entscheidet über das Einkommen der Minister."
                        ],
                        "answer": "Er/Sie leitet die Regierung und bestimmt die Politik."
                },
                {
                        "number": 158,
                        "question": "Was ist die Regierung der Bundesrepublik Deutschland?",
                        "options": [
                                "Der Bundestag.",
                                "Der Bundesrat.",
                                "Der Bundeskanzler mit den Ministerinnen und Ministern.",
                                "Der Bundespräsident."
                        ],
                        "answer": "Der Bundeskanzler mit den Ministerinnen und Ministern."
                },
                {
                        "number": 159,
                        "question": "Das Grundgesetz für die Bundesrepublik Deutschland ist die Verfassung, die …",
                        "options": [
                                "alle Bürgerinnen und Bürger zu politischen Aktionen aufruft.",
                                "die Rechte und Pflichten der Regierung und des Volkes regelt.",
                                "die Bundeskanzlerin auf ihren Posten setzt.",
                                "den Bundespräsidenten ernennt."
                        ],
                        "answer": "die Rechte und Pflichten der Regierung und des Volkes regelt."
                },
                {
                        "number": 160,
                        "question": "Die Bundesländer in Deutschland haben eigene Gesetze, die …",
                        "options": [
                                "mit den Bundesgesetzen übereinstimmen müssen.",
                                "die Bundesgesetze ersetzen.",
                                "den Bundeskanzler kontrollieren.",
                                "die Rechte der Bürgerinnen und Bürger einschränken."
                        ],
                        "answer": "mit den Bundesgesetzen übereinstimmen müssen."
                },
                {
                        "number": 161,
                        "question": "Was ist das „Dritte Reich“?",
                        "options": [
                                "Ein demokratischer Staat.",
                                "Eine Monarchie.",
                                "Eine Diktatur.",
                                "Eine Räterepublik."
                        ],
                        "answer": "Eine Diktatur."
                },
                {
                        "number": 162,
                        "question": "Claus Schenk Graf von Stauffenberg wurde bekannt durch …",
                        "options": [
                                "eine Goldmedaille bei den Olympischen Spielen 1936.",
                                "den Bau des Reichstagsgebäudes.",
                                "den Aufbau der Wehrmacht.",
                                "das Attentat auf Hitler am 20. Juli 1944."
                        ],
                        "answer": "das Attentat auf Hitler am 20. Juli 1944."
                },
                {
                        "number": 163,
                        "question": "In welchem Jahr zerstörten die Nationalsozialisten Synagogen und jüdische Geschäfte in Deutschland?",
                        "options": [
                                "1925",
                                "1930",
                                "1938",
                                "1945"
                        ],
                        "answer": "1938"
                },
                {
                        "number": 164,
                        "question": "Was passierte am 9. November 1938 in Deutschland?",
                        "options": [
                                "Mit dem Angriff auf Polen beginnt der Zweite Weltkrieg.",
                                "Die Nationalsozialisten verlieren eine Wahl und lösen den Reichstag auf.",
                                "Jüdische Geschäfte und Synagogen werden durch Nationalsozialisten und ihre Anhänger zerstört.",
                                "Hitler wird Reichspräsident und lässt alle Parteien verbieten."
                        ],
                        "answer": "Jüdische Geschäfte und Synagogen werden durch Nationalsozialisten und ihre Anhänger zerstört."
                },
                {
                        "number": 165,
                        "question": "Wie hieß der erste Bundeskanzler der Bundesrepublik Deutschland?",
                        "options": [
                                "Konrad Adenauer",
                                "Kurt Georg Kiesinger",
                                "Helmut Schmidt",
                                "Willy Brandt"
                        ],
                        "answer": "Konrad Adenauer"
                },
                {
                        "number": 166,
                        "question": "Bei welchen Demonstrationen in Deutschland riefen die Menschen 'Wir sind das Volk'?",
                        "options": [
                                "beim Arbeiteraufstand 1953 in der DDR",
                                "bei den Demonstrationen 1968 in der Bundesrepublik Deutschland",
                                "bei den Anti-Atomkraft-Demonstrationen 1985 in der Bundesrepublik Deutschland",
                                "bei den Montagsdemonstrationen 1989 in der DDR"
                        ],
                        "answer": "bei den Montagsdemonstrationen 1989 in der DDR"
                },
                {
                        "number": 167,
                        "question": "Welche Länder wurden nach dem Zweiten Weltkrieg in Deutschland als 'Alliierte Besatzungsmächte' bezeichnet?",
                        "options": [
                                "Sowjetunion, Großbritannien, Polen, Schweden",
                                "Frankreich, Sowjetunion, Italien, Japan",
                                "USA, Sowjetunion, Spanien, Portugal",
                                "USA, Sowjetunion, Großbritannien, Frankreich"
                        ],
                        "answer": "USA, Sowjetunion, Großbritannien, Frankreich"
                },
                {
                        "number": 168,
                        "question": "Welches Land war keine 'Alliierte Besatzungsmacht' in Deutschland?",
                        "options": [
                                "USA",
                                "Sowjetunion",
                                "Frankreich",
                                "Japan"
                        ],
                        "answer": "Japan"
                },
                {
                        "number": 169,
                        "question": "Wann wurde die Bundesrepublik Deutschland gegründet?",
                        "options": [
                                "1939",
                                "1945",
                                "1949",
                                "1951"
                        ],
                        "answer": "1949"
                },
                {
                        "number": 170,
                        "question": "Was gab es während der Zeit des Nationalsozialismus in Deutschland?",
                        "options": [
                                "das Verbot von Parteien",
                                "das Recht zur freien",
                                "die Gleichberechtigung aller Bürger",
                                "freie und geheime Wahlen"
                        ],
                        "answer": "das Verbot von Parteien"
                },
                {
                        "number": 171,
                        "question": "Was war die „Weimarer Republik“ in Deutschland?",
                        "options": [
                                "Die erste deutsche Demokratie (1919–1933)",
                                "Die Regierung nach dem Zweiten Weltkrieg",
                                "Eine Monarchie im 19. Jahrhundert",
                                "Die Regierung der DDR"
                        ],
                        "answer": "Die erste deutsche Demokratie (1919–1933)"
                },
                {
                        "number": 172,
                        "question": "Welches Symbol steht für die Einheit Deutschlands?",
                        "options": [
                                "Der Reichstag",
                                "Der Brandenburger Tor",
                                "Der Bundesadler",
                                "Die Nationalflagge"
                        ],
                        "answer": "Der Brandenburger Tor"
                },
                {
                        "number": 173,
                        "question": "Was war die „Mauer“ in Berlin?",
                        "options": [
                                "Eine Schutzmauer gegen Überschwemmungen",
                                "Eine Trennmauer zwischen Ost- und Westberlin",
                                "Eine historische Stadtmauer aus dem Mittelalter",
                                "Eine Mauer zum Schutz des Regierungsviertels"
                        ],
                        "answer": "Eine Trennmauer zwischen Ost- und Westberlin"
                },
                {
                        "number": 174,
                        "question": "Wann wurde die Berliner Mauer geöffnet?",
                        "options": [
                                "1987",
                                "1989",
                                "1991",
                                "1993"
                        ],
                        "answer": "1989"
                },
                {
                        "number": 175,
                        "question": "Was war die 'Stasi' in der DDR?",
                        "options": [
                                "Ein Geheimdienst",
                                "Eine politische Partei",
                                "Eine Bürgerbewegung",
                                "Eine Sportorganisation"
                        ],
                        "answer": "Ein Geheimdienst"
                },
                {
                        "number": 176,
                        "question": "Welches Ereignis markiert die Wiedervereinigung Deutschlands?",
                        "options": [
                                "Der Fall der Berliner Mauer 1989",
                                "Die Unterzeichnung des Grundgesetzes 1949",
                                "Die Gründung der DDR 1949",
                                "Die Kapitulation Deutschlands 1945"
                        ],
                        "answer": "Der Fall der Berliner Mauer 1989"
                },
                {
                        "number": 177,
                        "question": "Wann wurde die Deutsche Demokratische Republik (DDR) gegründet?",
                        "options": [
                                "1945",
                                "1949",
                                "1953",
                                "1961"
                        ],
                        "answer": "1949"
                },
                {
                        "number": 178,
                        "question": "Was war die Hauptaufgabe der Volkskammer in der DDR?",
                        "options": [
                                "Sie war das Parlament der DDR.",
                                "Sie war die oberste Gerichtsbehörde.",
                                "Sie war eine Wirtschaftsorganisation.",
                                "Sie war eine Bürgerinitiative."
                        ],
                        "answer": "Sie war das Parlament der DDR."
                },
                {
                        "number": 179,
                        "question": "Wer war der erste Bundespräsident der Bundesrepublik Deutschland?",
                        "options": [
                                "Theodor Heuss",
                                "Konrad Adenauer",
                                "Heinrich Lübke",
                                "Willy Brandt"
                        ],
                        "answer": "Theodor Heuss"
                },
                {
                        "number": 180,
                        "question": "Welches Land war nach dem Zweiten Weltkrieg keine Besatzungszone in Deutschland?",
                        "options": [
                                "USA",
                                "Sowjetunion",
                                "Großbritannien",
                                "Italien"
                        ],
                        "answer": "Italien"
                },
                {
                        "number": 181,
                        "question": "Was bedeutet der Begriff 'Wirtschaftswunder' in der Geschichte der Bundesrepublik Deutschland?",
                        "options": [
                                "Der schnelle wirtschaftliche Aufschwung nach dem Zweiten Weltkrieg",
                                "Die Wiedervereinigung 1990",
                                "Der Bau der Berliner Mauer",
                                "Die Einführung des Euro"
                        ],
                        "answer": "Der schnelle wirtschaftliche Aufschwung nach dem Zweiten Weltkrieg"
                },
                {
                        "number": 182,
                        "question": "Welche Währung wurde in der Bundesrepublik Deutschland vor dem Euro verwendet?",
                        "options": [
                                "Reichsmark",
                                "Deutsche Mark",
                                "Gulden",
                                "Schilling"
                        ],
                        "answer": "Deutsche Mark"
                },
                {
                        "number": 183,
                        "question": "Was war die 'Montagsdemonstration' in der DDR?",
                        "options": [
                                "Eine wöchentliche Sportveranstaltung",
                                "Eine friedliche Protestbewegung gegen das Regime",
                                "Eine wöchentliche Sitzung der Volkskammer",
                                "Eine Handelsmesse"
                        ],
                        "answer": "Eine friedliche Protestbewegung gegen das Regime"
                },
                {
                        "number": 184,
                        "question": "Welches Datum markiert die offizielle Wiedervereinigung Deutschlands?",
                        "options": [
                                "3. Oktober 1990",
                                "9. November 1989",
                                "23. Mai 1949",
                                "7. Oktober 1949"
                        ],
                        "answer": "3. Oktober 1990"
                },
                {
                        "number": 185,
                        "question": "Welche Partei dominierte die Politik in der DDR?",
                        "options": [
                                "CDU",
                                "SPD",
                                "SED",
                                "FDP"
                        ],
                        "answer": "SED"
                },
                {
                        "number": 186,
                        "question": "Was bedeutet die Abkürzung SED?",
                        "options": [
                                "Soziale Einheit Deutschlands",
                                "Sozialistische Einheitspartei Deutschlands",
                                "Sozialdemokratische Einheit Deutschlands",
                                "Staatliche Einheitspartei Deutschlands"
                        ],
                        "answer": "Sozialistische Einheitspartei Deutschlands"
                },
                {
                        "number": 187,
                        "question": "Wer war der letzte Staatschef der DDR?",
                        "options": [
                                "Erich Honecker",
                                "Egon Krenz",
                                "Walter Ulbricht",
                                "Helmut Kohl"
                        ],
                        "answer": "Egon Krenz"
                },
                {
                        "number": 188,
                        "question": "Welches Gebäude in Berlin ist ein Symbol für die Deutsche Wiedervereinigung?",
                        "options": [
                                "Reichstag",
                                "Brandenburger Tor",
                                "Fernsehturm",
                                "Schloss Bellevue"
                        ],
                        "answer": "Brandenburger Tor"
                },
                {
                        "number": 189,
                        "question": "Was war die 'Grundlegende Ordnung' in der DDR?",
                        "options": [
                                "Die Verfassung der DDR",
                                "Ein Wirtschaftsplan",
                                "Ein Bildungsgesetz",
                                "Ein Militärgesetz"
                        ],
                        "answer": "Die Verfassung der DDR"
                },
                {
                        "number": 190,
                        "question": "Welche Farben hat die deutsche Nationalflagge?",
                        "options": [
                                "Schwarz, Rot, Gold",
                                "Rot, Weiß, Schwarz",
                                "Blau, Weiß, Rot",
                                "Grün, Weiß, Rot"
                        ],
                        "answer": "Schwarz, Rot, Gold"
                },
                {
                        "number": 191,
                        "question": "Wer war der Bundeskanzler, der die Deutsche Wiedervereinigung maßgeblich vorantrieb?",
                        "options": [
                                "Gerhard Schröder",
                                "Helmut Kohl",
                                "Konrad Adenauer",
                                "Willy Brandt"
                        ],
                        "answer": "Helmut Kohl"
                },
                {
                        "number": 192,
                        "question": "Was war die 'Ostpolitik' der Bundesrepublik Deutschland?",
                        "options": [
                                "Eine Politik zur Annäherung an die DDR und andere Ostblockstaaten",
                                "Eine Politik zur Förderung der Wirtschaft im Osten Deutschlands",
                                "Eine Politik zur Stärkung der NATO",
                                "Eine Politik zur Förderung der Landwirtschaft"
                        ],
                        "answer": "Eine Politik zur Annäherung an die DDR und andere Ostblockstaaten"
                },
                {
                        "number": 193,
                        "question": "Welches Ereignis führte 1989 zum Fall der Berliner Mauer?",
                        "options": [
                                "Ein Volksaufstand in Westdeutschland",
                                "Die friedliche Revolution in der DDR",
                                "Ein militärischer Konflikt",
                                "Eine Entscheidung der NATO"
                        ],
                        "answer": "Die friedliche Revolution in der DDR"
                },
                {
                        "number": 194,
                        "question": "Welche Stadt war die Hauptstadt der DDR?",
                        "options": [
                                "Bonn",
                                "Berlin (Ost)",
                                "München",
                                "Hamburg"
                        ],
                        "answer": "Berlin (Ost)"
                },
                {
                        "number": 195,
                        "question": "Welche Stadt war die Hauptstadt der Bundesrepublik Deutschland vor der Wiedervereinigung?",
                        "options": [
                                "Berlin",
                                "Bonn",
                                "Frankfurt",
                                "München"
                        ],
                        "answer": "Bonn"
                },
                {
                        "number": 196,
                        "question": "Was war die 'Nürnberger Gesetze' während der Zeit des Nationalsozialismus?",
                        "options": [
                                "Gesetze zur Förderung der Wirtschaft",
                                "Gesetze zur Diskriminierung von Juden",
                                "Gesetze zur Wiederbewaffnung",
                                "Gesetze zur Bildungsreform"
                        ],
                        "answer": "Gesetze zur Diskriminierung von Juden"
                },
                {
                        "number": 197,
                        "question": "Was war das Ziel der 'Nürnberger Gesetze' von 1935?",
                        "options": [
                                "Die Förderung der Gleichberechtigung",
                                "Die Ausgrenzung und Entrechtung der jüdischen Bevölkerung",
                                "Die Stärkung der Wirtschaft",
                                "Die Reform des Bildungssystems"
                        ],
                        "answer": "Die Ausgrenzung und Entrechtung der jüdischen Bevölkerung"
                },
                {
                        "number": 198,
                        "question": "Was war die 'Reichspogromnacht'?",
                        "options": [
                                "Eine Feier zur Gründung des Deutschen Reiches",
                                "Eine Nacht der organisierten Gewalt gegen Juden im November 1938",
                                "Eine politische Versammlung der NSDAP",
                                "Ein militärisches Ereignis im Zweiten Weltkrieg"
                        ],
                        "answer": "Eine Nacht der organisierten Gewalt gegen Juden im November 1938"
                },
                {
                        "number": 199,
                        "question": "Welcher Politiker war bekannt für seine 'Kniefall von Warschau'?",
                        "options": [
                                "Konrad Adenauer",
                                "Helmut Kohl",
                                "Willy Brandt",
                                "Gerhard Schröder"
                        ],
                        "answer": "Willy Brandt"
                },
                {
                        "number": 200,
                        "question": "Was war die 'Kniefall von Warschau'?",
                        "options": [
                                "Eine militärische Kapitulation",
                                "Ein symbolischer Akt der Entschuldigung für die Verbrechen der Nazis",
                                "Eine politische Verhandlung",
                                "Eine wirtschaftliche Vereinbarung"
                        ],
                        "answer": "Ein symbolischer Akt der Entschuldigung für die Verbrechen der Nazis"
                },
                {
                        "number": 201,
                        "question": "Welche Organisation war maßgeblich an der Verfolgung von Juden während des Nationalsozialismus beteiligt?",
                        "options": [
                                "Die SS",
                                "Die SPD",
                                "Die CDU",
                                "Die FDP"
                        ],
                        "answer": "Die SS"
                },
                {
                        "number": 202,
                        "question": "Was war die Hauptaufgabe der SS während des Nationalsozialismus?",
                        "options": [
                                "Wirtschaftsförderung",
                                "Politische Bildung",
                                "Überwachung und Verfolgung von Gegnern des Regimes",
                                "Bildungsreform"
                        ],
                        "answer": "Überwachung und Verfolgung von Gegnern des Regimes"
                },
                {
                        "number": 203,
                        "question": "Was war das 'Wannsee-Protokoll'?",
                        "options": [
                                "Ein Vertrag zur Beendigung des Zweiten Weltkriegs",
                                "Ein Dokument zur Planung der 'Endlösung' der Judenfrage",
                                "Ein Abkommen zur Wiedervereinigung",
                                "Ein Wirtschaftsplan"
                        ],
                        "answer": "Ein Dokument zur Planung der 'Endlösung' der Judenfrage"
                },
                {
                        "number": 204,
                        "question": "Wann fand die Wannsee-Konferenz statt?",
                        "options": [
                                "1938",
                                "1942",
                                "1945",
                                "1949"
                        ],
                        "answer": "1942"
                },
                {
                        "number": 205,
                        "question": "Was war das Ziel der Wannsee-Konferenz?",
                        "options": [
                                "Die Planung des Wiederaufbaus Deutschlands",
                                "Die Organisation der Deportation und Ermordung der Juden",
                                "Die Verhandlung über Friedensbedingungen",
                                "Die Gründung der Bundesrepublik Deutschland"
                        ],
                        "answer": "Die Organisation der Deportation und Ermordung der Juden"
                },
                {
                        "number": 206,
                        "question": "Welches Symbol wurde von den Nationalsozialisten als Kennzeichen für Juden verwendet?",
                        "options": [
                                "Ein roter Stern",
                                "Ein gelber Stern",
                                "Ein schwarzer Adler",
                                "Ein grünes Kreuz"
                        ],
                        "answer": "Ein gelber Stern"
                },
                {
                        "number": 207,
                        "question": "Was war die 'Weiße Rose' in Deutschland?",
                        "options": [
                                "Eine Widerstandsgruppe gegen den Nationalsozialismus",
                                "Eine politische Partei",
                                "Eine kulturelle Bewegung",
                                "Eine Wirtschaftsorganisation"
                        ],
                        "answer": "Eine Widerstandsgruppe gegen den Nationalsozialismus"
                },
                {
                        "number": 208,
                        "question": "Wer waren die Geschwister Scholl?",
                        "options": [
                                "Gründer der CDU",
                                "Führende Mitglieder der Weißen Rose",
                                "Wissenschaftler im Nationalsozialismus",
                                "Politiker in der DDR"
                        ],
                        "answer": "Führende Mitglieder der Weißen Rose"
                },
                {
                        "number": 209,
                        "question": "Welche Stadt war das Zentrum der NS-Bewegung in Deutschland?",
                        "options": [
                                "Berlin",
                                "München",
                                "Hamburg",
                                "Köln"
                        ],
                        "answer": "München"
                },
                {
                        "number": 210,
                        "question": "Was war das 'Ermächtigungsgesetz' von 1933?",
                        "options": [
                                "Ein Gesetz zur Förderung der Demokratie",
                                "Ein Gesetz, das Hitler diktatorische Macht gab",
                                "Ein Gesetz zur Wirtschaftsförderung",
                                "Ein Gesetz zur Bildungsreform"
                        ],
                        "answer": "Ein Gesetz, das Hitler diktatorische Macht gab"
                },
                {
                        "number": 211,
                        "question": "Welche Partei war die einzige zugelassene Partei während des Nationalsozialismus?",
                        "options": [
                                "SPD",
                                "NSDAP",
                                "CDU",
                                "FDP"
                        ],
                        "answer": "NSDAP"
                },
                {
                        "number": 212,
                        "question": "Was bedeutet die Abkürzung NSDAP?",
                        "options": [
                                "Nationalsozialistische Deutsche Arbeiterpartei",
                                "Nationale Deutsche Arbeiterpartei",
                                "Neue Sozialistische Deutsche Partei",
                                "Nationaldemokratische Arbeiterpartei"
                        ],
                        "answer": "Nationalsozialistische Deutsche Arbeiterpartei"
                },
                {
                        "number": 213,
                        "question": "Welches Ereignis markierte den Beginn des Zweiten Weltkriegs?",
                        "options": [
                                "Der Überfall auf Polen 1939",
                                "Der Fall der Berliner Mauer",
                                "Die Reichspogromnacht",
                                "Die Wiedervereinigung"
                        ],
                        "answer": "Der Überfall auf Polen 1939"
                },
                {
                        "number": 214,
                        "question": "Wann endete der Zweite Weltkrieg in Europa?",
                        "options": [
                                "1943",
                                "1945",
                                "1947",
                                "1949"
                        ],
                        "answer": "1945"
                },
                {
                        "number": 215,
                        "question": "Welches Land war nicht Teil der Achsenmächte im Zweiten Weltkrieg?",
                        "options": [
                                "Deutschland",
                                "Italien",
                                "Japan",
                                "Frankreich"
                        ],
                        "answer": "Frankreich"
                },
                {
                        "number": 216,
                        "question": "Was war die 'Luftbrücke' nach dem Zweiten Weltkrieg?",
                        "options": [
                                "Ein militärisches Manöver",
                                "Die Versorgung West-Berlins per Flugzeug während der sowjetischen Blockade",
                                "Ein Wiederaufbauprogramm",
                                "Eine Handelsroute"
                        ],
                        "answer": "Die Versorgung West-Berlins per Flugzeug während der sowjetischen Blockade"
                },
                {
                        "number": 217,
                        "question": "Wann fand die Berliner Luftbrücke statt?",
                        "options": [
                                "1945–1946",
                                "1948–1949",
                                "1950–1951",
                                "1953–1954"
                        ],
                        "answer": "1948–1949"
                },
                {
                        "number": 218,
                        "question": "Was war das Ziel der Marshallplan-Hilfe?",
                        "options": [
                                "Die Wiederbewaffnung Deutschlands",
                                "Der Wiederaufbau Europas nach dem Zweiten Weltkrieg",
                                "Die Teilung Deutschlands",
                                "Die Einführung der Deutschen Mark"
                        ],
                        "answer": "Der Wiederaufbau Europas nach dem Zweiten Weltkrieg"
                },
                {
                        "number": 219,
                        "question": "Wer war der Namensgeber des Marshallplans?",
                        "options": [
                                "George C. Marshall",
                                "Winston Churchill",
                                "Harry S. Truman",
                                "Dwight D. Eisenhower"
                        ],
                        "answer": "George C. Marshall"
                },
                {
                        "number": 220,
                        "question": "Was war das 'Grundgesetz' von 1949?",
                        "options": [
                                "Die Verfassung der DDR",
                                "Die Verfassung der Bundesrepublik Deutschland",
                                "Ein Gesetz zur Wirtschaftsförderung",
                                "Ein Gesetz zur Teilung Deutschlands"
                        ],
                        "answer": "Die Verfassung der Bundesrepublik Deutschland"
                },
                {
                        "number": 221,
                        "question": "Welches Land war nach dem Zweiten Weltkrieg für die Besatzungszone in Süddeutschland zuständig?",
                        "options": [
                                "Sowjetunion",
                                "USA",
                                "Frankreich",
                                "Großbritannien"
                        ],
                        "answer": "USA"
                },
                {
                        "number": 222,
                        "question": "Was war das Ziel der 'Entnazifizierung' nach dem Zweiten Weltkrieg?",
                        "options": [
                                "Die Wiederbewaffnung Deutschlands",
                                "Die Beseitigung nationalsozialistischer Einflüsse",
                                "Die Förderung der Wirtschaft",
                                "Die Teilung Deutschlands"
                        ],
                        "answer": "Die Beseitigung nationalsozialistischer Einflüsse"
                },
                {
                        "number": 223,
                        "question": "Welches Gericht war für die Verfolgung von NS-Kriegsverbrechern nach dem Zweiten Weltkrieg zuständig?",
                        "options": [
                                "Das Bundesverfassungsgericht",
                                "Der Internationale Militärgerichtshof in Nürnberg",
                                "Das Oberlandesgericht",
                                "Das Arbeitsgericht"
                        ],
                        "answer": "Der Internationale Militärgerichtshof in Nürnberg"
                },
                {
                        "number": 224,
                        "question": "Wann fanden die Nürnberger Prozesse statt?",
                        "options": [
                                "1945–1946",
                                "1948–1949",
                                "1950–1951",
                                "1953–1954"
                        ],
                        "answer": "1945–1946"
                },
                {
                        "number": 225,
                        "question": "Was war das Ziel der Nürnberger Prozesse?",
                        "options": [
                                "Die Verurteilung von NS-Kriegsverbrechern",
                                "Die Teilung Deutschlands",
                                "Die Einführung der Deutschen Mark",
                                "Die Gründung der NATO"
                        ],
                        "answer": "Die Verurteilung von NS-Kriegsverbrechern"
                },
                {
                        "number": 226,
                        "question": "Welches Land gehörte nach dem Zweiten Weltkrieg nicht zu den Siegermächten?",
                        "options": [
                                "USA",
                                "Sowjetunion",
                                "Großbritannien",
                                "Deutschland"
                        ],
                        "answer": "Deutschland"
                },
                {
                        "number": 227,
                        "question": "Was war die 'Potsdamer Konferenz'?",
                        "options": [
                                "Eine Konferenz zur Wiedervereinigung Deutschlands",
                                "Eine Konferenz zur Planung des Wiederaufbaus Europas",
                                "Eine Konferenz der Alliierten zur Nachkriegsordnung",
                                "Eine Konferenz zur Gründung der NATO"
                        ],
                        "answer": "Eine Konferenz der Alliierten zur Nachkriegsordnung"
                },
                {
                        "number": 228,
                        "question": "Wann fand die Potsdamer Konferenz statt?",
                        "options": [
                                "1943",
                                "1945",
                                "1947",
                                "1949"
                        ],
                        "answer": "1945"
                },
                {
                        "number": 229,
                        "question": "Was war das Ergebnis der Potsdamer Konferenz für Deutschland?",
                        "options": [
                                "Die Wiedervereinigung",
                                "Die Teilung in vier Besatzungszonen",
                                "Die Einführung der Deutschen Mark",
                                "Die Gründung der Bundesrepublik"
                        ],
                        "answer": "Die Teilung in vier Besatzungszonen"
                },
                {
                        "number": 230,
                        "question": "Welche Stadt war nach dem Zweiten Weltkrieg in vier Sektoren aufgeteilt?",
                        "options": [
                                "München",
                                "Hamburg",
                                "Berlin",
                                "Köln"
                        ],
                        "answer": "Berlin"
                },
                {
                        "number": 231,
                        "question": "Was war die 'Blockade von Berlin'?",
                        "options": [
                                "Eine militärische Aktion der NATO",
                                "Die sowjetische Sperrung des Zugangs zu West-Berlin",
                                "Eine wirtschaftliche Sanktion",
                                "Ein Protest der DDR-Bürger"
                        ],
                        "answer": "Die sowjetische Sperrung des Zugangs zu West-Berlin"
                },
                {
                        "number": 232,
                        "question": "Welches Land führte die Blockade von Berlin durch?",
                        "options": [
                                "USA",
                                "Sowjetunion",
                                "Frankreich",
                                "Großbritannien"
                        ],
                        "answer": "Sowjetunion"
                },
                {
                        "number": 233,
                        "question": "Was war die 'Deutsche Mark'?",
                        "options": [
                                "Die Währung der DDR",
                                "Die Währung der Bundesrepublik Deutschland vor dem Euro",
                                "Eine Steuer in der Bundesrepublik",
                                "Eine Wirtschaftsreform"
                        ],
                        "answer": "Die Währung der Bundesrepublik Deutschland vor dem Euro"
                },
                {
                        "number": 234,
                        "question": "Wann wurde die Deutsche Mark in der Bundesrepublik Deutschland eingeführt?",
                        "options": [
                                "1945",
                                "1948",
                                "1950",
                                "1953"
                        ],
                        "answer": "1948"
                },
                {
                        "number": 235,
                        "question": "Was war die Währung der DDR?",
                        "options": [
                                "Deutsche Mark",
                                "Mark der DDR",
                                "Reichsmark",
                                "Ostmark"
                        ],
                        "answer": "Mark der DDR"
                },
                {
                        "number": 236,
                        "question": "Welches Ereignis führte zur Teilung Deutschlands in zwei Staaten?",
                        "options": [
                                "Der Zweite Weltkrieg",
                                "Die Potsdamer Konferenz",
                                "Der Kalte Krieg",
                                "Die Berliner Luftbrücke"
                        ],
                        "answer": "Der Kalte Krieg"
                },
                {
                        "number": 237,
                        "question": "Was war das 'Zwei-plus-Vier-Abkommen'?",
                        "options": [
                                "Ein Abkommen zur Wiedervereinigung Deutschlands",
                                "Ein Wirtschaftsvertrag",
                                "Ein Militärbündnis",
                                "Ein Bildungsabkommen"
                        ],
                        "answer": "Ein Abkommen zur Wiedervereinigung Deutschlands"
                },
                {
                        "number": 238,
                        "question": "Wann wurde das Zwei-plus-Vier-Abkommen unterzeichnet?",
                        "options": [
                                "1989",
                                "1990",
                                "1991",
                                "1992"
                        ],
                        "answer": "1990"
                },
                {
                        "number": 239,
                        "question": "Welche Länder waren am Zwei-plus-Vier-Abkommen beteiligt?",
                        "options": [
                                "BRD, DDR, USA, Sowjetunion, Frankreich, Großbritannien",
                                "BRD, DDR, Italien, Japan",
                                "BRD, DDR, Polen, Schweden",
                                "BRD, DDR, China, Kanada"
                        ],
                        "answer": "BRD, DDR, USA, Sowjetunion, Frankreich, Großbritannien"
                },
                {
                        "number": 240,
                        "question": "Was war das Ziel des Zwei-plus-Vier-Abkommens?",
                        "options": [
                                "Die Wiederbewaffnung Deutschlands",
                                "Die volle Souveränität Deutschlands",
                                "Die Teilung Deutschlands",
                                "Die Einführung des Euro"
                        ],
                        "answer": "Die volle Souveränität Deutschlands"
                },
                {
                        "number": 241,
                        "question": "Welches Land war kein Mitglied der NATO nach dem Zweiten Weltkrieg?",
                        "options": [
                                "USA",
                                "Sowjetunion",
                                "Großbritannien",
                                "Frankreich"
                        ],
                        "answer": "Sowjetunion"
                },
                {
                        "number": 242,
                        "question": "Was war der 'Warschaupakt'?",
                        "options": [
                                "Ein militärisches Bündnis der Ostblockstaaten",
                                "Ein Wirtschaftsbündnis",
                                "Ein Friedensvertrag",
                                "Ein Bildungsabkommen"
                        ],
                        "answer": "Ein militärisches Bündnis der Ostblockstaaten"
                },
                {
                        "number": 243,
                        "question": "Welches Land gehörte zum Warschaupakt?",
                        "options": [
                                "USA",
                                "DDR",
                                "Frankreich",
                                "Großbritannien"
                        ],
                        "answer": "DDR"
                },
                {
                        "number": 244,
                        "question": "Was war das 'Grundgesetz' in Bezug auf die DDR?",
                        "options": [
                                "Die Verfassung der DDR",
                                "Die Verfassung der Bundesrepublik Deutschland",
                                "Ein Gesetz zur Wirtschaftsförderung",
                                "Ein Gesetz zur Teilung Deutschlands"
                        ],
                        "answer": "Die Verfassung der Bundesrepublik Deutschland"
                },
                {
                        "number": 245,
                        "question": "Welches Ereignis führte zur Gründung der NATO?",
                        "options": [
                                "Der Zweite Weltkrieg",
                                "Der Kalte Krieg",
                                "Die Wiedervereinigung",
                                "Die Berliner Luftbrücke"
                        ],
                        "answer": "Der Kalte Krieg"
                },
                {
                        "number": 246,
                        "question": "Wann wurde die NATO gegründet?",
                        "options": [
                                "1945",
                                "1949",
                                "1953",
                                "1955"
                        ],
                        "answer": "1949"
                },
                {
                        "number": 247,
                        "question": "Welches Land war Gründungsmitglied der NATO?",
                        "options": [
                                "Sowjetunion",
                                "USA",
                                "DDR",
                                "Polen"
                        ],
                        "answer": "USA"
                },
                {
                        "number": 248,
                        "question": "Was war das Ziel der NATO?",
                        "options": [
                                "Die wirtschaftliche Zusammenarbeit",
                                "Die kollektive Verteidigung ihrer Mitgliedsstaaten",
                                "Die Förderung der Demokratie weltweit",
                                "Die Unterstützung der DDR"
                        ],
                        "answer": "Die kollektive Verteidigung ihrer Mitgliedsstaaten"
                },
                {
                        "number": 249,
                        "question": "Welches Land war kein Mitglied des Warschaupakts?",
                        "options": [
                                "Sowjetunion",
                                "Polen",
                                "DDR",
                                "USA"
                        ],
                        "answer": "USA"
                },
                {
                        "number": 250,
                        "question": "Wann wurde der Warschaupakt gegründet?",
                        "options": [
                                "1945",
                                "1949",
                                "1955",
                                "1961"
                        ],
                        "answer": "1955"
                },
                {
                        "number": 251,
                        "question": "Was war die Hauptaufgabe des Bundesverfassungsgerichts in der Bundesrepublik Deutschland?",
                        "options": [
                                "Die Verfolgung von Kriminellen",
                                "Die Überprüfung der Verfassungsmäßigkeit von Gesetzen",
                                "Die Ernennung des Bundeskanzlers",
                                "Die Kontrolle der Wirtschaft"
                        ],
                        "answer": "Die Überprüfung der Verfassungsmäßigkeit von Gesetzen"
                },
                {
                        "number": 252,
                        "question": "Welches Gericht ist in Deutschland für Streitigkeiten zwischen Staat und Bürgern zuständig?",
                        "options": [
                                "Das Verwaltungsgericht",
                                "Das Arbeitsgericht",
                                "Das Familiengericht",
                                "Das Strafgericht"
                        ],
                        "answer": "Das Verwaltungsgericht"
                },
                {
                        "number": 253,
                        "question": "Was ist ein Merkmal der Gewaltenteilung in Deutschland?",
                        "options": [
                                "Die Regierung kontrolliert die Gerichte.",
                                "Die Legislative, Exekutive und Judikative sind voneinander unabhängig.",
                                "Die Gerichte bestimmen die Regierung.",
                                "Das Parlament hat die alleinige Macht."
                        ],
                        "answer": "Die Legislative, Exekutive und Judikative sind voneinander unabhängig."
                },
                {
                        "number": 254,
                        "question": "Wer kontrolliert in Deutschland die Einhaltung der Grundrechte?",
                        "options": [
                                "Der Bundeskanzler",
                                "Das Bundesverfassungsgericht",
                                "Der Bundesrat",
                                "Die Polizei"
                        ],
                        "answer": "Das Bundesverfassungsgericht"
                },
                {
                        "number": 255,
                        "question": "Was ist die Aufgabe des Bundesverfassungsgerichts?",
                        "options": [
                                "Die Ernennung von Ministern",
                                "Die Überprüfung der Verfassungsmäßigkeit von Gesetzen",
                                "Die Durchführung von Wahlen",
                                "Die Kontrolle der Wirtschaft"
                        ],
                        "answer": "Die Überprüfung der Verfassungsmäßigkeit von Gesetzen"
                },
                {
                        "number": 256,
                        "question": "Welches Grundrecht schützt die freie Entfaltung der Persönlichkeit in Deutschland?",
                        "options": [
                                "Artikel 1",
                                "Artikel 2",
                                "Artikel 3",
                                "Artikel 4"
                        ],
                        "answer": "Artikel 2"
                },
                {
                        "number": 257,
                        "question": "Was ist das Prinzip der Gewaltenteilung in Deutschland?",
                        "options": [
                                "Die Macht ist auf Legislative, Exekutive und Judikative aufgeteilt.",
                                "Die Macht liegt allein beim Bundeskanzler.",
                                "Die Macht liegt allein beim Parlament.",
                                "Die Macht liegt bei den Bürgern."
                        ],
                        "answer": "Die Macht ist auf Legislative, Exekutive und Judikative aufgeteilt."
                },
                {
                        "number": 258,
                        "question": "Welches Grundrecht schützt die Meinungsfreiheit in Deutschland?",
                        "options": [
                                "Artikel 3",
                                "Artikel 5",
                                "Artikel 7",
                                "Artikel 9"
                        ],
                        "answer": "Artikel 5"
                },
                {
                        "number": 259,
                        "question": "Was ist die Aufgabe des Bundestages in Deutschland?",
                        "options": [
                                "Die Ernennung des Bundespräsidenten",
                                "Die Gesetzgebung und Kontrolle der Regierung",
                                "Die Durchführung von Strafprozessen",
                                "Die Verwaltung der Bundesländer"
                        ],
                        "answer": "Die Gesetzgebung und Kontrolle der Regierung"
                },
                {
                        "number": 260,
                        "question": "Wer ist im Deutschen Bundestag für die Leitung der Sitzungen verantwortlich?",
                        "options": [
                                "Der Bundeskanzler",
                                "Der Bundestagspräsident",
                                "Der Bundespräsident",
                                "Der Bundesratspräsident"
                        ],
                        "answer": "Der Bundestagspräsident"
                },
                {
                        "number": 261,
                        "question": "Was ist die Aufgabe des Bundesrates in Deutschland?",
                        "options": [
                                "Die Vertretung der Bundesländer bei der Gesetzgebung",
                                "Die Ernennung des Bundeskanzlers",
                                "Die Kontrolle der Gerichte",
                                "Die Durchführung von Wahlen"
                        ],
                        "answer": "Die Vertretung der Bundesländer bei der Gesetzgebung"
                },
                {
                        "number": 262,
                        "question": "Wer kann in Deutschland Gesetzesvorschläge einbringen?",
                        "options": [
                                "Nur der Bundeskanzler",
                                "Der Bundestag, der Bundesrat und die Bundesregierung",
                                "Nur die Bürger",
                                "Nur die Gerichte"
                        ],
                        "answer": "Der Bundestag, der Bundesrat und die Bundesregierung"
                },
                {
                        "number": 263,
                        "question": "Was ist die Aufgabe der Bundesregierung in Deutschland?",
                        "options": [
                                "Die Gesetzgebung",
                                "Die Umsetzung der Gesetze und Leitung der Verwaltung",
                                "Die Kontrolle der Gerichte",
                                "Die Ernennung des Bundespräsidenten"
                        ],
                        "answer": "Die Umsetzung der Gesetze und Leitung der Verwaltung"
                },
                {
                        "number": 264,
                        "question": "Wer ist das Oberhaupt der Bundesregierung in Deutschland?",
                        "options": [
                                "Der Bundespräsident",
                                "Der Bundeskanzler",
                                "Der Bundestagspräsident",
                                "Der Bundesratspräsident"
                        ],
                        "answer": "Der Bundeskanzler"
                },
                {
                        "number": 265,
                        "question": "Was ist die Aufgabe der Polizei in Deutschland?",
                        "options": [
                                "Die Gesetzgebung",
                                "Die Durchsetzung von Gesetzen und Schutz der öffentlichen Sicherheit",
                                "Die Kontrolle der Gerichte",
                                "Die Ernennung von Ministern"
                        ],
                        "answer": "Die Durchsetzung von Gesetzen und Schutz der öffentlichen Sicherheit"
                },
                {
                        "number": 266,
                        "question": "Welches Gericht ist in Deutschland für Streitigkeiten zwischen Arbeitgebern und Arbeitnehmern zuständig?",
                        "options": [
                                "Das Verwaltungsgericht",
                                "Das Arbeitsgericht",
                                "Das Familiengericht",
                                "Das Strafgericht"
                        ],
                        "answer": "Das Arbeitsgericht"
                },
                {
                        "number": 267,
                        "question": "Was ist die Aufgabe der Kommunen in Deutschland?",
                        "options": [
                                "Die Außenpolitik",
                                "Die lokale Verwaltung und Dienstleistungen",
                                "Die Gesetzgebung",
                                "Die Verteidigung"
                        ],
                        "answer": "Die lokale Verwaltung und Dienstleistungen"
                },
                {
                        "number": 268,
                        "question": "Wer wählt die Bürgermeister in Deutschland?",
                        "options": [
                                "Die Bürger der Gemeinde",
                                "Der Bundeskanzler",
                                "Der Bundesrat",
                                "Das Bundesverfassungsgericht"
                        ],
                        "answer": "Die Bürger der Gemeinde"
                },
                {
                        "number": 269,
                        "question": "Was ist die Aufgabe der Jugendämter in Deutschland?",
                        "options": [
                                "Die Unterstützung und der Schutz von Kindern und Jugendlichen",
                                "Die Gesetzgebung",
                                "Die Kontrolle der Schulen",
                                "Die Verwaltung der Steuern"
                        ],
                        "answer": "Die Unterstützung und der Schutz von Kindern und Jugendlichen"
                },
                {
                        "number": 270,
                        "question": "Was ist die Aufgabe der Sozialversicherung in Deutschland?",
                        "options": [
                                "Die Absicherung gegen Risiken wie Krankheit, Arbeitslosigkeit und Alter",
                                "Die Förderung der Wirtschaft",
                                "Die Durchführung von Wahlen",
                                "Die Kontrolle der Gerichte"
                        ],
                        "answer": "Die Absicherung gegen Risiken wie Krankheit, Arbeitslosigkeit und Alter"
                },
                {
                        "number": 271,
                        "question": "Welche Institution ist in Deutschland für die Altersvorsorge zuständig?",
                        "options": [
                                "Die Deutsche Rentenversicherung",
                                "Das Bundesverfassungsgericht",
                                "Der Bundesrat",
                                "Die Bundeswehr"
                        ],
                        "answer": "Die Deutsche Rentenversicherung"
                },
                {
                        "number": 272,
                        "question": "Was ist die Aufgabe der Krankenkassen in Deutschland?",
                        "options": [
                                "Die Finanzierung der Gesundheitsversorgung",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Finanzierung der Gesundheitsversorgung"
                },
                {
                        "number": 273,
                        "question": "Was ist die Aufgabe der Arbeitsagenturen in Deutschland?",
                        "options": [
                                "Die Vermittlung von Arbeitsplätzen und Unterstützung bei Arbeitslosigkeit",
                                "Die Gesetzgebung",
                                "Die Kontrolle der Gerichte",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Vermittlung von Arbeitsplätzen und Unterstützung bei Arbeitslosigkeit"
                },
                {
                        "number": 274,
                        "question": "Was ist die Aufgabe der Pflegeversicherung in Deutschland?",
                        "options": [
                                "Die Finanzierung von Pflegeleistungen",
                                "Die Förderung der Wirtschaft",
                                "Die Gesetzgebung",
                                "Die Kontrolle der Schulen"
                        ],
                        "answer": "Die Finanzierung von Pflegeleistungen"
                },
                {
                        "number": 275,
                        "question": "Was ist die Aufgabe der Unfallversicherung in Deutschland?",
                        "options": [
                                "Die Absicherung gegen Arbeitsunfälle und Berufskrankheiten",
                                "Die Finanzierung von Urlaubsreisen",
                                "Die Gesetzgebung",
                                "Die Kontrolle der Gerichte"
                        ],
                        "answer": "Die Absicherung gegen Arbeitsunfälle und Berufskrankheiten"
                },
                {
                        "number": 276,
                        "question": "Was ist die Aufgabe der Bundeswehr in Deutschland?",
                        "options": [
                                "Die Verteidigung des Landes",
                                "Die Gesetzgebung",
                                "Die Kontrolle der Gerichte",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Verteidigung des Landes"
                },
                {
                        "number": 277,
                        "question": "Welches Ministerium ist in Deutschland für die Außenpolitik zuständig?",
                        "options": [
                                "Das Auswärtige Amt",
                                "Das Innenministerium",
                                "Das Verteidigungsministerium",
                                "Das Finanzministerium"
                        ],
                        "answer": "Das Auswärtige Amt"
                },
                {
                        "number": 278,
                        "question": "Welches Ministerium ist in Deutschland für die Verteidigung zuständig?",
                        "options": [
                                "Das Auswärtige Amt",
                                "Das Innenministerium",
                                "Das Verteidigungsministerium",
                                "Das Finanzministerium"
                        ],
                        "answer": "Das Verteidigungsministerium"
                },
                {
                        "number": 279,
                        "question": "Was ist die Aufgabe des Finanzministeriums in Deutschland?",
                        "options": [
                                "Die Verwaltung des Staatshaushalts",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Verwaltung des Staatshaushalts"
                },
                {
                        "number": 280,
                        "question": "Was ist die Aufgabe des Innenministeriums in Deutschland?",
                        "options": [
                                "Die Sicherstellung der inneren Sicherheit und Verwaltung",
                                "Die Außenpolitik",
                                "Die Verteidigung",
                                "Die Gesetzgebung"
                        ],
                        "answer": "Die Sicherstellung der inneren Sicherheit und Verwaltung"
                },
                {
                        "number": 281,
                        "question": "Was ist die Aufgabe des Bildungsministeriums in Deutschland?",
                        "options": [
                                "Die Förderung von Bildung und Forschung",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Förderung von Bildung und Forschung"
                },
                {
                        "number": 282,
                        "question": "Wer ist in Deutschland für die Schulpolitik zuständig?",
                        "options": [
                                "Die Bundesregierung",
                                "Die Bundesländer",
                                "Der Bundespräsident",
                                "Das Bundesverfassungsgericht"
                        ],
                        "answer": "Die Bundesländer"
                },
                {
                        "number": 283,
                        "question": "Was ist die Aufgabe des Gesundheitsministeriums in Deutschland?",
                        "options": [
                                "Die Förderung des Gesundheitswesens",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Förderung des Gesundheitswesens"
                },
                {
                        "number": 284,
                        "question": "Was ist die Aufgabe des Umweltministeriums in Deutschland?",
                        "options": [
                                "Der Schutz der Umwelt und Förderung nachhaltiger Entwicklung",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Der Schutz der Umwelt und Förderung nachhaltiger Entwicklung"
                },
                {
                        "number": 285,
                        "question": "Was ist die Aufgabe des Justizministeriums in Deutschland?",
                        "options": [
                                "Die Förderung der Rechtsstaatlichkeit und Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Förderung der Rechtsstaatlichkeit und Gesetzgebung"
                },
                {
                        "number": 286,
                        "question": "Was ist die Aufgabe des Wirtschaftsministeriums in Deutschland?",
                        "options": [
                                "Die Förderung der Wirtschaft und Industrie",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Förderung der Wirtschaft und Industrie"
                },
                {
                        "number": 287,
                        "question": "Was ist die Aufgabe des Verkehrsministeriums in Deutschland?",
                        "options": [
                                "Die Förderung der Infrastruktur und Verkehrssysteme",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Förderung der Infrastruktur und Verkehrssysteme"
                },
                {
                        "number": 288,
                        "question": "Was ist die Aufgabe des Familienministeriums in Deutschland?",
                        "options": [
                                "Die Förderung von Familien, Kindern und Senioren",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Förderung von Familien, Kindern und Senioren"
                },
                {
                        "number": 289,
                        "question": "Was ist die Aufgabe des Arbeitsministeriums in Deutschland?",
                        "options": [
                                "Die Förderung der Arbeitsmarktpolitik und Sozialversicherung",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Förderung der Arbeitsmarktpolitik und Sozialversicherung"
                },
                {
                        "number": 290,
                        "question": "Was ist die Aufgabe des Entwicklungsministeriums in Deutschland?",
                        "options": [
                                "Die Förderung der internationalen Zusammenarbeit und Entwicklungshilfe",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Förderung der internationalen Zusammenarbeit und Entwicklungshilfe"
                },
                {
                        "number": 291,
                        "question": "Was ist die Aufgabe des Landwirtschaftsministeriums in Deutschland?",
                        "options": [
                                "Die Förderung der Landwirtschaft und Ernährungssicherheit",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Außenpolitik"
                        ],
                        "answer": "Die Förderung der Landwirtschaft und Ernährungssicherheit"
                },
                {
                        "number": 292,
                        "question": "Was ist die Aufgabe der Bundesländer in Deutschland?",
                        "options": [
                                "Die Außenpolitik",
                                "Die Bildungspolitik und innere Verwaltung",
                                "Die Verteidigung",
                                "Die Gesetzgebung auf Bundesebene"
                        ],
                        "answer": "Die Bildungspolitik und innere Verwaltung"
                },
                {
                        "number": 293,
                        "question": "Was ist die Aufgabe der Kommunen in Deutschland?",
                        "options": [
                                "Die lokale Verwaltung und Dienstleistungen",
                                "Die Außenpolitik",
                                "Die Verteidigung",
                                "Die Gesetzgebung"
                        ],
                        "answer": "Die lokale Verwaltung und Dienstleistungen"
                },
                {
                        "number": 294,
                        "question": "Was ist die Aufgabe des Bundestages in Deutschland?",
                        "options": [
                                "Die Gesetzgebung und Kontrolle der Bundesregierung",
                                "Die Verteidigung",
                                "Die Außenpolitik",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Gesetzgebung und Kontrolle der Bundesregierung"
                },
                {
                        "number": 295,
                        "question": "Was ist die Aufgabe des Bundesrates in Deutschland?",
                        "options": [
                                "Die Vertretung der Bundesländer bei der Gesetzgebung",
                                "Die Außenpolitik",
                                "Die Verteidigung",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Vertretung der Bundesländer bei der Gesetzgebung"
                },
                {
                        "number": 296,
                        "question": "Was ist die Aufgabe der Bundesregierung in Deutschland?",
                        "options": [
                                "Die Umsetzung der Gesetze und Leitung der Verwaltung",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Umsetzung der Gesetze und Leitung der Verwaltung"
                },
                {
                        "number": 297,
                        "question": "Was ist die Aufgabe des Bundespräsidenten in Deutschland?",
                        "options": [
                                "Die Repräsentation des Landes und die Unterzeichnung von Gesetzen",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Repräsentation des Landes und die Unterzeichnung von Gesetzen"
                },
                {
                        "number": 298,
                        "question": "Was ist die Aufgabe des Bundeskanzlers in Deutschland?",
                        "options": [
                                "Die Leitung der Bundesregierung und Bestimmung der Politik",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Leitung der Bundesregierung und Bestimmung der Politik"
                },
                {
                        "number": 299,
                        "question": "Was ist die Aufgabe des Bundesverfassungsgerichts in Deutschland?",
                        "options": [
                                "Die Überprüfung der Verfassungsmäßigkeit von Gesetzen",
                                "Die Gesetzgebung",
                                "Die Verteidigung",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Überprüfung der Verfassungsmäßigkeit von Gesetzen"
                },
                {
                        "number": 300,
                        "question": "Was ist die Aufgabe der Bundeswehr in Deutschland?",
                        "options": [
                                "Die Verteidigung des Landes und Beteiligung an internationalen Einsätzen",
                                "Die Gesetzgebung",
                                "Die Außenpolitik",
                                "Die Verwaltung der Kommunen"
                        ],
                        "answer": "Die Verteidigung des Landes und Beteiligung an internationalen Einsätzen"
                }
        ]
};
        
        console.log('Using embedded questions data');
        const data = embeddedData;
        
        if (!data || !data.questions) {
            console.error('No embedded questions found');
            return;
        }
        
        console.log(`Found ${data.questions.length} embedded questions`);
        
        // Validate and convert questions
        const jsonQuestions = [];
        
        for (let index = 0; index < data.questions.length; index++) {
            const q = data.questions[index];
            
            if (!q.question || typeof q.question !== 'string') {
                console.warn(`Question ${index + 1} missing or invalid 'question' field:`, q);
                continue;
            }
            
            if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
                console.warn(`Question ${index + 1} missing or invalid 'options' field:`, q);
                continue;
            }
            
            if (!q.answer || typeof q.answer !== 'string') {
                console.warn(`Question ${index + 1} missing or invalid 'answer' field:`, q);
                continue;
            }
            
            // Find correct answer index
            const correctIndex = q.options.findIndex(option => option === q.answer);
            if (correctIndex === -1) {
                console.warn(`Question ${index + 1} answer "${q.answer}" not found in options:`, q.options);
                continue;
            }
            
            // Valid question, convert it
            jsonQuestions.push({
                id: q.number || q.id || index + 1,
                question: q.question,
                options: q.options,
                correct: correctIndex
            });
        }
        
        if (jsonQuestions.length > 0) {
            this.allQuestions = jsonQuestions;
            console.log(`Successfully loaded ${this.allQuestions.length} embedded questions`);
        } else {
            console.error('No valid embedded questions found');
        }
    }
            
            // Get the text content first to examine it
            const textContent = await response.text();
            console.log('Raw text length:', textContent.length);
            
            if (textContent.length === 0) {
                throw new Error('File is empty');
            }
            
            console.log('First 200 chars:', textContent.substring(0, 200));
            console.log('Last 200 chars:', textContent.substring(textContent.length - 200));
            
            // Try to parse JSON with better error reporting
            let data;
            try {
                data = JSON.parse(textContent);
                console.log('JSON parsed successfully');
            } catch (jsonError) {
                console.error('JSON parsing failed:', jsonError);
                console.error('Error at position:', jsonError.message);
                // Try to find problematic characters
                const lines = textContent.split('\n');
                console.log('Total lines:', lines.length);
                throw new Error(`JSON Parse Error: ${jsonError.message}`);
            }
            
            console.log('Data structure:', typeof data, data ? Object.keys(data) : 'null');
            
            if (!data) {
                throw new Error('Parsed data is null or undefined');
            }
            
            if (!data.questions) {
                throw new Error(`No 'questions' property found. Available properties: ${Object.keys(data).join(', ')}`);
            }
            
            if (!Array.isArray(data.questions)) {
                throw new Error(`'questions' property is not an array. Type: ${typeof data.questions}`);
            }
            
            console.log(`Found ${data.questions.length} questions in JSON`);
            console.log('Sample question structure:', data.questions[0]);
            
            // Validate and convert questions
            const jsonQuestions = [];
            let validQuestions = 0;
            
            for (let index = 0; index < data.questions.length; index++) {
                const q = data.questions[index];
                
                // Validate question structure
                if (!q.question || typeof q.question !== 'string') {
                    console.warn(`Question ${index + 1} missing or invalid 'question' field:`, q);
                    continue;
                }
                
                if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
                    console.warn(`Question ${index + 1} missing or invalid 'options' field:`, q);
                    continue;
                }
                
                if (!q.answer || typeof q.answer !== 'string') {
                    console.warn(`Question ${index + 1} missing or invalid 'answer' field:`, q);
                    continue;
                }
                
                // Find correct answer index
                const correctIndex = q.options.findIndex(option => option === q.answer);
                if (correctIndex === -1) {
                    console.warn(`Question ${index + 1} answer "${q.answer}" not found in options:`, q.options);
                    continue;
                }
                
                // Valid question, convert it
                jsonQuestions.push({
                    id: q.number || q.id || index + 1,
                    question: q.question,
                    options: q.options,
                    correct: correctIndex
                });
                validQuestions++;
            }
            
            if (jsonQuestions.length === 0) {
                throw new Error('No valid questions found in JSON file');
            }
            
            // Successfully loaded from JSON, replace fallback questions
            this.allQuestions = jsonQuestions;
            console.log(`Successfully upgraded to ${this.allQuestions.length} valid questions from JSON file`);
            console.log(`${validQuestions} valid out of ${data.questions.length} total questions`);
            console.log('First converted question:', this.allQuestions[0]);
            
        } catch (error) {
            console.error('Failed to load questions from JSON file:', error);
            console.log(`Continuing with ${fallbackCount} fallback questions`);
            // Keep the fallback questions that are already loaded
        }
        
        console.log(`Final question count: ${this.allQuestions.length}`);
    }
    
    loadFallbackQuestions() {
        console.log('loadFallbackQuestions() called');
        // Provide more comprehensive fallback questions
        this.allQuestions = [
            {
                id: 1,
                question: "Was ist ein Rechtsstaat?",
                options: [
                    "Ein Staat, in dem es nur rechte politische Parteien gibt",
                    "Ein Staat, in dem die Bürger über das Recht entscheiden",
                    "Ein Staat, in dem alle Bürger und Institutionen vor dem Gesetz gleich sind",
                    "Ein Staat, in dem nur das Parlament Gesetze beschließen darf"
                ],
                correct: 2
            },
            {
                id: 2,
                question: "Was steht nicht im Grundgesetz von Deutschland?",
                options: [
                    "Die Würde des Menschen ist unantastbar",
                    "Alle Menschen sind vor dem Gesetz gleich",
                    "Die Bundesrepublik Deutschland ist ein sozialer Bundesstaat",
                    "Alle Bürger haben das Recht auf Arbeit"
                ],
                correct: 3
            },
            {
                id: 3,
                question: "Welches Recht gehört zu den Grundrechten in Deutschland?",
                options: [
                    "Waffenbesitz",
                    "Faustrecht",
                    "Meinungsfreiheit",
                    "Selbstjustiz"
                ],
                correct: 2
            },
            {
                id: 4,
                question: "Was bedeutet „Volkssouveränität"?",
                options: [
                    "Der König herrscht über das Volk",
                    "Das Bundesverfassungsgericht steht über der Verfassung",
                    "Das Volk wählt den Bundespräsidenten direkt",
                    "Alle Staatsgewalt geht vom Volke aus"
                ],
                correct: 3
            },
            {
                id: 5,
                question: "Was ist Deutschland?",
                options: [
                    "Eine Monarchie",
                    "Ein Bundesstaat",
                    "Eine Diktatur",
                    "Eine Kolonie"
                ],
                correct: 1
            }
        ];
        
        // Create additional sample questions to reach a reasonable number for testing
        for (let i = 6; i <= 50; i++) {
            this.allQuestions.push({
                id: i,
                question: `Beispielfrage ${i}: Welche Aussage über Deutschland ist korrekt?`,
                options: [
                    "Option A - Erste Antwortmöglichkeit",
                    "Option B - Zweite Antwortmöglichkeit", 
                    "Option C - Dritte Antwortmöglichkeit",
                    "Option D - Vierte Antwortmöglichkeit"
                ],
                correct: Math.floor(Math.random() * 4) // Random correct answer for demo
            });
        }
        
        console.log(`Generated ${this.allQuestions.length} fallback questions`);
        console.log('First fallback question:', this.allQuestions[0]);
        console.log('Last fallback question:', this.allQuestions[this.allQuestions.length - 1]);
        console.log(`loadFallbackQuestions() completed successfully`);
    }
    
    setupEventListeners() {
        // CTA Buttons (only buttons, not links)
        const ctaButtons = document.querySelectorAll('button.cta-primary, button.cta-button, button.cta-nav-btn, button.cta-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.startQuiz();
            });
        });
        
        // Navigation links (only internal anchor links)
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.scrollToSection(href);
                });
            }
        });
        
        // Quiz controls
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
    }
    
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Add fade-in class to sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });
        
        // Animate hero stats
        const stats = document.querySelectorAll('.hero-stats .stat-number');
        stats.forEach(stat => {
            observer.observe(stat);
            stat.addEventListener('intersectionChange', () => {
                if (stat.classList.contains('visible')) {
                    this.animateCounter(stat);
                }
            });
        });
    }
    
    animateCounter(element) {
        const text = element.textContent;
        const target = parseInt(text.replace(/[^\d]/g, ''));
        if (isNaN(target)) return;
        
        const suffix = text.replace(/[\d]/g, '');
        const duration = 2000;
        const start = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Quiz Mode Management
    setQuizMode(mode) {
        this.quizMode = mode;
        
        // Update mode display
        const modeInfo = document.getElementById('current-mode');
        const modeButtons = document.querySelectorAll('.mode-btn, .mode-btn-compact');
        
        // Reset button states
        modeButtons.forEach(btn => btn.classList.remove('active'));
        
        switch (mode) {
            case 'practice':
                // All questions available for practice
                this.questions = [...this.allQuestions];
                this.showCorrectAnswer = true;
                if (modeInfo) modeInfo.textContent = 'Practice Mode: All Questions with Answers';
                document.querySelectorAll('[data-mode="practice"]').forEach(btn => btn.classList.add('active'));
                break;
                
            case 'exam':
                // Random 33 questions for official exam simulation
                this.questions = this.getRandomQuestions(33);
                this.showCorrectAnswer = true; // User requested to see correct answers
                if (modeInfo) modeInfo.textContent = 'Exam Mode: 33 Random Questions';
                document.querySelectorAll('[data-mode="exam"]').forEach(btn => btn.classList.add('active'));
                break;
                
            case 'all':
            case 'review':
                // All 300 questions for complete practice (review mode)
                this.questions = [...this.allQuestions];
                this.showCorrectAnswer = true;
                if (modeInfo) modeInfo.textContent = 'Review Mode: Study All Questions';
                document.querySelectorAll('[data-mode="all"], [data-mode="review"]').forEach(btn => btn.classList.add('active'));
                break;
                
            case 'bundesland':
                // Bundesland-specific questions (already loaded)
                this.showCorrectAnswer = true;
                const stateName = this.currentBundesland || 'Selected State';
                if (modeInfo) modeInfo.textContent = `${stateName}: State-Specific Questions`;
                break;
                
            default:
                this.questions = this.allQuestions.slice(0, 10);
                this.showCorrectAnswer = true;
                if (modeInfo) modeInfo.textContent = 'Practice Mode: 10 Questions with Answers';
        }
        
        // Reset quiz state
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        
        console.log(`Quiz mode set to: ${mode}, Questions: ${this.questions.length}`);
    }
    
    getRandomQuestions(count) {
        const shuffled = [...this.allQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    startQuiz(mode = 'practice') {
        // Always redirect to quiz page for consistent experience
        window.location.href = `quiz.html?mode=${mode}`;
    }
    
    // New method for dedicated quiz page
    startQuizPage(mode = 'practice') {
        console.log(`Starting quiz page with mode: ${mode}`);
        console.log(`Available questions before setQuizMode: ${this.allQuestions.length}`);
        
        this.setQuizMode(mode);
        
        console.log(`Questions after setQuizMode: ${this.questions.length}`);
        
        if (this.questions.length === 0) {
            console.error('No questions available after setQuizMode!');
            return;
        }
        
        this.isQuizActive = true;
        this.currentQuestion = 0; // Ensure we start at question 0
        this.quizStartTime = Date.now();
        this.setupQuizPageLayout(mode);
        this.updateQuestionNavigation();
        this.loadQuestion();
        this.updateProgress();
        
        console.log(`Quiz started successfully with ${this.questions.length} questions`);
    }
    
    setupQuizPageLayout(mode) {
        // Update quiz page header based on mode
        const quizTitle = document.getElementById('quiz-title');
        const quizSubtitle = document.getElementById('quiz-subtitle');
        const quizBadge = document.getElementById('quiz-badge');
        const badgeIcon = document.getElementById('badge-icon');
        const badgeText = document.getElementById('badge-text');
        const examInfoPanel = document.getElementById('exam-info-panel');
        const timerDisplay = document.getElementById('timer-display');
        const passRequirement = document.getElementById('pass-requirement');
        const passScore = document.getElementById('pass-score');
        const performanceIndicator = document.getElementById('performance-indicator');
        const correctLegend = document.getElementById('correct-legend');
        const incorrectLegend = document.getElementById('incorrect-legend');
        const remainingStat = document.getElementById('remaining-stat');
        
        // Show/hide correct/incorrect legends based on mode
        if (this.showCorrectAnswer) {
            if (correctLegend) correctLegend.style.display = 'flex';
            if (incorrectLegend) incorrectLegend.style.display = 'flex';
        }
        
        switch (mode) {
            case 'practice':
                if (quizTitle) quizTitle.textContent = 'Practice Quiz';
                if (quizSubtitle) quizSubtitle.textContent = 'Practice all questions with instant feedback and explanations';
                if (quizBadge) {
                    quizBadge.style.display = 'inline-flex';
                    badgeIcon.textContent = '📚';
                    badgeText.textContent = 'Practice Mode';
                }
                if (remainingStat) remainingStat.style.display = 'block';
                if (examInfoPanel) this.setupPracticeInfo(examInfoPanel);
                break;
                
            case 'exam':
                if (quizTitle) quizTitle.textContent = 'Official Exam Simulation';
                if (quizSubtitle) quizSubtitle.textContent = 'Complete 33 questions to pass the citizenship test';
                if (quizBadge) {
                    quizBadge.style.display = 'inline-flex';
                    badgeIcon.textContent = '📝';
                    badgeText.textContent = 'Exam Mode';
                }
                if (passRequirement) {
                    passRequirement.style.display = 'flex';
                    passScore.textContent = '17/33';
                }
                if (performanceIndicator) performanceIndicator.style.display = 'block';
                if (remainingStat) remainingStat.style.display = 'block';
                if (examInfoPanel) this.setupExamInfo(examInfoPanel);
                break;
                
            case 'all':
            case 'review':
                if (quizTitle) quizTitle.textContent = 'Review Mode';
                if (quizSubtitle) quizSubtitle.textContent = 'Study all 300 questions with detailed focus';
                if (quizBadge) {
                    quizBadge.style.display = 'inline-flex';
                    badgeIcon.textContent = '📖';
                    badgeText.textContent = 'Study Mode';
                }
                if (remainingStat) remainingStat.style.display = 'block';
                if (examInfoPanel) this.setupReviewInfo(examInfoPanel);
                break;
                
            case 'bundesland':
                const stateName = this.currentBundesland || 'Bundesland';
                if (quizTitle) quizTitle.textContent = `${stateName} Quiz`;
                if (quizSubtitle) quizSubtitle.textContent = `State-specific questions for ${stateName}`;
                if (quizBadge) {
                    quizBadge.style.display = 'inline-flex';
                    badgeIcon.textContent = '🏛️';
                    badgeText.textContent = 'State Quiz';
                }
                if (examInfoPanel) this.setupBundeslandInfo(examInfoPanel, stateName);
                break;
        }
    }
    
    setupPracticeInfo(panel) {
        panel.style.display = 'block';
        const instructionList = document.getElementById('instruction-list');
        if (instructionList) {
            instructionList.innerHTML = `
                <li>Practice all 300 questions at your own pace</li>
                <li>See correct answers immediately after selection</li>
                <li>Review explanations for better understanding</li>
                <li>Navigate freely between questions</li>
                <li>No time limit - focus on learning</li>
            `;
        }
        
        const topicPanel = document.getElementById('exam-topics');
        if (topicPanel) {
            topicPanel.style.display = 'block';
            const topicList = document.getElementById('topic-list');
            if (topicList) {
                topicList.innerHTML = `
                    <span class="topic-tag">Politics & Democracy</span>
                    <span class="topic-tag">History & Responsibility</span>
                    <span class="topic-tag">People & Society</span>
                `;
            }
        }
    }
    
    setupExamInfo(panel) {
        panel.style.display = 'block';
        const instructionList = document.getElementById('instruction-list');
        if (instructionList) {
            instructionList.innerHTML = `
                <li>Complete 33 randomly selected questions</li>
                <li>Need 17 correct answers to pass (52%)</li>
                <li>See answers immediately (practice feature)</li>
                <li>Navigate between questions freely</li>
                <li>Track your performance in real-time</li>
            `;
        }
        
        const topicPanel = document.getElementById('exam-topics');
        if (topicPanel) {
            topicPanel.style.display = 'block';
            const topicList = document.getElementById('topic-list');
            if (topicList) {
                topicList.innerHTML = `
                    <span class="topic-tag">Politics in Democracy</span>
                    <span class="topic-tag">History & Responsibility</span>
                    <span class="topic-tag">People & Society</span>
                    <span class="topic-tag">Random Selection</span>
                `;
            }
        }
    }
    
    setupReviewInfo(panel) {
        panel.style.display = 'block';
        const instructionList = document.getElementById('instruction-list');
        if (instructionList) {
            instructionList.innerHTML = `
                <li>Study all 300 official test questions</li>
                <li>Detailed review with comprehensive feedback</li>
                <li>Navigate between questions for thorough study</li>
                <li>Focus on understanding each topic</li>
                <li>Perfect for comprehensive exam preparation</li>
            `;
        }
        
        const topicPanel = document.getElementById('exam-topics');
        if (topicPanel) {
            topicPanel.style.display = 'block';
            const topicList = document.getElementById('topic-list');
            if (topicList) {
                topicList.innerHTML = `
                    <span class="topic-tag">Comprehensive Review</span>
                    <span class="topic-tag">All Topics</span>
                    <span class="topic-tag">Study Mode</span>
                `;
            }
        }
    }
    
    setupBundeslandInfo(panel, stateName) {
        panel.style.display = 'block';
        const instructionList = document.getElementById('instruction-list');
        if (instructionList) {
            instructionList.innerHTML = `
                <li>Practice questions specific to ${stateName}</li>
                <li>Learn about your state's geography and politics</li>
                <li>Essential for state-specific exam section</li>
                <li>Covers local government and landmarks</li>
                <li>Instant feedback on all questions</li>
            `;
        }
        
        const bundeslandInfoPanel = document.getElementById('bundesland-info');
        if (bundeslandInfoPanel) {
            bundeslandInfoPanel.style.display = 'block';
            const stateDetails = document.getElementById('state-details');
            if (stateDetails) {
                // Get state capital from our data
                const stateCapitals = {
                    'Baden-Württemberg': 'Stuttgart',
                    'Bayern': 'München',
                    'Berlin': 'Berlin',
                    'Brandenburg': 'Potsdam',
                    'Bremen': 'Bremen',
                    'Hamburg': 'Hamburg',
                    'Hessen': 'Wiesbaden',
                    'Mecklenburg-Vorpommern': 'Schwerin',
                    'Niedersachsen': 'Hannover',
                    'Nordrhein-Westfalen': 'Düsseldorf',
                    'Rheinland-Pfalz': 'Mainz',
                    'Saarland': 'Saarbrücken',
                    'Sachsen': 'Dresden',
                    'Sachsen-Anhalt': 'Magdeburg',
                    'Schleswig-Holstein': 'Kiel',
                    'Thüringen': 'Erfurt'
                };
                
                const capital = stateCapitals[stateName] || 'Unknown';
                stateDetails.innerHTML = `
                    <div class="state-detail-item">
                        <span class="state-detail-label">State:</span>
                        <span>${stateName}</span>
                    </div>
                    <div class="state-detail-item">
                        <span class="state-detail-label">Capital:</span>
                        <span>${capital}</span>
                    </div>
                    <div class="state-detail-item">
                        <span class="state-detail-label">Questions:</span>
                        <span>${this.questions.length} available</span>
                    </div>
                `;
            }
        }
    }
    
    restartQuiz() {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode') || 'practice';
        this.startQuizPage(mode);
        
        // Hide results section
        const resultsSection = document.getElementById('results');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        // Show quiz section
        const quizSection = document.querySelector('.quiz-section');
        if (quizSection) {
            quizSection.style.display = 'block';
        }
    }
    
    // Direct question navigation
    jumpToQuestion(questionIndex) {
        if (questionIndex >= 0 && questionIndex < this.questions.length) {
            this.currentQuestion = questionIndex;
            this.loadQuestion();
            this.updateProgress();
            this.updateQuestionNavigation();
        }
    }
    
    // Navigation methods
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.loadQuestion();
            this.updateProgress();
            this.updateQuestionNavigation();
        } else {
            // Last question, finish quiz
            this.finishQuiz();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
            this.updateProgress();
            this.updateQuestionNavigation();
        }
    }
    
    updateQuestionNavigation() {
        const navContainer = document.getElementById('question-navigation');
        if (!navContainer) return;
        
        navContainer.innerHTML = '';
        
        // Ensure we have the correct number of questions loaded
        if (this.questions.length === 0) {
            console.log('No questions loaded yet');
            return;
        }
        
        console.log(`Creating navigation for ${this.questions.length} questions`);
        
        // Create question number buttons - exactly matching the number of questions
        this.questions.forEach((_, index) => {
            const button = document.createElement('button');
            button.className = 'question-nav-btn';
            button.textContent = index + 1;
            button.title = `Go to question ${index + 1}`;
            
            // Add status classes
            if (index === this.currentQuestion) {
                button.classList.add('current');
            }
            if (this.userAnswers[index] !== undefined) {
                button.classList.add('answered');
                if (this.showCorrectAnswer && this.userAnswers[index] === this.questions[index].correct) {
                    button.classList.add('correct');
                } else if (this.showCorrectAnswer && this.userAnswers[index] !== this.questions[index].correct) {
                    button.classList.add('incorrect');
                }
            }
            
            button.addEventListener('click', () => this.jumpToQuestion(index));
            navContainer.appendChild(button);
        });
        
        // Update the question counter display
        const currentSpans = document.querySelectorAll('.current');
        const totalSpans = document.querySelectorAll('.total');
        currentSpans.forEach(span => span.textContent = this.currentQuestion + 1);
        totalSpans.forEach(span => span.textContent = this.questions.length);
    }
    
    loadQuestion() {
        // Check if we have questions loaded
        if (!this.questions || this.questions.length === 0) {
            console.error('No questions loaded!');
            const questionText = document.getElementById('question-text');
            if (questionText) questionText.textContent = 'Error: No questions loaded. Please check the question file.';
            return;
        }
        
        // Check if current question index is valid
        if (this.currentQuestion >= this.questions.length) {
            console.error(`Invalid question index: ${this.currentQuestion} of ${this.questions.length}`);
            this.currentQuestion = 0;
        }
        
        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const currentSpan = document.querySelector('.current');
        const totalSpan = document.querySelector('.total');
        
        // Check if question exists
        if (!question) {
            console.error(`Question ${this.currentQuestion} not found!`);
            if (questionText) questionText.textContent = `Error: Question ${this.currentQuestion + 1} not found`;
            return;
        }
        
        console.log(`Loading question ${this.currentQuestion + 1}:`, question.question);
        
        if (questionText) questionText.textContent = question.question;
        if (currentSpan) currentSpan.textContent = this.currentQuestion + 1;
        if (totalSpan) totalSpan.textContent = this.questions.length;
        
        // Clear previous options and indicators
        this.clearAnswerIndicators();
        
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            // Check if question has options
            if (!question.options || question.options.length === 0) {
                console.error('Question has no options:', question);
                optionsContainer.innerHTML = '<div class="option disabled">Error: No options available</div>';
                return;
            }
            
            console.log(`Creating ${question.options.length} options`);
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => this.selectOption(index));
                optionsContainer.appendChild(optionElement);
                console.log(`Created option ${index + 1}: ${option}`);
            });
        } else {
            console.error('Options container not found in DOM');
        }
        
        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (prevBtn) prevBtn.disabled = this.currentQuestion === 0;
        if (nextBtn) nextBtn.textContent = this.currentQuestion === this.questions.length - 1 ? 'Beenden' : 'Weiter';
        
        // Restore user's previous selection and answer display if any
        if (this.userAnswers[this.currentQuestion] !== undefined) {
            this.showSelectedOption(this.userAnswers[this.currentQuestion]);
            if (this.showCorrectAnswer) {
                this.showCorrectAnswerIndicator(this.userAnswers[this.currentQuestion]);
            }
        }
    }
    
    selectOption(optionIndex) {
        this.userAnswers[this.currentQuestion] = optionIndex;
        this.showSelectedOption(optionIndex);
        
        // Show correct answer immediately if enabled
        if (this.showCorrectAnswer) {
            this.showCorrectAnswerIndicator(optionIndex);
        }
        
        // Check if answer is correct and update streak
        if (optionIndex === this.questions[this.currentQuestion].correct) {
            this.currentStreak++;
        } else {
            this.currentStreak = 0;
        }
        
        this.updateQuestionNavigation();
        this.checkAchievements();
    }
    
    showCorrectAnswerIndicator(selectedIndex) {
        const options = document.querySelectorAll('.option');
        const correctIndex = this.questions[this.currentQuestion].correct;
        
        options.forEach((option, index) => {
            option.classList.remove('correct-answer', 'wrong-answer');
            
            if (index === correctIndex) {
                option.classList.add('correct-answer');
                option.innerHTML += ' <span class="answer-indicator">✓ Richtig</span>';
            } else if (index === selectedIndex && selectedIndex !== correctIndex) {
                option.classList.add('wrong-answer');
                option.innerHTML += ' <span class="answer-indicator">✗ Falsch</span>';
            }
        });
        
        // Show explanation if available
        this.showAnswerExplanation();
    }
    
    showAnswerExplanation() {
        const explanationDiv = document.getElementById('answer-explanation');
        if (explanationDiv) {
            const question = this.questions[this.currentQuestion];
            const correctOption = question.options[question.correct];
            
            explanationDiv.innerHTML = `
                <div class="explanation-content">
                    <h4>Richtige Antwort:</h4>
                    <p class="correct-answer-text">${correctOption}</p>
                </div>
            `;
            explanationDiv.style.display = 'block';
        }
    }
    
    showSelectedOption(optionIndex) {
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            option.classList.remove('selected');
            if (index === optionIndex) {
                option.classList.add('selected');
            }
        });
    }
    
    clearAnswerIndicators() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('correct-answer', 'wrong-answer');
            const indicator = option.querySelector('.answer-indicator');
            if (indicator) {
                indicator.remove();
            }
        });
        
        const explanationDiv = document.getElementById('answer-explanation');
        if (explanationDiv) {
            explanationDiv.style.display = 'none';
        }
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.loadQuestion();
            this.updateProgress();
        } else {
            this.finishQuiz();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
            this.updateProgress();
        }
    }
    
    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        const progressText = document.querySelector('.progress-text');
        const progressSubtext = document.getElementById('progress-subtext');
        const progressCircle = document.querySelector('.progress-ring__circle.progress');
        
        if (progressText) progressText.textContent = `${Math.round(progress)}%`;
        
        // Update progress subtext based on mode
        if (progressSubtext) {
            const remaining = this.questions.length - (this.currentQuestion + 1);
            if (remaining === 0) {
                progressSubtext.textContent = 'Complete!';
            } else if (this.quizMode === 'exam') {
                progressSubtext.textContent = `${remaining} questions left`;
            } else {
                progressSubtext.textContent = `Question ${this.currentQuestion + 1}`;
            }
        }
        
        if (progressCircle) {
            const circumference = 2 * Math.PI * 52; // radius is 52
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
        
        // Update current stats
        this.calculateCurrentStats();
        
        // Update performance indicator for exam mode
        if (this.quizMode === 'exam') {
            this.updatePerformanceIndicator();
        }
    }
    
    updatePerformanceIndicator() {
        const statusFill = document.getElementById('status-fill');
        const statusText = document.getElementById('status-text');
        const remainingCount = document.getElementById('remaining-count');
        
        const answeredQuestions = this.userAnswers.filter(answer => answer !== undefined).length;
        const correctAnswers = this.userAnswers.filter((answer, index) => answer === this.questions[index].correct).length;
        const remaining = this.questions.length - answeredQuestions;
        const currentPercentage = answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0;
        const passThreshold = 51.5; // Need 17 out of 33 = 51.5%
        
        if (remainingCount) {
            remainingCount.textContent = remaining;
        }
        
        if (statusFill && statusText) {
            // Update performance bar
            const fillPercentage = Math.min(100, currentPercentage);
            statusFill.style.width = `${fillPercentage}%`;
            
            // Update color based on performance
            if (currentPercentage >= 80) {
                statusFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
                statusText.textContent = 'Excellent performance! 🌟';
            } else if (currentPercentage >= passThreshold) {
                statusFill.style.background = 'linear-gradient(90deg, #2196F3, #03A9F4)';
                statusText.textContent = 'On track to pass! 👍';
            } else if (answeredQuestions > 0) {
                statusFill.style.background = 'linear-gradient(90deg, #FF9800, #F57C00)';
                statusText.textContent = 'Keep improving! 💪';
            } else {
                statusText.textContent = 'Getting started...';
            }
        }
    }
    
    calculateCurrentStats() {
        let correct = 0;
        let wrong = 0;
        
        this.userAnswers.forEach((answer, index) => {
            if (answer !== undefined) {
                if (answer === this.questions[index].correct) {
                    correct++;
                } else {
                    wrong++;
                }
            }
        });
        
        const correctCount = document.getElementById('correct-count');
        const wrongCount = document.getElementById('wrong-count');
        
        if (correctCount) {
            const prevCorrect = parseInt(correctCount.textContent);
            correctCount.textContent = correct;
            
            // Add celebration effect when correct answers increase
            if (correct > prevCorrect) {
                correctCount.classList.add('sound-success');
                setTimeout(() => correctCount.classList.remove('sound-success'), 800);
            }
        }
        
        if (wrongCount) wrongCount.textContent = wrong;
        
        // Update achievements based on current progress
        this.checkAchievements();
    }
    
    finishQuiz() {
        this.calculateFinalResults();
        this.showResults();
        
        // Check if we're on the dedicated quiz page
        const quizPage = document.getElementById('results');
        if (quizPage) {
            // Hide quiz section and show results
            const quizSection = document.querySelector('.quiz-section');
            if (quizSection) quizSection.style.display = 'none';
            quizPage.style.display = 'block';
            
            // Smooth scroll to results
            quizPage.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Regular dashboard behavior
            this.scrollToSection('#statistics');
        }
        
        // Record quiz session for dashboard
        const timeSpent = Date.now() - (this.quizStartTime || Date.now());
        this.recordQuizSession(this.correctAnswers, this.questions.length, timeSpent);
    }
    
    calculateFinalResults() {
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        
        this.userAnswers.forEach((answer, index) => {
            if (answer === this.questions[index].correct) {
                this.correctAnswers++;
            } else {
                this.wrongAnswers++;
            }
        });
    }
    
    showResults() {
        const overallScore = Math.round((this.correctAnswers / this.questions.length) * 100);
        
        // Update statistics display
        const overallScoreEl = document.getElementById('overall-score');
        const totalCorrectEl = document.getElementById('total-correct');
        const totalWrongEl = document.getElementById('total-wrong');
        const averageScoreEl = document.getElementById('average-score');
        
        if (overallScoreEl) overallScoreEl.textContent = `${overallScore}%`;
        if (totalCorrectEl) totalCorrectEl.textContent = this.correctAnswers;
        if (totalWrongEl) totalWrongEl.textContent = this.wrongAnswers;
        if (averageScoreEl) averageScoreEl.textContent = `${overallScore}%`;
        
        // Update progress bar target
        const progressFill = document.querySelector('.stat-progress-fill');
        if (progressFill) {
            progressFill.setAttribute('data-target', overallScore);
        }
        
        // Animate the numbers
        this.animateNumbers();
        
        // Final achievement check
        this.checkAchievements();
        
        // Create celebration effects
        if (this.correctAnswers > 0) {
            const correctCelebration = document.getElementById('correct-celebration');
            if (correctCelebration) {
                correctCelebration.classList.add('active');
                setTimeout(() => correctCelebration.classList.remove('active'), 800);
            }
        }
        
        if (overallScore >= 80) {
            const averageGlow = document.getElementById('average-glow');
            if (averageGlow) {
                averageGlow.classList.add('active');
            }
        }
        
        // Show pass/fail message with enhanced styling
        const passScore = 17; // Need 17 out of 33 to pass
        const passed = this.correctAnswers >= passScore;
        const message = passed ? 
            'Herzlichen Glückwunsch! Sie haben bestanden!' : 
            'Leider nicht bestanden. Versuchen Sie es erneut!';
            
        setTimeout(() => {
            this.showCustomAlert(message, passed);
        }, 1500);
    }
    
    showCustomAlert(message, isSuccess = false) {
        // Create custom alert modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            background: white;
            padding: 3rem 2rem;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            text-align: center;
            max-width: 400px;
            margin: 2rem;
            transform: scale(0.8);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        const icon = isSuccess ? '🎉' : '😔';
        const color = isSuccess ? '#10b981' : '#ef4444';
        
        alertBox.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">${icon}</div>
            <h3 style="color: ${color}; font-size: 1.5rem; margin-bottom: 1rem; font-weight: 700;">${message}</h3>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: ${color}; color: white; border: none; padding: 0.75rem 2rem; 
                           border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 1rem;
                           transition: transform 0.2s ease;" 
                    onmouseover="this.style.transform='scale(1.05)'" 
                    onmouseout="this.style.transform='scale(1)'">
                OK
            </button>
        `;
        
        modal.appendChild(alertBox);
        document.body.appendChild(modal);
        
        // Animate in
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            alertBox.style.transform = 'scale(1)';
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            if (isNaN(finalValue)) return;
            
            const duration = 2000;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(finalValue * progress);
                
                if (stat.textContent.includes('%')) {
                    stat.textContent = `${currentValue}%`;
                } else {
                    stat.textContent = currentValue;
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            stat.textContent = '0';
            animate();
        });
        
        // Animate progress bars
        const progressBars = document.querySelectorAll('.stat-progress-fill');
        progressBars.forEach(bar => {
            const target = parseInt(bar.getAttribute('data-target')) || 0;
            setTimeout(() => {
                bar.style.width = `${target}%`;
            }, 500);
        });
    }
    
    setupParticleSystem() {
        const particleSystem = document.getElementById('particle-system');
        if (!particleSystem) return;
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            
            particleSystem.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 15000);
        };
        
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createParticle(), i * 200);
        }
        
        // Continue creating particles
        setInterval(createParticle, 800);
    }
    
    setupScrollIndicator() {
        // Create scroll indicator
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = '<div class="scroll-progress"></div>';
        document.body.appendChild(indicator);
        
        const progressBar = indicator.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    setupSoundEffects() {
        // Add sound effect classes to various elements
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .cta-primary, .cta-secondary')) {
                e.target.classList.add('sound-pop');
                setTimeout(() => e.target.classList.remove('sound-pop'), 300);
            }
            
            if (e.target.matches('.option')) {
                e.target.classList.add('sound-whoosh');
                setTimeout(() => e.target.classList.remove('sound-whoosh'), 600);
            }
        });
    }
    
    setupMagneticEffects() {
        const cards = document.querySelectorAll('.feature-card, .stat-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.1;
                card.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }
    
    checkAchievements() {
        // First question achievement
        if (this.userAnswers.length > 0 && !this.achievements['first-question']) {
            this.unlockAchievement('first-question');
        }
        
        // Streak achievements
        if (this.currentStreak >= 5 && !this.achievements['streak-5']) {
            this.unlockAchievement('streak-5');
        }
        
        // Half way achievement
        if (this.currentQuestion >= Math.floor(this.questions.length / 2) && !this.achievements['half-way']) {
            this.unlockAchievement('half-way');
        }
        
        // Perfect score achievement
        const correctPercentage = (this.correctAnswers / this.questions.length) * 100;
        if (correctPercentage === 100 && !this.achievements['perfect-score']) {
            this.unlockAchievement('perfect-score');
        }
    }
    
    unlockAchievement(achievementId) {
        this.achievements[achievementId] = true;
        const badge = document.querySelector(`[data-achievement="${achievementId}"]`);
        
        if (badge) {
            badge.classList.add('unlocked');
            badge.classList.add('sound-success');
            
            // Create celebration effect
            this.createCelebrationEffect(badge);
            
            setTimeout(() => {
                badge.classList.remove('sound-success');
            }, 800);
        }
    }
    
    createCelebrationEffect(element) {
        const rect = element.getBoundingClientRect();
        const celebration = document.createElement('div');
        celebration.className = 'achievement-celebration';
        celebration.style.position = 'fixed';
        celebration.style.left = rect.left + rect.width / 2 + 'px';
        celebration.style.top = rect.top + rect.height / 2 + 'px';
        celebration.style.zIndex = '10000';
        celebration.innerHTML = '🎉✨🎊';
        celebration.style.fontSize = '2rem';
        celebration.style.pointerEvents = 'none';
        
        document.body.appendChild(celebration);
        
        // Animate the celebration
        celebration.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(0.5) rotate(360deg)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }).onfinish = () => {
            document.body.removeChild(celebration);
        };
    }
    
    // Dashboard Methods
    loadUserData() {
        const savedData = localStorage.getItem('lebenDE_userData');
        if (savedData) {
            const userData = JSON.parse(savedData);
            this.userProfile = { ...this.userProfile, ...userData.profile };
            this.quizHistory = userData.history || [];
            this.studyStreak = userData.studyStreak || 0;
            this.weakAreas = userData.weakAreas || this.weakAreas;
            this.achievements = userData.achievements || this.achievements;
        }
        this.updateStudyStreak();
    }
    
    saveUserData() {
        const userData = {
            profile: this.userProfile,
            history: this.quizHistory,
            studyStreak: this.studyStreak,
            weakAreas: this.weakAreas,
            achievements: this.achievements,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('lebenDE_userData', JSON.stringify(userData));
    }
    
    setupDashboard() {
        this.updateDashboardDisplay();
        this.setupDashboardEventListeners();
        this.generateStreakCalendar();
    }
    
    setupDashboardEventListeners() {
        // Edit profile button
        const editProfileBtn = document.getElementById('edit-profile');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => this.showEditProfileModal());
        }
        
        // Avatar edit button
        const avatarEditBtn = document.getElementById('avatar-edit');
        if (avatarEditBtn) {
            avatarEditBtn.addEventListener('click', () => this.showAvatarSelector());
        }
        
        // Focus study button
        const focusStudyBtn = document.querySelector('.focus-study-btn');
        if (focusStudyBtn) {
            focusStudyBtn.addEventListener('click', () => this.startFocusedPractice());
        }
    }
    
    updateDashboardDisplay() {
        // Update profile information
        const profileName = document.getElementById('profile-name');
        const userAvatar = document.getElementById('user-avatar');
        const profileTotalSessions = document.getElementById('profile-total-sessions');
        const profileStudyTime = document.getElementById('profile-study-time');
        const profileSuccessRate = document.getElementById('profile-success-rate');
        
        if (profileName) profileName.textContent = this.userProfile.name;
        if (userAvatar) userAvatar.textContent = this.userProfile.avatar;
        if (profileTotalSessions) profileTotalSessions.textContent = this.userProfile.totalSessions;
        if (profileStudyTime) profileStudyTime.textContent = `${Math.floor(this.userProfile.studyTimeMinutes / 60)}h`;
        if (profileSuccessRate) profileSuccessRate.textContent = `${Math.round(this.userProfile.successRate)}%`;
        
        // Update dashboard progress
        this.updateDashboardProgress();
        
        // Update quick stats
        this.updateQuickStats();
        
        // Update recent activity
        this.updateRecentActivity();
        
        // Update streak display
        this.updateStreakDisplay();
        
        // Update achievements
        this.updateDashboardAchievements();
    }
    
    updateDashboardProgress() {
        const progressText = document.getElementById('dashboard-progress-text');
        const progressCircle = document.getElementById('dashboard-progress-circle');
        const dashboardCorrect = document.getElementById('dashboard-correct');
        const dashboardIncorrect = document.getElementById('dashboard-incorrect');
        const dashboardRemaining = document.getElementById('dashboard-remaining');
        
        const totalAnswered = this.userProfile.totalQuestionsAnswered;
        const correctAnswers = Math.round(totalAnswered * (this.userProfile.successRate / 100));
        const incorrectAnswers = totalAnswered - correctAnswers;
        const totalQuestions = this.questions.length;
        const progress = Math.min(100, (totalAnswered / totalQuestions) * 100);
        
        if (progressText) progressText.textContent = `${Math.round(progress)}%`;
        if (dashboardCorrect) dashboardCorrect.textContent = correctAnswers;
        if (dashboardIncorrect) dashboardIncorrect.textContent = incorrectAnswers;
        if (dashboardRemaining) dashboardRemaining.textContent = Math.max(0, totalQuestions - totalAnswered);
        
        if (progressCircle) {
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }
    }
    
    updateQuickStats() {
        const totalQuestionsAnswered = document.getElementById('total-questions-answered');
        const averageTime = document.getElementById('average-time');
        const bestStreak = document.getElementById('best-streak');
        const daysStudied = document.getElementById('days-studied');
        
        if (totalQuestionsAnswered) totalQuestionsAnswered.textContent = this.userProfile.totalQuestionsAnswered;
        if (averageTime) averageTime.textContent = `${Math.round(this.userProfile.averageAnswerTime)}s`;
        if (bestStreak) bestStreak.textContent = this.userProfile.bestStreak;
        if (daysStudied) daysStudied.textContent = this.userProfile.daysStudied;
    }
    
    updateRecentActivity() {
        const recentActivity = document.getElementById('recent-activity');
        if (!recentActivity) return;
        
        if (this.quizHistory.length === 0) {
            recentActivity.innerHTML = `
                <div class="activity-item empty">
                    <div class="activity-icon">🎯</div>
                    <div class="activity-content">
                        <p>Start your first quiz to see activity here!</p>
                        <span class="activity-time">No activity yet</span>
                    </div>
                </div>
            `;
            return;
        }
        
        const recentEntries = this.quizHistory.slice(-3).reverse();
        recentActivity.innerHTML = recentEntries.map(entry => {
            const timeAgo = this.formatTimeAgo(new Date(entry.date));
            const icon = entry.score >= 70 ? '✅' : entry.score >= 50 ? '⚠️' : '❌';
            return `
                <div class="activity-item">
                    <div class="activity-icon">${icon}</div>
                    <div class="activity-content">
                        <p>Quiz completed: ${entry.score}% (${entry.correct}/${entry.total})</p>
                        <span class="activity-time">${timeAgo}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updateStreakDisplay() {
        const currentStreak = document.getElementById('current-streak');
        const streakMessage = document.getElementById('streak-message');
        
        if (currentStreak) currentStreak.textContent = this.studyStreak;
        
        if (streakMessage) {
            if (this.studyStreak === 0) {
                streakMessage.textContent = 'Start studying to build your streak!';
            } else if (this.studyStreak === 1) {
                streakMessage.textContent = 'Great start! Keep it up tomorrow!';
            } else if (this.studyStreak < 5) {
                streakMessage.textContent = `You're building momentum! ${5 - this.studyStreak} more days to reach 5!`;
            } else {
                streakMessage.textContent = `Amazing streak! You're on fire! 🔥`;
            }
        }
    }
    
    updateDashboardAchievements() {
        const dashboardAchievements = document.getElementById('dashboard-achievements');
        if (!dashboardAchievements) return;
        
        const earnedAchievements = Object.entries(this.achievements)
            .filter(([key, earned]) => earned)
            .slice(-3);
        
        if (earnedAchievements.length === 0) {
            dashboardAchievements.innerHTML = `
                <div class="achievement-slot empty">
                    <div class="achievement-icon">❓</div>
                    <span class="achievement-name">Complete your first quiz!</span>
                </div>
                <div class="achievement-slot empty">
                    <div class="achievement-icon">❓</div>
                    <span class="achievement-name">Keep practicing!</span>
                </div>
                <div class="achievement-slot empty">
                    <div class="achievement-icon">❓</div>
                    <span class="achievement-name">More achievements await!</span>
                </div>
            `;
            return;
        }
        
        const achievementIcons = {
            'first-question': '🎯',
            'streak-5': '🔥',
            'half-way': '⚡',
            'perfect-score': '🏆'
        };
        
        const achievementNames = {
            'first-question': 'First Question',
            'streak-5': '5 Streak',
            'half-way': 'Half Way',
            'perfect-score': 'Perfect Score'
        };
        
        let html = '';
        for (let i = 0; i < 3; i++) {
            if (i < earnedAchievements.length) {
                const [key] = earnedAchievements[i];
                html += `
                    <div class="achievement-slot earned">
                        <div class="achievement-icon">${achievementIcons[key]}</div>
                        <span class="achievement-name">${achievementNames[key]}</span>
                    </div>
                `;
            } else {
                html += `
                    <div class="achievement-slot empty">
                        <div class="achievement-icon">❓</div>
                        <span class="achievement-name">Keep going!</span>
                    </div>
                `;
            }
        }
        
        dashboardAchievements.innerHTML = html;
    }
    
    generateStreakCalendar() {
        const streakCalendar = document.getElementById('streak-calendar');
        if (!streakCalendar) return;
        
        const today = new Date();
        const days = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            days.push(date);
        }
        
        streakCalendar.innerHTML = days.map(date => {
            const daysDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
            const isActive = daysDiff < this.studyStreak;
            return `<div class="calendar-day${isActive ? ' active' : ''}"></div>`;
        }).join('');
    }
    
    updateStudyStreak() {
        const today = new Date().toDateString();
        const lastStudyDate = this.userProfile.lastStudyDate;
        
        if (!lastStudyDate) {
            this.studyStreak = 0;
            return;
        }
        
        const lastDate = new Date(lastStudyDate);
        const daysDiff = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff > 1) {
            this.studyStreak = 0;
        } else if (daysDiff === 1 && lastDate.toDateString() !== today) {
            // This will be incremented when they complete a quiz today
        }
    }
    
    recordQuizSession(correct, total, timeSpent) {
        const score = Math.round((correct / total) * 100);
        const session = {
            date: new Date().toISOString(),
            correct: correct,
            total: total,
            score: score,
            timeSpent: timeSpent
        };
        
        this.quizHistory.push(session);
        
        // Update user profile stats
        this.userProfile.totalSessions++;
        this.userProfile.totalQuestionsAnswered += total;
        this.userProfile.studyTimeMinutes += Math.round(timeSpent / 60);
        
        // Update success rate (weighted average)
        const totalQuestions = this.userProfile.totalQuestionsAnswered;
        const totalCorrect = this.quizHistory.reduce((sum, session) => sum + session.correct, 0);
        this.userProfile.successRate = (totalCorrect / totalQuestions) * 100;
        
        // Update average answer time
        const totalTime = this.quizHistory.reduce((sum, session) => sum + session.timeSpent, 0);
        this.userProfile.averageAnswerTime = (totalTime / totalQuestions) / 1000;
        
        // Update best streak
        if (this.currentStreak > this.userProfile.bestStreak) {
            this.userProfile.bestStreak = this.currentStreak;
        }
        
        // Update study streak
        const today = new Date().toDateString();
        if (this.userProfile.lastStudyDate !== today) {
            this.studyStreak++;
            this.userProfile.lastStudyDate = today;
            
            // Count unique study days
            const uniqueDays = new Set(this.quizHistory.map(session => 
                new Date(session.date).toDateString()
            )).size;
            this.userProfile.daysStudied = uniqueDays;
        }
        
        this.saveUserData();
        this.updateDashboardDisplay();
    }
    
    startFocusedPractice() {
        // Find the weakest area
        let weakestArea = null;
        let lowestPercentage = 100;
        
        for (const [area, stats] of Object.entries(this.weakAreas)) {
            if (stats.total > 0) {
                const percentage = (stats.correct / stats.total) * 100;
                if (percentage < lowestPercentage) {
                    lowestPercentage = percentage;
                    weakestArea = area;
                }
            }
        }
        
        if (weakestArea) {
            this.showCustomAlert('Focus Practice', `Starting focused practice on: ${weakestArea}`, 'success');
        }
        
        // Start regular quiz for now (could be enhanced with topic-specific questions)
        this.startQuiz();
    }
    
    showEditProfileModal() {
        const currentName = this.userProfile.name;
        const newName = prompt('Enter your name:', currentName);
        
        if (newName && newName.trim() !== '') {
            this.userProfile.name = newName.trim();
            this.saveUserData();
            this.updateDashboardDisplay();
            this.showCustomAlert('Profile Updated', 'Your profile has been updated successfully!', 'success');
        }
    }
    
    showAvatarSelector() {
        const avatars = ['🇩🇪', '👨‍🎓', '👩‍🎓', '🎯', '📚', '🌟', '🚀', '💪', '🎉', '🏆'];
        const currentAvatar = this.userProfile.avatar;
        
        let message = 'Choose your avatar:\n\n';
        avatars.forEach((avatar, index) => {
            message += `${index + 1}. ${avatar}${avatar === currentAvatar ? ' (current)' : ''}\n`;
        });
        
        const choice = prompt(message + '\nEnter number (1-10):');
        const index = parseInt(choice) - 1;
        
        if (index >= 0 && index < avatars.length) {
            this.userProfile.avatar = avatars[index];
            this.saveUserData();
            this.updateDashboardDisplay();
            this.showCustomAlert('Avatar Updated', 'Your avatar has been updated!', 'success');
        }
    }
    
    formatTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    }
    
    // Bundesland Quiz Methods
    async loadBundeslandQuestions(bundesland) {
        try {
            const response = await fetch(`fragen/${bundesland}.txt`);
            const text = await response.text();
            
            // Parse the text file format for Bundesland questions
            const questions = this.parseBundeslandFile(text, bundesland);
            this.bundeslandQuestions[bundesland] = questions;
            
            console.log(`Loaded ${questions.length} questions for ${bundesland}`);
            return questions;
        } catch (error) {
            console.error(`Failed to load questions for ${bundesland}:`, error);
            return [];
        }
    }
    
    parseBundeslandFile(text, bundesland) {
        const questions = [];
        const lines = text.split('\n').map(line => line.trim()).filter(line => line);
        
        let currentQuestion = null;
        let currentOptions = [];
        let questionCounter = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Skip the bundesland header
            if (line === bundesland) continue;
            
            // Check if line starts with "Aufgabe" (new question)
            if (line.startsWith('Aufgabe')) {
                // Save previous question if exists
                if (currentQuestion && currentOptions.length > 0) {
                    questions.push({
                        id: questionCounter++,
                        question: currentQuestion,
                        options: [...currentOptions],
                        correct: 0 // Default to first option, should be parsed from answer key
                    });
                }
                
                // Start new question
                currentQuestion = null;
                currentOptions = [];
                continue;
            }
            
            // Question text (usually the line after "Aufgabe X")
            if (!currentQuestion && !line.startsWith('Bild') && !line.includes('○') && line.length > 10) {
                currentQuestion = line;
                continue;
            }
            
            // Options (lines that don't start with special markers)
            if (currentQuestion && !line.startsWith('Bild') && !line.startsWith('Aufgabe') && line.length > 2) {
                // Remove bullet points or special characters
                const cleanOption = line.replace(/^[○●•\-\s]*/, '').trim();
                if (cleanOption.length > 0) {
                    currentOptions.push(cleanOption);
                }
            }
        }
        
        // Add the last question
        if (currentQuestion && currentOptions.length > 0) {
            questions.push({
                id: questionCounter++,
                question: currentQuestion,
                options: [...currentOptions],
                correct: 0
            });
        }
        
        return questions;
    }
    
    async startBundeslandQuiz(bundesland) {
        // Load questions if not already loaded
        if (!this.bundeslandQuestions[bundesland]) {
            await this.loadBundeslandQuestions(bundesland);
        }
        
        const questions = this.bundeslandQuestions[bundesland];
        if (questions.length === 0) {
            this.showCustomAlert('Error', `No questions found for ${bundesland}`, false);
            return;
        }
        
        // Set up the quiz with Bundesland questions
        this.questions = questions;
        this.quizMode = 'bundesland';
        this.currentBundesland = bundesland;
        this.showCorrectAnswer = true;
        
        // Redirect to quiz page
        window.location.href = `quiz.html?mode=bundesland&state=${encodeURIComponent(bundesland)}`;
    }
}

// Global functions for Bundesland modal
function showBundeslandSelector() {
    const modal = document.getElementById('bundesland-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeBundeslandSelector() {
    const modal = document.getElementById('bundesland-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function startBundeslandQuiz(bundesland) {
    closeBundeslandSelector();
    if (window.quiz) {
        window.quiz.startBundeslandQuiz(bundesland);
    }
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    window.quiz = new LebenInDeutschlandQuiz();
    
    // Check for quiz mode parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const state = urlParams.get('state');
    
    if (mode) {
        // Wait a moment for quiz to initialize, then start with specified mode
        setTimeout(async () => {
            if (mode === 'bundesland' && state) {
                // Load and start Bundesland quiz
                await window.quiz.loadBundeslandQuestions(state);
                window.quiz.questions = window.quiz.bundeslandQuestions[state] || [];
                window.quiz.quizMode = 'bundesland';
                window.quiz.currentBundesland = state;
                window.quiz.startQuizPage('bundesland');
            } else if (['practice', 'exam', 'all', 'review'].includes(mode)) {
                // Wait for questions to load
                const checkQuestions = () => {
                    if (window.quiz.allQuestions.length > 0) {
                        window.quiz.startQuizPage(mode);
                    } else {
                        setTimeout(checkQuestions, 100);
                    }
                };
                checkQuestions();
            }
        }, 1000);
    }
    
    // Add scroll indicator to the page
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<div class="scroll-progress"></div>';
    document.body.prepend(indicator);
    
    // Enhanced cursor animation system (desktop only)
    if (window.innerWidth > 768) {
        // Create cursor elements
        const cursorDot = document.createElement('div');
        const cursorOutline = document.createElement('div');
        const cursorGlow = document.createElement('div');
        
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        cursorGlow.className = 'cursor-glow';
        
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
        document.body.appendChild(cursorGlow);
        
        let cursorTrails = [];
        let mouseX = 0, mouseY = 0;
        
        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update cursor dot position (immediate)
            cursorDot.style.left = (mouseX - 4) + 'px';
            cursorDot.style.top = (mouseY - 4) + 'px';
            
            // Update cursor glow position (immediate)
            cursorGlow.style.left = (mouseX - 50) + 'px';
            cursorGlow.style.top = (mouseY - 50) + 'px';
            
            // Create cursor trails
            if (cursorTrails.length < 8) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = (mouseX - 3) + 'px';
                trail.style.top = (mouseY - 3) + 'px';
                document.body.appendChild(trail);
                
                cursorTrails.push({
                    element: trail,
                    created: Date.now()
                });
                
                // Remove trail after animation
                setTimeout(() => {
                    if (trail.parentNode) {
                        trail.parentNode.removeChild(trail);
                    }
                    const index = cursorTrails.findIndex(t => t.element === trail);
                    if (index > -1) {
                        cursorTrails.splice(index, 1);
                    }
                }, 800);
            }
        });
        
        // Animated cursor outline follow
        function updateOutline() {
            const outlineRect = cursorOutline.getBoundingClientRect();
            const currentX = outlineRect.left + outlineRect.width / 2;
            const currentY = outlineRect.top + outlineRect.height / 2;
            
            const targetX = mouseX - 20;
            const targetY = mouseY - 20;
            
            cursorOutline.style.left = targetX + 'px';
            cursorOutline.style.top = targetY + 'px';
            
            requestAnimationFrame(updateOutline);
        }
        updateOutline();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .cta-primary, .cta-secondary, .option, .quiz-btn, .next-btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
                cursorGlow.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
                cursorGlow.classList.remove('hover');
            });
        });
        
        // Click effects
        document.addEventListener('mousedown', () => {
            cursorDot.classList.add('click');
            
            // Create click ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                left: ${mouseX - 15}px;
                top: ${mouseY - 15}px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
                pointer-events: none;
                z-index: 10002;
                animation: rippleEffect 0.6s ease-out forwards;
            `;
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        document.addEventListener('mouseup', () => {
            cursorDot.classList.remove('click');
        });
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleEffect {
                0% { transform: scale(1); opacity: 0.8; }
                100% { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});