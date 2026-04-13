export interface AgentStep {
  label: string;
  duration: number;
  detail?: string;
}

export interface AgentRun {
  id: string;
  datum: string;
  status: 'success' | 'error' | 'cancelled';
  duur: string;
  log?: string;
}

export interface AgentLiveMetric {
  label: string;
  values: number[];
}

export interface AgentConfig {
  id: string;
  naam: string;
  rol: string;
  beschrijving: string;
  status: 'active' | 'waiting' | 'inactive';
  statusLabel: string;
  resultaatLink: string;
  resultaatTekst: string;
  resultaatAantal: number;
  laatsteRun: string;
  schemaOpties: string[];
  huidigeSchema: string;
  stappen: AgentStep[];
  runs: AgentRun[];
  metrics: AgentLiveMetric[];
}

export const agents: AgentConfig[] = [
  {
    id: 'lead_researcher',
    naam: 'Lead Researcher',
    rol: 'Vacature Scanner',
    beschrijving: 'Zoekt automatisch naar relevante vacatures uit meerdere bronnen',
    status: 'active',
    statusLabel: 'Actief',
    resultaatLink: '/vacatures',
    resultaatTekst: '147 vacatures gevonden',
    resultaatAantal: 147,
    laatsteRun: '2 uur geleden',
    schemaOpties: ['Elke 6 uur', 'Elke 12 uur', 'Eens per dag', 'Handmatig'],
    huidigeSchema: 'Elke 6 uur',
    stappen: [
      { label: 'Initialisatie & configuratie', duration: 1500, detail: 'Agent configuratie en API credentials laden' },
      { label: 'API verbindingen controleren', duration: 1500, detail: 'Connectiviteit verifi\u00EBren met alle databronnen' },
      { label: 'Google CSE doorzoeken', duration: 4000, detail: 'Meerdere zoekqueries uitvoeren via Google Custom Search' },
      { label: 'Indeed vacatures scrapen', duration: 4000, detail: 'Indeed listings ophalen en detailpaginas parsen' },
      { label: 'LinkedIn Jobs analyseren', duration: 3000, detail: 'LinkedIn Jobs API queries uitvoeren' },
      { label: 'Nationale Vacaturebank', duration: 3000, detail: 'NVB technische vacatures doorzoeken' },
      { label: 'Duplicaten detecteren', duration: 2000, detail: 'Fuzzy matching op titel en bedrijfsnaam' },
      { label: 'Relevantie analyse (AI)', duration: 3000, detail: 'NLP model past semantische analyse toe op resultaten' },
      { label: 'Locatie & reisafstand', duration: 2000, detail: 'Postcodes resolven en afstanden berekenen' },
      { label: 'Classificeren & taggen', duration: 2500, detail: 'Vacatures categoriseren op vakgebied en niveau' },
      { label: 'Database opslaan', duration: 1500, detail: 'Resultaten wegschrijven naar vacature database' },
      { label: 'Rapport genereren', duration: 1500, detail: 'Samenvatting opstellen en notificaties versturen' },
    ],
    metrics: [
      { label: 'Bronnen doorzocht', values: [0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4] },
      { label: 'Vacatures gevonden', values: [0, 0, 0, 23, 41, 53, 61, 54, 36, 36, 36, 36, 36] },
      { label: 'Na filtering', values: [0, 0, 0, 0, 0, 0, 0, 54, 36, 36, 36, 36, 36] },
      { label: 'Opgeslagen', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 36] },
    ],
    runs: [
      { id: 'r1', datum: '31-03-2026 14:30', status: 'success', duur: '47s' },
      { id: 'r2', datum: '31-03-2026 08:00', status: 'success', duur: '52s' },
      { id: 'r3', datum: '30-03-2026 14:30', status: 'error', duur: '120s', log: '[ERROR] Timeout bij Google CSE na 120s' },
    ],
  },
  {
    id: 'lead_matcher',
    naam: 'Lead Match Medewerker',
    rol: 'Matcher',
    beschrijving: 'Analyseert vacatures en koppelt aan beschikbare vakmensen',
    status: 'active',
    statusLabel: 'Actief',
    resultaatLink: '/matches',
    resultaatTekst: '89 matches gevonden',
    resultaatAantal: 89,
    laatsteRun: '1 uur geleden',
    schemaOpties: ['Direct na elke scan', 'Elke 6 uur', 'Elke 12 uur', 'Eens per dag', 'Handmatig'],
    huidigeSchema: 'Direct na elke scan',
    stappen: [
      { label: 'Initialisatie & configuratie', duration: 1500, detail: 'Matching configuratie en ML model laden' },
      { label: 'Vacaturedata ophalen', duration: 2000, detail: 'Actieve vacatures uit database laden' },
      { label: 'Flexwerker profielen laden', duration: 2500, detail: 'CV data, certificaten en beschikbaarheid ophalen' },
      { label: 'Competentiematrix opbouwen', duration: 3000, detail: 'Skills extractie en indexering van alle profielen' },
      { label: 'Vakgebied matching', duration: 3500, detail: 'Per vakgebied kandidaten koppelen aan vacatures' },
      { label: 'Beschikbaarheid controleren', duration: 2500, detail: 'Planning conflicten en voorkeuren valideren' },
      { label: 'Locatie & reisafstand', duration: 2000, detail: 'Reisafstanden berekenen en filteren' },
      { label: 'AI Scoring model', duration: 4000, detail: 'Hybride scoring met skills, ervaring en culturele fit' },
      { label: 'Kwaliteit valideren', duration: 2000, detail: 'Anomalie detectie en confidence checks' },
      { label: 'Rankings berekenen', duration: 2000, detail: 'Top kandidaten per vacature selecteren' },
      { label: 'Resultaten opslaan', duration: 1500, detail: 'Match resultaten met scores naar database' },
      { label: 'Samenvatting genereren', duration: 2000, detail: 'Rapport opstellen en dashboard bijwerken' },
    ],
    metrics: [
      { label: 'Vacatures geladen', values: [0, 0, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147, 147] },
      { label: 'Profielen geladen', values: [0, 0, 0, 312, 312, 312, 312, 312, 312, 312, 312, 312, 312] },
      { label: 'Combinaties getest', values: [0, 0, 0, 0, 0, 8582, 8582, 8582, 8582, 8582, 8582, 8582, 8582] },
      { label: 'Matches gevonden', values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 89, 89, 89, 89] },
    ],
    runs: [
      { id: 'r7', datum: '31-03-2026 14:31', status: 'success', duur: '38s' },
      { id: 'r8', datum: '31-03-2026 08:01', status: 'success', duur: '42s' },
    ],
  },
  {
    id: 'outreach_assistant',
    naam: 'Outreach Assistent',
    rol: 'Email Specialist',
    beschrijving: 'Stelt automatisch e-mails op voor goedgekeurde matches',
    status: 'waiting',
    statusLabel: 'Wachtend op goedkeuring',
    resultaatLink: '/outreach',
    resultaatTekst: '56 emails verstuurd',
    resultaatAantal: 56,
    laatsteRun: '3 uur geleden',
    schemaOpties: ['Elke werkdag 09:00', 'Elke 12 uur', 'Handmatig'],
    huidigeSchema: 'Elke werkdag 09:00',
    stappen: [
      { label: 'Initialisatie & configuratie', duration: 1500, detail: 'Template engine en AI model initialiseren' },
      { label: 'Goedgekeurde matches ophalen', duration: 1500, detail: 'Matches met status goedgekeurd laden' },
      { label: 'Bedrijfsprofielen analyseren', duration: 3000, detail: 'Websites crawlen en bedrijfscultuur analyseren' },
      { label: 'E-mail templates selecteren', duration: 2000, detail: 'Beste template en A/B variant kiezen' },
      { label: 'Personalisatie data verzamelen', duration: 2500, detail: 'Kandidaat details en historische data ophalen' },
      { label: 'AI e-mail content genereren', duration: 5000, detail: 'Gepersonaliseerde emails schrijven met GPT-4' },
      { label: 'Toon & stijl optimaliseren', duration: 2500, detail: 'Toonanalyse per bedrijfstype en leesbaarheid' },
      { label: 'AI Review & kwaliteitscheck', duration: 3000, detail: 'Cross-review model voor kwaliteitsbeoordeling' },
      { label: 'Spam check & compliance', duration: 2000, detail: 'SpamAssassin en GDPR/AVG validatie' },
      { label: 'Preview rendering', duration: 2000, detail: 'HTML templates genereren voor desktop en mobiel' },
      { label: 'Verzendwachtrij aanmaken', duration: 1500, detail: 'Optimale verzendtijd berekenen en inplannen' },
      { label: 'Rapport genereren', duration: 1000, detail: 'Outreach samenvatting en previews beschikbaar maken' },
    ],
    metrics: [
      { label: 'Matches geladen', values: [0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5] },
      { label: 'Emails gegenereerd', values: [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5] },
      { label: 'Woorden geschreven', values: [0, 0, 0, 0, 0, 0, 1639, 1639, 1639, 1639, 1639, 1639, 1639] },
      { label: 'Reviews voltooid', values: [0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5] },
    ],
    runs: [
      { id: 'r12', datum: '31-03-2026 09:00', status: 'success', duur: '31s' },
      { id: 'r13', datum: '30-03-2026 09:00', status: 'success', duur: '28s' },
    ],
  },
];

