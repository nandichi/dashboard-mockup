export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  date: string;
  group: 'pinned' | 'today' | 'yesterday' | 'last_week';
  messages: ChatMessage[];
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    title: 'Hot matches overzicht',
    date: '31-03-2026',
    group: 'pinned',
    messages: [
      { role: 'user', content: 'Kun je een overzicht geven van de huidige hot matches?' },
      {
        role: 'assistant',
        content: `Natuurlijk! Hier is een overzicht van de huidige **hot matches**:

**3 vacatures met hot matches:**

1. **Elektromonteur Industrieel** bij VDL Groep
   - 3 kandidaten (hoogste score: 92%)
   - Status: wacht op goedkeuring

2. **Storingsmonteur Elektro** bij Vanderlande
   - 2 kandidaten (hoogste score: 89%)
   - Status: goedgekeurd, outreach gepland

3. **Servicemonteur Elektro** bij Engie
   - 2 kandidaten (hoogste score: 85%)
   - Status: wacht op goedkeuring

Wil je dat ik de details van een specifieke match uitwerk?`,
      },
      { role: 'user', content: 'Ja, vertel meer over de match bij VDL Groep' },
      {
        role: 'assistant',
        content: `De match bij **VDL Groep** voor de vacature **Elektromonteur Industrieel** in Eindhoven:

### Top 3 kandidaten:

| # | Naam | Score | Highlight |
|---|------|-------|-----------|
| 1 | Pieter van den Berg | **92%** | 8 jaar ervaring, woont in Eindhoven |
| 2 | Ahmed Hassan | **87%** | Alle certificeringen, regio Brabant |
| 3 | Tom Hendriks | **81%** | 10 jaar ervaring, direct beschikbaar |

### Score breakdown #1 - Pieter van den Berg:
- **Vakgebied:** 95% (gewicht: 40)
- **Beschikbaarheid:** 90% (gewicht: 20)
- **Regio:** 98% (gewicht: 15)
- **Certificeringen:** 95% (gewicht: 15)
- **Ervaring:** 85% (gewicht: 10)

### Aanbeveling:
Pieter van den Berg is de sterkste kandidaat. Hij woont op korte afstand van VDL in Eindhoven, heeft alle vereiste certificeringen, en is beschikbaar vanaf 01-04-2026.

Zal ik de outreach voor deze match goedkeuren?`,
      },
    ],
  },
  {
    id: 'c2',
    title: 'Outreach strategie Q2',
    date: '31-03-2026',
    group: 'today',
    messages: [
      { role: 'user', content: 'Wat is onze outreach strategie voor Q2 2026?' },
      {
        role: 'assistant',
        content: `Hier is een overzicht van de huidige outreach prestaties en suggesties voor Q2:

### Huidige resultaten (Q1):
- **56 emails** verstuurd
- **41 reacties** ontvangen (73% response rate)
- **23 geinteresseerd** (41% conversion)
- **8.2** gemiddelde AI review score

### Aanbevelingen voor Q2:
1. **Volume verhogen** - Target: 80+ emails per maand
2. **Sector focus** - Elektrotechniek levert de hoogste response rate op
3. **Timing optimaliseren** - Dinsdag en donderdag ochtend hebben de beste open rates
4. **Personalisatie** - AI review scores > 8.0 correleren met hogere response rates

Wil je dat ik een gedetailleerd plan uitwerk?`,
      },
    ],
  },
  {
    id: 'c3',
    title: 'Scanner resultaten analyseren',
    date: '30-03-2026',
    group: 'yesterday',
    messages: [
      { role: 'user', content: 'Hoeveel nieuwe vacatures heeft de scanner vandaag gevonden?' },
      {
        role: 'assistant',
        content: `De scanner heeft vandaag de volgende resultaten opgeleverd:

### Scanresultaten 30-03-2026:
- **Google CSE:** 23 resultaten
- **Indeed:** 18 resultaten
- **Na deduplicatie:** 36 unieke vacatures
- **Na relevantiefilter:** 31 relevante vacatures

### Per vakgebied:
- Elektrotechniek: 12 vacatures
- Werktuigbouwkunde: 8 vacatures
- CNC: 5 vacatures
- Lassen: 4 vacatures
- Installatietechniek: 2 vacatures

De scanner draait elke 6 uur. De volgende run is gepland om 20:00.`,
      },
    ],
  },
  {
    id: 'c4',
    title: 'Nieuw vakgebied toevoegen',
    date: '30-03-2026',
    group: 'yesterday',
    messages: [
      { role: 'user', content: 'Kunnen we het vakgebied Mechatronica toevoegen aan de scanner?' },
      {
        role: 'assistant',
        content: `Goed idee! Mechatronica is een groeiend vakgebied dat goed aansluit bij onze huidige focus.

### Stappen om Mechatronica toe te voegen:

1. **Admin panel** - Ga naar Admin > Scanner > Vakgebieden
2. **Zoektermen definiëren:**
   - mechatronicus
   - mechatronica monteur
   - mechatronica technicus
   - systems engineer mechatronica
3. **Synoniemen instellen:**
   - mechatronik, mechatronic engineer
4. **Bronnen configureren** - Dezelfde bronnen als huidige vakgebieden

Wil je dat ik de zoektermen verder uitwerk?`,
      },
    ],
  },
  {
    id: 'c5',
    title: 'Email template verbeteren',
    date: '29-03-2026',
    group: 'last_week',
    messages: [
      { role: 'user', content: 'De AI review scores van onze emails zijn gemiddeld 7.5. Hoe kunnen we dit verbeteren?' },
      {
        role: 'assistant',
        content: `Een gemiddelde score van 7.5 is redelijk, maar er is ruimte voor verbetering. Hier zijn mijn aanbevelingen:

### Verbeterpunten:

1. **Personalisatie verhogen**
   - Verwijs naar specifieke projecten van het bedrijf
   - Noem de naam van de contactpersoon
   
2. **Kandidaat USP sterker neerzetten**
   - Specifieke certificeringen benoemen
   - Concrete projectervaring noemen

3. **Call-to-action verbeteren**
   - Stel een concreet voorstel voor (bijv. "Kan ik u woensdag om 10:00 bellen?")
   
4. **Formatting**
   - Korter en bondiger schrijven
   - Maximaal 150 woorden per email

Met deze aanpassingen verwacht ik een score van 8.5+.`,
      },
    ],
  },
  {
    id: 'c6',
    title: 'Matching score uitleg',
    date: '28-03-2026',
    group: 'last_week',
    messages: [
      { role: 'user', content: 'Hoe wordt de matching score berekend?' },
      {
        role: 'assistant',
        content: `De matching score is een **gewogen hybride score** die op basis van 5 factoren wordt berekend:

### Score componenten:

| Factor | Gewicht | Beschrijving |
|--------|---------|-------------|
| Vakgebied | **40%** | Match tussen vakgebied kandidaat en vacature-eisen |
| Beschikbaarheid | **20%** | Directe beschikbaarheid en uren/week |
| Regio | **15%** | Afstand tussen woonplaats en werklocatie |
| Certificeringen | **15%** | Overlap in vereiste en beschikbare certificeringen |
| Ervaring | **10%** | Jaren ervaring t.o.v. vacature-eisen |

### Categorisering:
- **Hot** (>80%): Uitstekende match, directe actie aanbevolen
- **Warm** (65-80%): Goede match, nader onderzoek wenselijk
- **Cold** (<65%): Beperkte match, alleen als backup

De score wordt berekend door de AI Matcher agent en elke 6 uur bijgewerkt.`,
      },
    ],
  },
];

export const chatSuggestions = [
  'Geef een overzicht van hot matches',
  'Analyseer de outreach resultaten',
  'Wat heeft de scanner gevonden?',
  'Toon het dashboard overzicht',
  'Leg de matching score uit',
  'Schrijf een vacaturetekst',
];
