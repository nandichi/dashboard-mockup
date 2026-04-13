export interface Flexwerker {
  id: string;
  naam: string;
  vakgebied: string;
  ervaring: number;
  certificeringen: string[];
  locatie: string;
  beschikbaarVanaf: string;
  urenPerWeek: number;
  status: string;
  bron: string;
}

export const flexwerkers: Flexwerker[] = [
  { id: 'f1', naam: 'Pieter van den Berg', vakgebied: 'Elektrotechniek', ervaring: 8, certificeringen: ['VCA', 'NEN3140'], locatie: 'Eindhoven', beschikbaarVanaf: '01-04-2026', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f2', naam: 'Mohammed el Amrani', vakgebied: 'Lassen', ervaring: 12, certificeringen: ['VCA', 'TIG cert.', 'MIG cert.'], locatie: 'Rotterdam', beschikbaarVanaf: 'Direct', urenPerWeek: 36, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f3', naam: 'Ahmed Hassan', vakgebied: 'Elektrotechniek', ervaring: 6, certificeringen: ['VCA', 'NEN3140', 'NEN1010'], locatie: 'Tilburg', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f4', naam: 'Tom Hendriks', vakgebied: 'Elektrotechniek', ervaring: 10, certificeringen: ['VCA', 'NEN3140'], locatie: 'Utrecht', beschikbaarVanaf: '15-04-2026', urenPerWeek: 32, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f5', naam: 'Kevin de Jong', vakgebied: 'Elektrotechniek', ervaring: 9, certificeringen: ['VCA', 'PLC cert.'], locatie: 'Veghel', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f6', naam: 'Dennis Smits', vakgebied: 'CNC', ervaring: 7, certificeringen: ['VCA'], locatie: 'Eindhoven', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f7', naam: 'Jan-Willem Kuiper', vakgebied: 'CNC', ervaring: 11, certificeringen: ['VCA', 'Fanuc cert.'], locatie: 'Helmond', beschikbaarVanaf: '08-04-2026', urenPerWeek: 36, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f8', naam: 'Stefan Bakker', vakgebied: 'Werktuigbouwkunde', ervaring: 5, certificeringen: ['VCA'], locatie: 'Breda', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f9', naam: 'Marco van Dijk', vakgebied: 'Werktuigbouwkunde', ervaring: 14, certificeringen: ['VCA', 'Hijskraan cert.'], locatie: 'Dordrecht', beschikbaarVanaf: 'Direct', urenPerWeek: 32, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f10', naam: 'Ibrahim El-Fassi', vakgebied: 'Lassen', ervaring: 3, certificeringen: ['VCA', 'TIG cert.'], locatie: 'Amsterdam', beschikbaarVanaf: '01-05-2026', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f11', naam: 'Bas Vermeer', vakgebied: 'Elektrotechniek', ervaring: 6, certificeringen: ['VCA', 'NEN1010'], locatie: 'Den Haag', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f12', naam: 'Rick Jansen', vakgebied: 'Elektrotechniek', ervaring: 5, certificeringen: ['VCA'], locatie: 'Arnhem', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f13', naam: 'Patrick Groen', vakgebied: 'Werktuigbouwkunde', ervaring: 8, certificeringen: ['VCA'], locatie: 'Dordrecht', beschikbaarVanaf: 'Direct', urenPerWeek: 36, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f14', naam: 'Henk de Graaf', vakgebied: 'Lassen', ervaring: 15, certificeringen: ['VCA', 'TIG', 'MIG', 'Orbital'], locatie: 'IJmuiden', beschikbaarVanaf: '20-04-2026', urenPerWeek: 24, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f15', naam: 'Mark Willems', vakgebied: 'Elektrotechniek', ervaring: 7, certificeringen: ['VCA basis'], locatie: 'Oss', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f16', naam: 'Sander Hoekstra', vakgebied: 'CNC', ervaring: 4, certificeringen: ['VCA'], locatie: 'Utrecht', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f17', naam: 'Willem de Boer', vakgebied: 'Installatietechniek', ervaring: 9, certificeringen: ['VCA', 'F-gassen'], locatie: 'Gouda', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f18', naam: 'Erik Mulder', vakgebied: 'Installatietechniek', ervaring: 6, certificeringen: ['VCA'], locatie: 'Rotterdam', beschikbaarVanaf: '10-04-2026', urenPerWeek: 36, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f19', naam: 'Daan Visser', vakgebied: 'Werktuigbouwkunde', ervaring: 3, certificeringen: ['VCA'], locatie: 'Eindhoven', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Carerix' },
  { id: 'f20', naam: 'Jeroen Peters', vakgebied: 'CNC', ervaring: 8, certificeringen: ['VCA', 'Siemens cert.'], locatie: 'Tilburg', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Beschikbaar', bron: 'Easyflex' },
  { id: 'f21', naam: 'Chris Meijer', vakgebied: 'Lassen', ervaring: 6, certificeringen: ['VCA', 'MIG cert.'], locatie: 'Schiedam', beschikbaarVanaf: 'Direct', urenPerWeek: 40, status: 'Geplaatst', bron: 'Carerix' },
  { id: 'f22', naam: 'Arjan de Wit', vakgebied: 'Elektrotechniek', ervaring: 11, certificeringen: ['VCA', 'NEN3140'], locatie: 'Eindhoven', beschikbaarVanaf: 'n.v.t.', urenPerWeek: 40, status: 'Geplaatst', bron: 'Easyflex' },
  { id: 'f23', naam: 'Ruben Bakker', vakgebied: 'Werktuigbouwkunde', ervaring: 7, certificeringen: ['VCA', 'Hijskraan'], locatie: 'Hengelo', beschikbaarVanaf: 'n.v.t.', urenPerWeek: 36, status: 'Geplaatst', bron: 'Carerix' },
  { id: 'f24', naam: 'Thijs Vos', vakgebied: 'Installatietechniek', ervaring: 4, certificeringen: ['VCA'], locatie: 'Amsterdam', beschikbaarVanaf: 'n.v.t.', urenPerWeek: 40, status: 'Geplaatst', bron: 'Easyflex' },
  { id: 'f25', naam: 'Niels Groot', vakgebied: 'CNC', ervaring: 9, certificeringen: ['VCA', 'Mazak cert.'], locatie: 'Best', beschikbaarVanaf: 'n.v.t.', urenPerWeek: 40, status: 'Geplaatst', bron: 'Carerix' },
];

export const flexwerkerVakgebiedCounts = [
  { label: 'Elektrotechniek', count: 89 },
  { label: 'Werktuigbouwkunde', count: 72 },
  { label: 'Installatietechniek', count: 58 },
  { label: 'Lassen', count: 51 },
  { label: 'CNC', count: 42 },
];