import { BrandConfig, defaultBrandConfig } from '@/lib/brand-config';

export function getOutreachSettings(brand: BrandConfig = defaultBrandConfig) {
  return {
    naam: 'Sophie Bakker',
    functie: 'Business Developer',
    bedrijf: brand.brandName,
    email: brand.contactEmail,
    telefoon: '085 130 2368',
    website: brand.website,
  };
}

export const outreachSettings = getOutreachSettings();

export const activityLogLines: Record<string, { text: string; type: string; badge?: string }[]> = {
  lead_researcher: [
    { text: 'Agent wordt opgestart...', type: 'start' },
    { text: 'Configuratie laden', type: 'start' },
    { text: 'Zoekfilters: elektrotechniek, werktuigbouw, installatietechniek', type: 'info' },
    { text: 'API credentials geverifieerd', type: 'start' },

    { text: 'Verbinding maken met Google', type: 'connect', badge: 'Google' },
    { text: 'Verbinding maken met Indeed', type: 'connect', badge: 'Indeed' },
    { text: 'Verbinding maken met LinkedIn', type: 'connect', badge: 'LinkedIn' },
    { text: 'Verbinding maken met Nationale Vacaturebank', type: 'connect', badge: 'NVB' },

    { text: 'Zoeken: "elektromonteur vacature Zuid-Holland"', type: 'search', badge: 'Google' },
    { text: 'Zoeken: "werktuigbouwkundige vacature Noord-Brabant"', type: 'search', badge: 'Google' },
    { text: 'Zoeken: "installateur vacature Limburg"', type: 'search', badge: 'Google' },
    { text: '23 unieke vacatures gevonden', type: 'found', badge: 'Google' },

    { text: 'Categorie "Elektrotechniek" doorzoeken', type: 'search', badge: 'Indeed' },
    { text: '312 listings gevonden in de regio', type: 'info', badge: 'Indeed' },
    { text: 'Salarisinformatie verzamelen', type: 'search', badge: 'Indeed' },
    { text: '18 relevante vacatures gevonden', type: 'found', badge: 'Indeed' },

    { text: 'Technische vacatures doorzoeken', type: 'search', badge: 'LinkedIn' },
    { text: '89 resultaten in regio Eindhoven/Tilburg', type: 'info', badge: 'LinkedIn' },
    { text: 'Bedrijfsprofielen controleren', type: 'search', badge: 'LinkedIn' },
    { text: '12 nieuwe vacatures gevonden', type: 'found', badge: 'LinkedIn' },

    { text: 'Technische vacatures ophalen', type: 'search', badge: 'NVB' },
    { text: '45 resultaten gevonden', type: 'info', badge: 'NVB' },
    { text: 'Contactgegevens en bedrijfsinfo verzamelen', type: 'search', badge: 'NVB' },
    { text: '8 vacatures toegevoegd aan resultaten', type: 'found', badge: 'NVB' },

    { text: 'Dubbele vacatures detecteren', type: 'filter' },
    { text: '61 vacatures vergelijken op titel en bedrijf', type: 'filter' },
    { text: '7 dubbele vacatures samengevoegd', type: 'filter' },
    { text: '54 unieke vacatures na filtering', type: 'found' },

    { text: 'AI-model laden voor relevantieanalyse', type: 'ai', badge: 'AI' },
    { text: 'Vacatureteksten analyseren', type: 'ai', badge: 'AI' },
    { text: '36 van 54 vacatures boven relevantiedrempel', type: 'found', badge: 'AI' },
    { text: '18 vacatures uitgefilterd', type: 'filter' },

    { text: 'Locaties berekenen voor 36 vacatures', type: 'location', badge: 'GEO' },
    { text: 'Reisafstanden bepalen vanuit flexwerkerprofielen', type: 'location', badge: 'GEO' },
    { text: 'Gemiddelde reisafstand: 28 km', type: 'info', badge: 'GEO' },
    { text: '4 vacatures gemarkeerd: reisafstand > 45 km', type: 'filter', badge: 'GEO' },

    { text: 'Vacatures indelen per vakgebied', type: 'info' },
    { text: 'Elektrotechniek: 14 | Werktuigbouw: 12 | Installatie: 7', type: 'info' },
    { text: 'Senior: 8 | Medior: 19 | Junior: 9', type: 'info' },
    { text: '6 vacatures met urgentie-indicatie', type: 'found' },

    { text: 'Opslaan in database', type: 'save', badge: 'DB' },
    { text: '36 vacatures succesvol opgeslagen', type: 'found', badge: 'DB' },
    { text: 'Zoekindexen bijwerken', type: 'save', badge: 'DB' },
    { text: 'Data-integriteit geverifieerd', type: 'found', badge: 'DB' },

    { text: '4 bronnen doorzocht, 36 vacatures opgeslagen', type: 'found' },
    { text: 'Dashboard bijgewerkt', type: 'info' },
    { text: 'Lead Matcher automatisch gestart', type: 'info' },
    { text: 'Klaar', type: 'done' },
  ],
  lead_matcher: [
    { text: 'Agent wordt opgestart', type: 'start' },
    { text: 'Matching-configuratie laden', type: 'start' },
    { text: 'AI-matchingmodel initialiseren', type: 'start', badge: 'AI' },
    { text: 'Minimale matchscore: 65%', type: 'info' },

    { text: 'Vacaturedatabase raadplegen', type: 'search', badge: 'DB' },
    { text: '147 actieve vacatures geladen', type: 'found', badge: 'DB' },
    { text: 'Vereisten en kwalificaties verwerkt', type: 'info' },
    { text: 'Elektro: 42 | Werktuig: 38 | Installatie: 31 | Overig: 36', type: 'info' },

    { text: 'Flexwerkerprofielen ophalen', type: 'search', badge: 'DB' },
    { text: '312 actieve profielen geladen', type: 'found', badge: 'DB' },
    { text: "CV's en certificaten verwerken", type: 'info' },
    { text: '287 flexwerkers beschikbaar', type: 'found' },

    { text: 'Competentiematrix opbouwen (312 x 147)', type: 'ai', badge: 'AI' },
    { text: "Vaardigheden extraheren uit 312 CV's", type: 'ai', badge: 'AI' },
    { text: 'Certificaten verwerken (VCA, NEN 1010, F-gassen)', type: 'ai', badge: 'AI' },
    { text: '1.847 unieke competenties geindexeerd', type: 'found', badge: 'AI' },

    { text: 'Elektrotechniek: 42 vacatures x 89 kandidaten', type: 'search' },
    { text: 'Top: Jan de Vries - VDL Groep (94%)', type: 'found' },
    { text: 'Werktuigbouwkunde: 38 vacatures x 72 kandidaten', type: 'search' },
    { text: 'Top: Pieter Janssen - Vanderlande (89%)', type: 'found' },

    { text: 'Beschikbaarheidsconflicten controleren', type: 'filter' },
    { text: '12 matches uitgesloten: kandidaat niet beschikbaar', type: 'filter' },
    { text: 'Startdatum en werkvoorkeur valideren', type: 'info' },
    { text: '289 matches na beschikbaarheidscheck', type: 'found' },

    { text: 'Reisafstanden berekenen voor 289 matches', type: 'location', badge: 'GEO' },
    { text: 'OV-bereikbaarheid meenemen', type: 'location', badge: 'GEO' },
    { text: '23 matches boven maximale reisafstand', type: 'filter', badge: 'GEO' },
    { text: '266 matches binnen bereik', type: 'found', badge: 'GEO' },

    { text: 'AI-scoringmodel activeren', type: 'ai', badge: 'AI' },
    { text: 'Vaardigheden, ervaring en culturele fit berekenen', type: 'ai', badge: 'AI' },
    { text: '266 matches verwerkt', type: 'ai', badge: 'AI' },
    { text: '12 uitstekend | 34 sterk | 26 goed | 17 redelijk', type: 'found', badge: 'AI' },

    { text: 'Kwaliteitscontrole uitvoeren', type: 'filter' },
    { text: '3 matches gemarkeerd voor handmatige review', type: 'filter' },
    { text: 'Scores gevalideerd', type: 'info' },
    { text: 'Alle resultaten binnen verwachte marges', type: 'found' },

    { text: 'Rankings berekenen per vacature', type: 'search' },
    { text: 'Hot matches (>85%): 34', type: 'found' },
    { text: 'Warm matches (70-85%): 38', type: 'found' },
    { text: 'Cold matches (65-70%): 17', type: 'found' },

    { text: 'Resultaten opslaan in database', type: 'save', badge: 'DB' },
    { text: '89 matches opgeslagen met scores en rankings', type: 'found', badge: 'DB' },
    { text: 'Indexen bijgewerkt', type: 'save', badge: 'DB' },
    { text: 'Data-integriteit gecontroleerd', type: 'found', badge: 'DB' },

    { text: 'Hot 34 | Warm 38 | Cold 17', type: 'found' },
    { text: 'Gemiddelde matchscore: 79%', type: 'found' },
    { text: 'Outreach Assistent geinformeerd over 34 hot matches', type: 'info' },
    { text: 'Klaar', type: 'done' },
  ],
  outreach_assistant: [
    { text: 'Agent wordt opgestart', type: 'start' },
    { text: 'Template-engine initialiseren', type: 'start' },
    { text: 'AI-taalmodel laden', type: 'start', badge: 'AI' },
    { text: 'Verbinding gecontroleerd', type: 'start' },

    { text: 'Goedgekeurde matches ophalen', type: 'search', badge: 'DB' },
    { text: '5 matches met status "goedgekeurd" gevonden', type: 'found', badge: 'DB' },
    { text: 'Contactgegevens valideren', type: 'info' },
    { text: '5 van 5 contacten compleet', type: 'found' },

    { text: 'Bedrijfsprofiel analyseren: VDL Groep & ASML', type: 'ai', badge: 'AI' },
    { text: 'Websites crawlen voor bedrijfscultuur', type: 'search', badge: 'AI' },
    { text: 'Bedrijfsprofiel analyseren: Vanderlande, Philips & DAF', type: 'ai', badge: 'AI' },
    { text: '5 bedrijfsprofielen succesvol geanalyseerd', type: 'found', badge: 'AI' },

    { text: 'E-mailtemplate selecteren', type: 'info' },
    { text: '12 variabelen per e-mail koppelen', type: 'info' },
    { text: 'A/B variant gekozen: Variant B (hogere open rate)', type: 'found' },
    { text: 'Template-engine gereed', type: 'found' },

    { text: 'Kandidaatprofielen ophalen', type: 'search', badge: 'DB' },
    { text: 'Jan de Vries (8 jr) | Ahmed El-Amrani (5 jr)', type: 'info' },
    { text: 'Pieter Janssen (12 jr) | Lisa van den Berg (6 jr)', type: 'info' },
    { text: 'Historische succespercentage: 78%', type: 'found' },

    { text: 'E-mail 1/5 schrijven: VDL Groep', type: 'ai', badge: 'AI' },
    { text: 'E-mail 2/5 schrijven: ASML', type: 'ai', badge: 'AI' },
    { text: 'E-mail 3/5 schrijven: Vanderlande & Philips', type: 'ai', badge: 'AI' },
    { text: 'E-mail 5/5 schrijven: DAF Trucks', type: 'ai', badge: 'AI' },

    { text: 'Toon en stijl controleren per bedrijfstype', type: 'ai', badge: 'AI' },
    { text: 'ASML: toon aangepast naar high-tech formeel', type: 'filter', badge: 'AI' },
    { text: 'Leesbaarheid gecontroleerd', type: 'info', badge: 'AI' },
    { text: 'Totaal 1.639 woorden in 5 e-mails', type: 'found', badge: 'AI' },

    { text: 'Kwaliteitsbeoordeling uitvoeren', type: 'ai', badge: 'AI' },
    { text: 'VDL 8.6 | ASML 7.9 | Vanderlande 8.8', type: 'found' },
    { text: 'Philips 8.2 | DAF 8.5', type: 'found' },
    { text: 'Gemiddelde kwaliteitsscore: 8.4/10', type: 'found' },

    { text: 'Spamcheck uitvoeren', type: 'filter' },
    { text: 'Alle e-mails onder spamdrempel', type: 'found' },
    { text: 'AVG-compliance controleren', type: 'filter' },
    { text: 'Privacyverklaring en opt-out: 5/5 OK', type: 'found' },

    { text: 'HTML-templates genereren', type: 'info' },
    { text: 'Desktop preview: OK', type: 'found' },
    { text: 'Mobiele preview: OK', type: 'found' },
    { text: 'Dark mode compatibiliteit: OK', type: 'found' },

    { text: 'E-mails toevoegen aan verzendwachtrij', type: 'save' },
    { text: 'Optimale verzendtijd: morgen 09:15', type: 'info' },
    { text: '5 e-mails gepland', type: 'found' },
    { text: 'Bevestiging van SendGrid ontvangen', type: 'found' },

    { text: '5 e-mails, gemiddelde kwaliteit 8.4/10', type: 'found' },
    { text: 'Preview beschikbaar in dashboard', type: 'info' },
    { text: 'Alle taken succesvol afgerond', type: 'info' },
    { text: 'Klaar', type: 'done' },
  ],
};
