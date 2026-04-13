export interface Vacature {
  id: string;
  titel: string;
  bedrijf: string;
  locatie: string;
  vakgebied: string;
  datum: string;
  bron: string;
  status: string;
  link: string;
}

export const vacatures: Vacature[] = [
  { id: '1', titel: 'Elektromonteur Industrieel', bedrijf: 'VDL Groep', locatie: 'Eindhoven', vakgebied: 'Elektrotechniek', datum: '28-03-2026', bron: 'Indeed', status: 'Nieuw', link: '#' },
  { id: '2', titel: 'CNC Draaier/Frezer', bedrijf: 'ASML', locatie: 'Veldhoven', vakgebied: 'CNC', datum: '27-03-2026', bron: 'Google', status: 'Gematcht', link: '#' },
  { id: '3', titel: 'Lasser TIG/MIG', bedrijf: 'Heerema', locatie: 'Rotterdam', vakgebied: 'Lassen', datum: '25-03-2026', bron: 'Indeed', status: 'Verlopen', link: '#' },
  { id: '4', titel: 'Werktuigbouwkundig Monteur', bedrijf: 'DAF Trucks', locatie: 'Eindhoven', vakgebied: 'Werktuigbouwkunde', datum: '28-03-2026', bron: 'LinkedIn', status: 'Nieuw', link: '#' },
  { id: '5', titel: 'Elektrotechnisch Installateur', bedrijf: 'Strukton', locatie: 'Utrecht', vakgebied: 'Installatietechniek', datum: '26-03-2026', bron: 'Google', status: 'Gematcht', link: '#' },
  { id: '6', titel: 'CNC Operator', bedrijf: 'Philips', locatie: 'Best', vakgebied: 'CNC', datum: '27-03-2026', bron: 'Indeed', status: 'Gematcht', link: '#' },
  { id: '7', titel: 'Constructie Lasser', bedrijf: 'Allseas', locatie: 'Schiedam', vakgebied: 'Lassen', datum: '24-03-2026', bron: 'Google', status: 'Gematcht', link: '#' },
  { id: '8', titel: 'Storingsmonteur Elektro', bedrijf: 'Vanderlande', locatie: 'Veghel', vakgebied: 'Elektrotechniek', datum: '28-03-2026', bron: 'Indeed', status: 'Nieuw', link: '#' },
  { id: '9', titel: 'Fijnmechanisch Verspaner', bedrijf: 'NTS Group', locatie: 'Eindhoven', vakgebied: 'CNC', datum: '25-03-2026', bron: 'Google', status: 'Verlopen', link: '#' },
  { id: '10', titel: 'Installatietechnicus Klimaat', bedrijf: 'Imtech', locatie: 'Gouda', vakgebied: 'Installatietechniek', datum: '27-03-2026', bron: 'Indeed', status: 'Gematcht', link: '#' },
  { id: '11', titel: 'Pijplasser Petrochemie', bedrijf: 'Mammoet', locatie: 'Schiedam', vakgebied: 'Lassen', datum: '23-03-2026', bron: 'LinkedIn', status: 'Verlopen', link: '#' },
  { id: '12', titel: 'PLC Programmeur', bedrijf: 'Bosch Rexroth', locatie: 'Boxtel', vakgebied: 'Elektrotechniek', datum: '28-03-2026', bron: 'Google', status: 'Nieuw', link: '#' },
  { id: '13', titel: 'Frezer 5-assig', bedrijf: 'Siemens', locatie: 'Den Haag', vakgebied: 'CNC', datum: '26-03-2026', bron: 'Indeed', status: 'Gematcht', link: '#' },
  { id: '14', titel: 'Servicemonteur Elektro', bedrijf: 'Engie', locatie: 'Amsterdam', vakgebied: 'Elektrotechniek', datum: '27-03-2026', bron: 'LinkedIn', status: 'Gematcht', link: '#' },
  { id: '15', titel: 'Werkvoorbereider Mechanisch', bedrijf: 'Stork', locatie: 'Hengelo', vakgebied: 'Werktuigbouwkunde', datum: '25-03-2026', bron: 'Google', status: 'Gematcht', link: '#' },
  { id: '16', titel: 'Monteur Luchtbehandeling', bedrijf: 'Carrier', locatie: 'Rotterdam', vakgebied: 'Installatietechniek', datum: '26-03-2026', bron: 'Indeed', status: 'Nieuw', link: '#' },
  { id: '17', titel: 'Lasser/Bankwerker', bedrijf: 'Royal IHC', locatie: 'Kinderdijk', vakgebied: 'Lassen', datum: '24-03-2026', bron: 'Google', status: 'Gematcht', link: '#' },
  { id: '18', titel: 'E&I Technician', bedrijf: 'Shell', locatie: 'Pernis', vakgebied: 'Elektrotechniek', datum: '28-03-2026', bron: 'LinkedIn', status: 'Nieuw', link: '#' },
  { id: '19', titel: 'CNC Draaier Fijnmechanisch', bedrijf: 'AAE', locatie: 'Helmond', vakgebied: 'CNC', datum: '23-03-2026', bron: 'Indeed', status: 'Verlopen', link: '#' },
  { id: '20', titel: 'Monteur Werktuigbouw', bedrijf: 'Boskalis', locatie: 'Papendrecht', vakgebied: 'Werktuigbouwkunde', datum: '27-03-2026', bron: 'Google', status: 'Gematcht', link: '#' },
  { id: '21', titel: 'Elektromonteur Scheepsbouw', bedrijf: 'Damen Shipyards', locatie: 'Gorinchem', vakgebied: 'Elektrotechniek', datum: '26-03-2026', bron: 'Indeed', status: 'Gematcht', link: '#' },
  { id: '22', titel: 'Lasser Constructiewerk', bedrijf: 'Hollandia', locatie: 'Krimpen', vakgebied: 'Lassen', datum: '25-03-2026', bron: 'LinkedIn', status: 'Gematcht', link: '#' },
  { id: '23', titel: 'Monteur CV/Sanitair', bedrijf: 'Feenstra', locatie: 'Utrecht', vakgebied: 'Installatietechniek', datum: '28-03-2026', bron: 'Indeed', status: 'Nieuw', link: '#' },
  { id: '24', titel: 'Bankwerker/Lasser', bedrijf: 'Tata Steel', locatie: 'IJmuiden', vakgebied: 'Werktuigbouwkunde', datum: '24-03-2026', bron: 'Google', status: 'Verlopen', link: '#' },
  { id: '25', titel: 'Procesoperator Elektro', bedrijf: 'Nouryon', locatie: 'Deventer', vakgebied: 'Elektrotechniek', datum: '27-03-2026', bron: 'Indeed', status: 'Gematcht', link: '#' },
];

export const vakgebiedCounts = [
  { label: 'Elektrotechniek', count: 42 },
  { label: 'Werktuigbouwkunde', count: 38 },
  { label: 'Installatietechniek', count: 31 },
  { label: 'Lassen', count: 22 },
  { label: 'CNC', count: 14 },
];
