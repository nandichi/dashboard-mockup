export interface Kandidaat {
  rang: number;
  naam: string;
  score: number;
  reden: string;
  motivatie?: string;
  breakdown: {
    vakgebied: number;
    beschikbaar: number;
    regio: number;
    certificeringen: number;
    ervaring: number;
  };
}

export interface MatchGroep {
  id: string;
  vacatureTitel: string;
  bedrijf: string;
  locatie: string;
  vakgebied: string;
  categorie: 'hot' | 'warm' | 'cold';
  kandidaten: Kandidaat[];
  datum: string;
  outreachStatus?: 'pending' | 'approved' | 'sent';
}

export const matches: MatchGroep[] = [
  {
    id: 'm1',
    vacatureTitel: 'Elektromonteur Industrieel',
    bedrijf: 'VDL Groep',
    locatie: 'Eindhoven',
    vakgebied: 'Elektrotechniek',
    categorie: 'hot',
    datum: '31-03-2026',
    outreachStatus: 'pending',
    kandidaten: [
      {
        rang: 1, naam: 'Pieter van den Berg', score: 92,
        reden: '8 jaar ervaring elektrotechniek, VCA en NEN3140, woont in Eindhoven',
        motivatie: 'Pieter is een uitstekende match vanwege zijn uitgebreide ervaring in de industriele elektrotechniek. Hij beschikt over alle vereiste certificeringen (VCA en NEN3140) en woont op loopafstand van de werklocatie in Eindhoven. Zijn achtergrond bij vergelijkbare bedrijven in de regio maakt hem direct inzetbaar.',
        breakdown: { vakgebied: 95, beschikbaar: 90, regio: 98, certificeringen: 95, ervaring: 85 },
      },
      {
        rang: 2, naam: 'Ahmed Hassan', score: 87,
        reden: '6 jaar industrieel monteur, alle certificeringen, regio Brabant',
        breakdown: { vakgebied: 90, beschikbaar: 85, regio: 80, certificeringen: 95, ervaring: 80 },
      },
      {
        rang: 3, naam: 'Tom Hendriks', score: 81,
        reden: '10 jaar ervaring, beschikbaar per direct, iets verder weg (Utrecht)',
        breakdown: { vakgebied: 85, beschikbaar: 95, regio: 55, certificeringen: 80, ervaring: 90 },
      },
    ],
  },
  {
    id: 'm2',
    vacatureTitel: 'Storingsmonteur Elektro',
    bedrijf: 'Vanderlande',
    locatie: 'Veghel',
    vakgebied: 'Elektrotechniek',
    categorie: 'hot',
    datum: '31-03-2026',
    outreachStatus: 'approved',
    kandidaten: [
      {
        rang: 1, naam: 'Kevin de Jong', score: 89,
        reden: 'Specialisatie in storingen, PLC ervaring, woont in Veghel',
        breakdown: { vakgebied: 92, beschikbaar: 90, regio: 98, certificeringen: 85, ervaring: 80 },
      },
      {
        rang: 2, naam: 'Mark Willems', score: 83,
        reden: '7 jaar storingsmonteur, VCA basis, regio Noord-Brabant',
        breakdown: { vakgebied: 85, beschikbaar: 80, regio: 85, certificeringen: 75, ervaring: 85 },
      },
    ],
  },
  {
    id: 'm3',
    vacatureTitel: 'Servicemonteur Elektro',
    bedrijf: 'Engie',
    locatie: 'Amsterdam',
    vakgebied: 'Elektrotechniek',
    categorie: 'hot',
    datum: '30-03-2026',
    outreachStatus: 'pending',
    kandidaten: [
      {
        rang: 1, naam: 'Bas Vermeer', score: 85,
        reden: 'Service-achtergrond, NEN1010, regio Randstad',
        breakdown: { vakgebied: 88, beschikbaar: 85, regio: 80, certificeringen: 90, ervaring: 75 },
      },
      {
        rang: 2, naam: 'Rick Jansen', score: 79,
        reden: '5 jaar ervaring, beschikbaar direct',
        breakdown: { vakgebied: 80, beschikbaar: 95, regio: 65, certificeringen: 70, ervaring: 75 },
      },
    ],
  },
  {
    id: 'm4',
    vacatureTitel: 'CNC Draaier/Frezer',
    bedrijf: 'ASML',
    locatie: 'Veldhoven',
    vakgebied: 'CNC',
    categorie: 'warm',
    datum: '30-03-2026',
    kandidaten: [
      {
        rang: 1, naam: 'Dennis Smits', score: 78,
        reden: 'CNC ervaring maar geen 5-assig, goede regio',
        breakdown: { vakgebied: 75, beschikbaar: 85, regio: 90, certificeringen: 65, ervaring: 75 },
      },
      {
        rang: 2, naam: 'Jan-Willem Kuiper', score: 71,
        reden: 'Brede verspaner, certificeringen komen overeen',
        breakdown: { vakgebied: 70, beschikbaar: 70, regio: 70, certificeringen: 75, ervaring: 70 },
      },
    ],
  },
  {
    id: 'm5',
    vacatureTitel: 'Werktuigbouwkundig Monteur',
    bedrijf: 'DAF Trucks',
    locatie: 'Eindhoven',
    vakgebied: 'Werktuigbouwkunde',
    categorie: 'warm',
    datum: '29-03-2026',
    kandidaten: [
      {
        rang: 1, naam: 'Stefan Bakker', score: 76,
        reden: 'Werktuigbouw achtergrond, goede certificeringen',
        breakdown: { vakgebied: 80, beschikbaar: 75, regio: 70, certificeringen: 80, ervaring: 70 },
      },
      {
        rang: 2, naam: 'Marco van Dijk', score: 72,
        reden: 'Ruime ervaring, iets verder weg',
        breakdown: { vakgebied: 75, beschikbaar: 70, regio: 55, certificeringen: 75, ervaring: 85 },
      },
    ],
  },
  {
    id: 'm6',
    vacatureTitel: 'Monteur Werktuigbouw',
    bedrijf: 'Boskalis',
    locatie: 'Papendrecht',
    vakgebied: 'Werktuigbouwkunde',
    categorie: 'warm',
    datum: '29-03-2026',
    kandidaten: [
      {
        rang: 1, naam: 'Patrick Groen', score: 74,
        reden: 'Werktuigbouw, beschikbaar, regio Zuid-Holland',
        breakdown: { vakgebied: 78, beschikbaar: 80, regio: 70, certificeringen: 65, ervaring: 72 },
      },
    ],
  },
  {
    id: 'm7',
    vacatureTitel: 'Lasser TIG/MIG',
    bedrijf: 'Heerema',
    locatie: 'Rotterdam',
    vakgebied: 'Lassen',
    categorie: 'cold',
    datum: '28-03-2026',
    kandidaten: [
      {
        rang: 1, naam: 'Ibrahim El-Fassi', score: 64,
        reden: 'TIG gecertificeerd maar beperkte ervaring, woont ver weg',
        breakdown: { vakgebied: 70, beschikbaar: 65, regio: 40, certificeringen: 75, ervaring: 50 },
      },
    ],
  },
  {
    id: 'm8',
    vacatureTitel: 'Bankwerker/Lasser',
    bedrijf: 'Tata Steel',
    locatie: 'IJmuiden',
    vakgebied: 'Werktuigbouwkunde',
    categorie: 'cold',
    datum: '28-03-2026',
    kandidaten: [
      {
        rang: 1, naam: 'Henk de Graaf', score: 61,
        reden: 'Ervaren maar beperkte beschikbaarheid',
        breakdown: { vakgebied: 65, beschikbaar: 35, regio: 60, certificeringen: 80, ervaring: 75 },
      },
    ],
  },
];
