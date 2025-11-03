import type { BundeslandRawQuestion } from "./bundeslaender";

export const BUNDESLAND_QUESTION_BANK: Record<string, BundeslandRawQuestion[]> = {
  "baden-wuerttemberg": [
    {
      "question": "Welches Wappen gehört zum Bundesland Baden-Württemberg?",
      "options": [
        "Baden-Württemberg",
        "Thüringen",
        "Sachsen-Anhalt",
        "Hamburg"
      ],
      "images": [
        "/assets/flags/baden-wuerttemberg.png",
        "/assets/flags/thueringen.png",
        "/assets/flags/sachsen-anhalt.png",
        "/assets/flags/hamburg.png"
      ],
      "correct": 0,
      "isImageQuestion": true,
      "imageType": "options",
      "hasImage": true
    },
    {
      "question": "Welches ist ein Landkreis in Baden-WÃ¼rttemberg?",
      "options": [
        "Mecklenburgische Seenplatte",
        "Neckar-Odenwald-Kreis",
        "Nordfriesland",
        "AltÃ¶tting"
      ],
      "correct": 1
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Baden-WÃ¼rttemberg gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Baden-WÃ¼rttemberg bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Baden-WÃ¼rttemberg?",
      "options": [
        "blau-weiÃŸ-rot",
        "schwarz-gold",
        "weiÃŸ-blau",
        "grÃ¼n-weiÃŸ-rot"
      ],
      "correct": 1
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Baden-WÃ¼rttemberg Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei den Kirchen"
      ],
      "correct": 2
    },
    {
      "question": "Die Landeshauptstadt von Baden-WÃ¼rttemberg heiÃŸt â€¦",
      "options": [
        "Heidelberg",
        "Stuttgart",
        "Karlsruhe",
        "Mannheim"
      ],
      "correct": 1
    },
    {
      "question": "Welches Bundesland ist Baden-WÃ¼rttemberg?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 3
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Baden-WÃ¼rttemberg?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "Premierministerin/Premierminister",
        "BÃ¼rgermeisterin/BÃ¼rgermeister",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident"
      ],
      "correct": 3
    },
    {
      "question": "Welche Ministerin/welchen Minister hat Baden-WÃ¼rttemberg nicht?",
      "options": [
        "Finanzministerin/Finanzminister",
        "Justizministerin/Justizminister",
        "Innenministerin/Innenminister",
        "AuÃŸenministerin/AuÃŸenminister"
      ],
      "correct": 3
    }
  ],
  "bayern": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Freistaat Bayern?",
      "options": [
        "Baden-WÃ¼rttemberg",
        "Bayern",
        "Sachsen-Anhalt",
        "Mecklenburg-Vorpommern"
      ],
      "images": [
        "picture/Baden-WÃ¼rttemberg.png",
        "picture/Bavaria.png",
        "picture/Saxony-Anhalt (Sachsen-Anhalt).png",
        "picture/Mecklenburg-Vorpommern.png"
      ],
      "correct": 1,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Bayern?",
      "options": [
        "Prignitz",
        "Rhein-Sieg-Kreis",
        "Nordfriesland",
        "AltÃ¶tting"
      ],
      "correct": 3
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Bayern gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Bayern bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Bayern?",
      "options": [
        "blau-weiÃŸ-rot",
        "weiÃŸ-blau",
        "grÃ¼n-weiÃŸ-rot",
        "schwarz-gelb"
      ],
      "correct": 1
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Bayern Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei der Verbraucherzentrale",
        "bei den Kirchen"
      ],
      "correct": 1
    },
    {
      "question": "Die Landeshauptstadt von Bayern heiÃŸt â€¦",
      "options": [
        "Ingolstadt",
        "Regensburg",
        "NÃ¼rnberg",
        "MÃ¼nchen"
      ],
      "correct": 3
    },
    {
      "question": "Welches Bundesland ist Bayern?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 3
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Bayern?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "Premierministerin/Premierminister",
        "BÃ¼rgermeisterin/BÃ¼rgermeister",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident"
      ],
      "correct": 3
    },
    {
      "question": "Welche Ministerin/welchen Minister hat Bayern nicht?",
      "options": [
        "Justizministerin/Justizminister",
        "AuÃŸenministerin/AuÃŸenminister",
        "Finanzministerin/Finanzminister",
        "Innenministerin/Innenminister"
      ],
      "correct": 1
    }
  ],
  "berlin": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Berlin?",
      "options": [
        "Hamburg",
        "Bremen",
        "Hessen",
        "Berlin"
      ],
      "images": [
        "picture/hamburg.png",
        "picture/bremen.png",
        "picture/hessen.png",
        "picture/berlin.png"
      ],
      "correct": 3,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Bezirk von Berlin?",
      "options": [
        "Altona",
        "Prignitz",
        "Pankow",
        "Mecklenburgische Seenplatte"
      ],
      "correct": 2
    },
    {
      "question": "FÃ¼r wie viele Jahre wird das Landesparlament in Berlin gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Berlin bei Kommunalwahlen (Wahl der Bezirksverordnetenversammlung) wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Berlin?",
      "options": [
        "blau-weiÃŸ-rot",
        "weiÃŸ-rot",
        "grÃ¼n-weiÃŸ-rot",
        "schwarz-gold"
      ],
      "correct": 1
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Berlin Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei den Kirchen",
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale fÃ¼r politische Bildung"
      ],
      "correct": 3
    },
    {
      "question": "Welches Bundesland ist ein Stadtstaat?",
      "options": [
        "Berlin",
        "Saarland",
        "Brandenburg",
        "Hessen"
      ],
      "correct": 0
    },
    {
      "question": "Welches Bundesland ist Berlin?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 3
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef des Stadtstaates Berlin?",
      "options": [
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "OberbÃ¼rgermeisterin/OberbÃ¼rgermeister",
        "PrÃ¤sidentin/PrÃ¤sident des Senates",
        "Regierende BÃ¼rgermeisterin/Regierender BÃ¼rgermeister"
      ],
      "correct": 3
    },
    {
      "question": "Welche Senatorin/welchen Senator hat Berlin nicht?",
      "options": [
        "Finanzsenatorin/Finanzsenator",
        "Innensenatorin/Innensenator",
        "Senatorin/Senator fÃ¼r AuÃŸenbeziehungen",
        "Justizsenatorin/Justizsenator"
      ],
      "correct": 2
    }
  ],
  "brandenburg": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Brandenburg?",
      "options": [
        "Brandenburg",
        "Rheinland-Pfalz",
        "Schleswig-Holstein",
        "Baden-WÃ¼rttemberg"
      ],
      "images": [
        "picture/Brandenburg.png",
        "picture/Rhineland-Palatinate (Rheinland-Pfalz).png",
        "picture/Bundesland Schleswig-Holstein flag.png",
        "picture/Baden-WÃ¼rttemberg.png"
      ],
      "correct": 0,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Brandenburg?",
      "options": [
        "Ammerland",
        "Rhein-Sieg-Kreis",
        "Prignitz",
        "Vogtlandkreis"
      ],
      "correct": 2
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Brandenburg gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Brandenburg bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Brandenburg?",
      "options": [
        "rot-weiÃŸ",
        "grÃ¼n-weiÃŸ-rot",
        "schwarz-gold",
        "blau-weiÃŸ-rot"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Brandenburg Ã¼ber politische Themen informieren?",
      "options": [
        "bei den Kirchen",
        "beim Ordnungsamt der Gemeinde",
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale fÃ¼r politische Bildung"
      ],
      "correct": 3
    },
    {
      "question": "Die Landeshauptstadt von Brandenburg heiÃŸt â€¦",
      "options": [
        "Cottbus",
        "Potsdam",
        "Brandenburg an der Havel",
        "Frankfurt (Oder)"
      ],
      "correct": 1
    },
    {
      "question": "Welches Bundesland ist Brandenburg?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 3
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Brandenburg?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "Premierministerin/Premierminister",
        "BÃ¼rgermeisterin/BÃ¼rgermeister",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident"
      ],
      "correct": 3
    },
    {
      "question": "Welche Ministerin/welchen Minister hat Brandenburg nicht?",
      "options": [
        "Justizministerin/Justizminister",
        "AuÃŸenministerin/AuÃŸenminister",
        "Finanzministerin/Finanzminister",
        "Innenministerin/Innenminister"
      ],
      "correct": 1
    }
  ],
  "bremen": [
    {
      "question": "Welches Wappen gehÃ¶rt zur Freien Hansestadt Bremen?",
      "options": [
        "Bremen",
        "Baden-WÃ¼rttemberg",
        "Hessen",
        "Bayern"
      ],
      "images": [
        "picture/bremen.png",
        "picture/Baden-WÃ¼rttemberg.png",
        "picture/hessen.png",
        "picture/Bavaria.png"
      ],
      "correct": 0,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Stadtteil von Bremen?",
      "options": [
        "Altona",
        "Hemelingen",
        "Pankow",
        "Findorff"
      ],
      "correct": 3
    },
    {
      "question": "FÃ¼r wie viele Jahre wird die Bremische BÃ¼rgerschaft gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 1
    },
    {
      "question": "Ab welchem Alter darf man in Bremen bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Bremen?",
      "options": [
        "rot-weiÃŸ",
        "grÃ¼n-weiÃŸ-rot",
        "schwarz-gold",
        "blau-weiÃŸ-rot"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Bremen Ã¼ber politische Themen informieren?",
      "options": [
        "bei den Kirchen",
        "beim Ordnungsamt der Gemeinde",
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale fÃ¼r politische Bildung"
      ],
      "correct": 3
    },
    {
      "question": "Welches Bundesland ist ein Stadtstaat?",
      "options": [
        "Bremen",
        "Sachsen",
        "Bayern",
        "ThÃ¼ringen"
      ],
      "correct": 0
    },
    {
      "question": "Welches Bundesland ist Bremen?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 3
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef des Stadtstaates Bremen?",
      "options": [
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "OberbÃ¼rgermeisterin/OberbÃ¼rgermeister",
        "PrÃ¤sidentin/PrÃ¤sident des Senates",
        "Regierende BÃ¼rgermeisterin/Regierender BÃ¼rgermeister"
      ],
      "correct": 2
    },
    {
      "question": "Welche Senatorin/welchen Senator hat Bremen nicht?",
      "options": [
        "Finanzsenatorin/Finanzsenator",
        "Innensenatorin/Innensenator",
        "Senatorin/Senator fÃ¼r AuÃŸenbeziehungen",
        "Justizsenatorin/Justizsenator"
      ],
      "correct": 2
    }
  ],
  "hamburg": [
    {
      "question": "Welches Wappen gehÃ¶rt zur Freien und Hansestadt Hamburg?",
      "options": [
        "Niedersachsen",
        "Hamburg",
        "Nordrhein-Westfalen",
        "Sachsen-Anhalt"
      ],
      "images": [
        "picture/Niedersachsen.png",
        "picture/hamburg.png",
        "picture/North Rhineâ€“Westphalia (Nordrhein-Westfalen).png",
        "picture/Saxony-Anhalt (Sachsen-Anhalt).png"
      ],
      "correct": 1,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Bezirk von Hamburg?",
      "options": [
        "Altona",
        "Hemelingen",
        "Pankow",
        "Mecklenburgische Seenplatte"
      ],
      "correct": 0
    },
    {
      "question": "FÃ¼r wie viele Jahre wird das Landesparlament in Hamburg gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 1
    },
    {
      "question": "Ab welchem Alter darf man in Hamburg bei Kommunalwahlen (Wahl der Bezirksversammlungen) wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Hamburg?",
      "options": [
        "blau-weiÃŸ-rot",
        "weiÃŸ-rot",
        "grÃ¼n-weiÃŸ-rot",
        "schwarz-gelb"
      ],
      "correct": 1
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Hamburg Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Verbraucherzentrale",
        "bei den Kirchen",
        "bei der Landeszentrale fÃ¼r politische Bildung"
      ],
      "correct": 3
    },
    {
      "question": "Welches Bundesland ist ein Stadtstaat?",
      "options": [
        "Hamburg",
        "Sachsen",
        "Bayern",
        "ThÃ¼ringen"
      ],
      "correct": 0
    },
    {
      "question": "Welches Bundesland ist Hamburg?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 3
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef des Stadtstaates Hamburg?",
      "options": [
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "Erste BÃ¼rgermeisterin/Erster BÃ¼rgermeister",
        "Regierende Senatorin/Regierender Senator",
        "OberbÃ¼rgermeisterin/OberbÃ¼rgermeister"
      ],
      "correct": 1
    },
    {
      "question": "Welche Senatorin/welchen Senator hat Hamburg nicht?",
      "options": [
        "Justizsenatorin/Justizsenator",
        "Senatorin/Senator fÃ¼r AuÃŸenbeziehungen",
        "Finanzsenatorin/Finanzsenator",
        "Innensenatorin/Innensenator"
      ],
      "correct": 1
    }
  ],
  "hessen": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Hessen?",
      "options": [
        "Hessen",
        "Berlin",
        "Schleswig-Holstein",
        "Sachsen"
      ],
      "images": [
        "picture/hessen.png",
        "picture/berlin.png",
        "picture/Bundesland Schleswig-Holstein flag.png",
        "picture/Saxony-Anhalt (Sachsen-Anhalt).png"
      ],
      "correct": 0,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Hessen?",
      "options": [
        "Ammerland",
        "AltÃ¶tting",
        "Uckermark",
        "Main-Taunus-Kreis"
      ],
      "correct": 3
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Hessen gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Hessen bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 2
    },
    {
      "question": "Welche Farben hat die Landesflagge von Hessen?",
      "options": [
        "schwarz-rot-gold",
        "rot-weiÃŸ",
        "weiÃŸ-rot",
        "grÃ¼n-weiÃŸ-rot"
      ],
      "correct": 1
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Hessen Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "beim Finanzamt"
      ],
      "correct": 2
    },
    {
      "question": "Die Landeshauptstadt von Hessen heiÃŸt...",
      "options": [
        "Kassel",
        "Frankfurt am Main",
        "Darmstadt",
        "Wiesbaden"
      ],
      "correct": 3
    },
    {
      "question": "Welches Bundesland ist Hessen?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 2
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef des Landes Hessen?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "Premierministerin/Premierminister",
        "BÃ¼rgermeisterin/BÃ¼rgermeister",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident"
      ],
      "correct": 3
    },
    {
      "question": "Welchen Minister/welche Ministerin hat das Land Hessen nicht?",
      "options": [
        "Justizminister/in",
        "AuÃŸenminister/in",
        "Finanzminister/in",
        "Innenminister/in"
      ],
      "correct": 1
    }
  ],
  "mecklenburg-vorpommern": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Mecklenburg-Vorpommern?",
      "options": [
        "ThÃ¼ringen",
        "Brandenburg",
        "Mecklenburg-Vorpommern",
        "Niedersachsen"
      ],
      "images": [
        "picture/Thuringia.png",
        "picture/Brandenburg.png",
        "picture/Mecklenburg-Vorpommern.png",
        "picture/Niedersachsen.png"
      ],
      "correct": 2,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Mecklenburg-Vorpommern?",
      "options": [
        "Ammerland",
        "AltÃ¶tting",
        "Mecklenburgische Seenplatte",
        "Uckermark"
      ],
      "correct": 2
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Mecklenburg-Vorpommern gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Mecklenburg-Vorpommern bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Mecklenburg-Vorpommern?",
      "options": [
        "blau-weiÃŸ-rot",
        "weiÃŸ-rot",
        "gelb-rot-blau",
        "schwarz-gelb"
      ],
      "correct": 2
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Mecklenburg-Vorpommern Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "beim Finanzamt"
      ],
      "correct": 2
    },
    {
      "question": "Die Landeshauptstadt von Mecklenburg-Vorpommern heiÃŸt...",
      "options": [
        "Rostock",
        "Stralsund",
        "Greifswald",
        "Schwerin"
      ],
      "correct": 3
    },
    {
      "question": "Welches Bundesland ist Mecklenburg-Vorpommern?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 0
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef des Landes Mecklenburg-Vorpommern?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "Premierministerin/Premierminister",
        "BÃ¼rgermeisterin/BÃ¼rgermeister",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident"
      ],
      "correct": 3
    },
    {
      "question": "Welchen Minister/welche Ministerin hat das Land Mecklenburg-Vorpommern nicht?",
      "options": [
        "Justizminister/in",
        "AuÃŸenminister/in",
        "Finanzminister/in",
        "Innenminister/in"
      ],
      "correct": 1
    }
  ],
  "niedersachsen": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Niedersachsen?",
      "options": [
        "Bayern",
        "Schleswig-Holstein",
        "Niedersachsen",
        "Sachsen"
      ],
      "images": [
        "picture/Bavaria.png",
        "picture/Bundesland Schleswig-Holstein flag.png",
        "picture/Niedersachsen.png",
        "picture/Saxony (Sachsen).png"
      ],
      "correct": 2,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Niedersachsen?",
      "options": [
        "Ammerland",
        "RhÃ¶n-Grabfeld",
        "Vogtlandkreis",
        "Spree-NeiÃŸe"
      ],
      "correct": 0
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Niedersachsen gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Niedersachsen bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Niedersachsen?",
      "options": [
        "schwarz-rot-gold",
        "schwarz-gelb",
        "schwarz-weiÃŸ-rot",
        "rot-weiÃŸ"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Niedersachsen Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei den Kirchen"
      ],
      "correct": 2
    },
    {
      "question": "Die Landeshauptstadt von Niedersachsen heiÃŸt ...",
      "options": [
        "Hannover",
        "Oldenburg",
        "Braunschweig",
        "GÃ¶ttingen"
      ],
      "correct": 0
    },
    {
      "question": "Welches Bundesland ist Niedersachsen?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 2
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Niedersachsen?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "PrÃ¤sidentin/PrÃ¤sident des Landes",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "LandrÃ¤tin/Landrat"
      ],
      "correct": 2
    },
    {
      "question": "Welche Ministerin/welchen Minister hat Niedersachsen nicht?",
      "options": [
        "Justizministerin/Justizminister",
        "AuÃŸenministerin/AuÃŸenminister",
        "Finanzministerin/Finanzminister",
        "Innenministerin/Innenminister"
      ],
      "correct": 1
    }
  ],
  "nordrhein-westfalen": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Nordrhein-Westfalen?",
      "options": [
        "Bremen",
        "Nordrhein-Westfalen",
        "Sachsen-Anhalt",
        "Baden-WÃ¼rttemberg"
      ],
      "images": [
        "picture/bremen.png",
        "picture/North Rhineâ€“Westphalia (Nordrhein-Westfalen).png",
        "picture/Saxony-Anhalt (Sachsen-Anhalt).png",
        "picture/Baden-WÃ¼rttemberg.png"
      ],
      "correct": 1,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Nordrhein-Westfalen?",
      "options": [
        "Ammerland",
        "Rhein-Sieg-Kreis",
        "Nordfriesland",
        "Vogtlandkreis"
      ],
      "correct": 1
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Nordrhein-Westfalen gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Nordrhein-Westfalen bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Nordrhein-Westfalen?",
      "options": [
        "rot-weiÃŸ",
        "grÃ¼n-weiÃŸ-rot",
        "schwarz-gold",
        "blau-weiÃŸ-rot"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Nordrhein-Westfalen Ã¼ber politische Themen informieren?",
      "options": [
        "bei den Kirchen",
        "beim Ordnungsamt der Gemeinde",
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale fÃ¼r politische Bildung"
      ],
      "correct": 3
    },
    {
      "question": "Die Landeshauptstadt von Nordrhein-Westfalen heiÃŸt â€¦",
      "options": [
        "KÃ¶ln",
        "Bonn",
        "DÃ¼sseldorf",
        "Dortmund"
      ],
      "correct": 2
    },
    {
      "question": "Welches Bundesland ist Nordrhein-Westfalen?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 3
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Nordrhein-Westfalen?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "Premierministerin/Premierminister",
        "BÃ¼rgermeisterin/BÃ¼rgermeister",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident"
      ],
      "correct": 3
    },
    {
      "question": "Welche Ministerin/welchen Minister hat Nordrhein-Westfalen nicht?",
      "options": [
        "Justizministerin/Justizminister",
        "AuÃŸenministerin/AuÃŸenminister",
        "Finanzministerin/Finanzminister",
        "Innenministerin/Innenminister"
      ],
      "correct": 1
    }
  ],
  "rheinland-pfalz": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Rheinland-Pfalz?",
      "options": [
        "Rheinland-Pfalz",
        "Hamburg",
        "ThÃ¼ringen",
        "Schleswig-Holstein"
      ],
      "images": [
        "picture/Rhineland-Palatinate (Rheinland-Pfalz).png",
        "picture/hamburg.png",
        "picture/Thuringia.png",
        "picture/Bundesland Schleswig-Holstein flag.png"
      ],
      "correct": 0,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Rheinland-Pfalz?",
      "options": [
        "Rhein-Pfalz-Kreis",
        "Rhein-Neckar-Kreis",
        "Rhein-Erft-Kreis",
        "MÃ¤rkischer Kreis"
      ],
      "correct": 0
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Rheinland-Pfalz gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Rheinland-Pfalz bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Rheinland-Pfalz?",
      "options": [
        "schwarz-rot-gold",
        "schwarz-gelb",
        "schwarz-weiÃŸ-rot",
        "rot-weiÃŸ-blau"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Rheinland-Pfalz Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei der Verbraucherzentrale",
        "bei den Kirchen"
      ],
      "correct": 1
    },
    {
      "question": "Die Landeshauptstadt von Rheinland-Pfalz heiÃŸt ...",
      "options": [
        "Koblenz",
        "Kaiserslautern",
        "Trier",
        "Mainz"
      ],
      "correct": 3
    },
    {
      "question": "Welches Bundesland ist Rheinland-Pfalz?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 1
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Rheinland-Pfalz?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "PrÃ¤sidentin/PrÃ¤sident des Landes",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "LandrÃ¤tin/Landrat"
      ],
      "correct": 2
    },
    {
      "question": "Welche Ministerin/welchen Minister hat Rheinland-Pfalz nicht?",
      "options": [
        "Justizministerin/Justizminister",
        "AuÃŸenministerin/AuÃŸenminister",
        "Finanzministerin/Finanzminister",
        "Innenministerin/Innenminister"
      ],
      "correct": 1
    }
  ],
  "saarland": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Saarland?",
      "options": [
        "Saarland",
        "Hessen",
        "Sachsen-Anhalt",
        "Schleswig-Holstein"
      ],
      "images": [
        "picture/saarland.png",
        "picture/hessen.png",
        "picture/sachsen-anhalt.png",
        "picture/Bundesland Schleswig-Holstein flag.png"
      ],
      "correct": 0,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis im Saarland?",
      "options": [
        "Saarpfalz-Kreis",
        "Rhein-Neckar-Kreis",
        "Rhein-Erft-Kreis",
        "MÃ¤rkischer Kreis"
      ],
      "correct": 0
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag im Saarland gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man im Saarland bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge des Saarlandes?",
      "options": [
        "schwarz-rot-gold",
        "blau-weiÃŸ-rot",
        "schwarz-weiÃŸ-rot",
        "rot-weiÃŸ-blau"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich im Saarland Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei der Verbraucherzentrale",
        "bei den Kirchen"
      ],
      "correct": 1
    },
    {
      "question": "Die Landeshauptstadt des Saarlandes heiÃŸt ...",
      "options": [
        "VÃ¶lklingen",
        "Neunkirchen",
        "Homburg",
        "SaarbrÃ¼cken"
      ],
      "correct": 3
    },
    {
      "question": "Welches Bundesland ist das Saarland?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 2
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef im Saarland?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "PrÃ¤sidentin/PrÃ¤sident des Landes",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "LandrÃ¤tin/Landrat"
      ],
      "correct": 2
    },
    {
      "question": "Welche Ministerin/welchen Minister hat das Saarland nicht?",
      "options": [
        "Justizministerin/Justizminister",
        "AuÃŸenministerin/AuÃŸenminister",
        "Finanzministerin/Finanzminister",
        "Innenministerin/Innenminister"
      ],
      "correct": 1
    }
  ],
  "sachsen-anhalt": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Sachsen-Anhalt?",
      "options": [
        "Bayern",
        "Hamburg",
        "Rheinland-Pfalz",
        "Sachsen-Anhalt"
      ],
      "images": [
        "picture/Bavaria.png",
        "picture/hamburg.png",
        "picture/Rhineland-Palatinate (Rheinland-Pfalz).png",
        "picture/Saxony-Anhalt (Sachsen-Anhalt).png"
      ],
      "correct": 3,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Sachsen-Anhalt?",
      "options": [
        "BÃ¶rde",
        "RhÃ¶n-Grabfeld",
        "Vogtlandkreis",
        "Spree-NeiÃŸe"
      ],
      "correct": 0
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Sachsen-Anhalt gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Sachsen-Anhalt bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Sachsen-Anhalt?",
      "options": [
        "schwarz-rot-gold",
        "gelb-schwarz",
        "schwarz-weiÃŸ-rot",
        "rot-weiÃŸ-blau"
      ],
      "correct": 1
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Sachsen-Anhalt Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei der Verbraucherzentrale",
        "bei den Kirchen"
      ],
      "correct": 1
    },
    {
      "question": "Die Landeshauptstadt von Sachsen-Anhalt heiÃŸt ...",
      "options": [
        "Halle",
        "Dessau",
        "Magdeburg",
        "Wittenberg"
      ],
      "correct": 2
    },
    {
      "question": "Welches Bundesland ist Sachsen-Anhalt?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 3
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Sachsen-Anhalt?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "PrÃ¤sidentin/PrÃ¤sident des Landes",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "LandrÃ¤tin/Landrat"
      ],
      "correct": 2
    },
    {
      "question": "Welche Ministerin/welchen Minister hat Sachsen-Anhalt nicht?",
      "options": [
        "Justizministerin/Justizminister",
        "AuÃŸenministerin/AuÃŸenminister",
        "Finanzministerin/Finanzminister",
        "Innenministerin/Innenminister"
      ],
      "correct": 1
    }
  ],
  "sachsen": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Freistaat Sachsen?",
      "options": [
        "Bayern",
        "Berlin",
        "Niedersachsen",
        "Sachsen"
      ],
      "images": [
        "picture/Bavaria.png",
        "picture/Berlin.png",
        "picture/Niedersachsen.png",
        "picture/Saxony (Sachsen).png"
      ],
      "correct": 3,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in Sachsen?",
      "options": [
        "Vogtlandkreis",
        "Neckar-Odenwald-Kreis",
        "Rhein-Erft-Kreis",
        "MÃ¤rkischer Kreis"
      ],
      "correct": 0
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Sachsen gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Sachsen bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 2
    },
    {
      "question": "Welche Farben hat die Landesflagge von Sachsen?",
      "options": [
        "weiÃŸ-grÃ¼n",
        "schwarz-gelb",
        "schwarz-weiÃŸ-rot",
        "rot-weiÃŸ-blau"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Sachsen Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei der Verbraucherzentrale",
        "bei den Kirchen"
      ],
      "correct": 1
    },
    {
      "question": "Die Landeshauptstadt von Sachsen heiÃŸt ...",
      "options": [
        "Leipzig",
        "Chemnitz",
        "Dresden",
        "Zwickau"
      ],
      "correct": 2
    },
    {
      "question": "Welches Bundesland ist Sachsen?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 2
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Sachsen?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "PrÃ¤sidentin/PrÃ¤sident des Landes",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "LandrÃ¤tin/Landrat"
      ],
      "correct": 2
    },
    {
      "question": "Welche Ministerin/welchen Minister hat Sachsen nicht?",
      "options": [
        "Justizministerin/Justizminister",
        "AuÃŸenministerin/AuÃŸenminister",
        "Finanzministerin/Finanzminister",
        "Innenministerin/Innenminister"
      ],
      "correct": 1
    }
  ],
  "schleswig-holstein": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Bundesland Schleswig-Holstein?",
      "options": [
        "Saarland",
        "Berlin",
        "Schleswig-Holstein",
        "ThÃ¼ringen"
      ],
      "images": [
        "picture/Saarland.png",
        "picture/berlin.png",
        "picture/Bundesland Schleswig-Holstein flag.png",
        "picture/Thuringia.png"
      ],
      "correct": 2,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Kreis in Schleswig-Holstein?",
      "options": [
        "Ammerland",
        "Dithmarschen",
        "RhÃ¶n-Grabfeld",
        "Vogtlandkreis"
      ],
      "correct": 1
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in Schleswig-Holstein gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in Schleswig-Holstein bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von Schleswig-Holstein?",
      "options": [
        "blau-weiÃŸ-rot",
        "schwarz-rot-gold",
        "rot-weiÃŸ-blau",
        "grÃ¼n-weiÃŸ-rot"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in Schleswig-Holstein Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei der Verbraucherzentrale",
        "bei den Kirchen"
      ],
      "correct": 1
    },
    {
      "question": "Die Landeshauptstadt von Schleswig-Holstein heiÃŸt ...",
      "options": [
        "LÃ¼beck",
        "Flensburg",
        "Kiel",
        "NeumÃ¼nster"
      ],
      "correct": 2
    },
    {
      "question": "Welches Meer grenzt an Schleswig-Holstein?",
      "options": [
        "Mittelmeer",
        "Nordsee",
        "Schwarzes Meer",
        "Adriatisches Meer"
      ],
      "correct": 1
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in Schleswig-Holstein?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "PrÃ¤sidentin/PrÃ¤sident des Landes",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "LandrÃ¤tin/Landrat"
      ],
      "correct": 2
    },
    {
      "question": "Welche berÃ¼hmte MeeresstraÃŸe liegt zwischen Schleswig-Holstein und DÃ¤nemark?",
      "options": [
        "Ã„rmelkanal",
        "StraÃŸe von Gibraltar",
        "Kleine Belt",
        "Ã–resund"
      ],
      "correct": 2
    }
  ],
  "thueringen": [
    {
      "question": "Welches Wappen gehÃ¶rt zum Freistaat ThÃ¼ringen?",
      "options": [
        "Baden-WÃ¼rttemberg",
        "Mecklenburg-Vorpommern",
        "Sachsen",
        "ThÃ¼ringen"
      ],
      "images": [
        "picture/Baden-WÃ¼rttemberg.png",
        "picture/Mecklenburg-Vorpommern.png",
        "picture/Saxony (Sachsen).png",
        "picture/Thuringia.png"
      ],
      "correct": 3,
      "isImageQuestion": true
    },
    {
      "question": "Welches ist ein Landkreis in ThÃ¼ringen?",
      "options": [
        "Ammerland",
        "AltÃ¶tting",
        "Nordfriesland",
        "Wartburgkreis"
      ],
      "correct": 3
    },
    {
      "question": "FÃ¼r wie viele Jahre wird der Landtag in ThÃ¼ringen gewÃ¤hlt?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correct": 2
    },
    {
      "question": "Ab welchem Alter darf man in ThÃ¼ringen bei Kommunalwahlen wÃ¤hlen?",
      "options": [
        "14",
        "16",
        "18",
        "20"
      ],
      "correct": 1
    },
    {
      "question": "Welche Farben hat die Landesflagge von ThÃ¼ringen?",
      "options": [
        "weiÃŸ-rot",
        "blau-weiÃŸ-rot",
        "schwarz-rot-gold",
        "grÃ¼n-weiÃŸ-rot"
      ],
      "correct": 0
    },
    {
      "question": "Wo kÃ¶nnen Sie sich in ThÃ¼ringen Ã¼ber politische Themen informieren?",
      "options": [
        "beim Ordnungsamt der Gemeinde",
        "bei der Landeszentrale fÃ¼r politische Bildung",
        "bei der Verbraucherzentrale",
        "bei den Kirchen"
      ],
      "correct": 1
    },
    {
      "question": "Die Landeshauptstadt von ThÃ¼ringen heiÃŸt ...",
      "options": [
        "Jena",
        "Gera",
        "Erfurt",
        "Weimar"
      ],
      "correct": 2
    },
    {
      "question": "Welcher berÃ¼hmte Komponist lebte in ThÃ¼ringen?",
      "options": [
        "Mozart",
        "Beethoven",
        "Bach",
        "Brahms"
      ],
      "correct": 2
    },
    {
      "question": "Wie nennt man die Regierungschefin/den Regierungschef in ThÃ¼ringen?",
      "options": [
        "Erste Ministerin/Erster Minister",
        "PrÃ¤sidentin/PrÃ¤sident des Landes",
        "MinisterprÃ¤sidentin/MinisterprÃ¤sident",
        "LandrÃ¤tin/Landrat"
      ],
      "correct": 2
    },
    {
      "question": "Welcher berÃ¼hmte Nationalpark liegt in ThÃ¼ringen?",
      "options": [
        "Nationalpark Bayerischer Wald",
        "Nationalpark Hainich",
        "Nationalpark Eifel",
        "Nationalpark Schwarzwald"
      ],
      "correct": 1
    }
  ]
} as const;
