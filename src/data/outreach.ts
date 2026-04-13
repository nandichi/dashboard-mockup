export interface OutreachLog {
  id: string;
  datum: string;
  bedrijf: string;
  email: string;
  type: string;
  status: string;
  reactie: string;
  samenvatting: string;
  aiReview: string;
  score: number;
}

export const outreachLogs: OutreachLog[] = [
  { id: 'o1', datum: '31-03-2026', bedrijf: 'VDL Groep', email: 'hr@vdlgroep.nl', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Positieve reactie, wil cv ontvangen', aiReview: 'Goed', score: 8.5 },
  { id: 'o2', datum: '31-03-2026', bedrijf: 'ASML', email: 'recruitment@asml.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Graag meer info over kandidaat', aiReview: 'Goed', score: 9.0 },
  { id: 'o3', datum: '30-03-2026', bedrijf: 'DAF Trucks', email: 'personeel@daftrucks.nl', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Niet geinteresseerd', samenvatting: 'Vacature is intern ingevuld', aiReview: 'Neutraal', score: 7.0 },
  { id: 'o4', datum: '30-03-2026', bedrijf: 'Vanderlande', email: 'jobs@vanderlande.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Stuur cv door, plannen gesprek', aiReview: 'Goed', score: 8.8 },
  { id: 'o5', datum: '29-03-2026', bedrijf: 'Engie', email: 'werving@engie.nl', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Interesse in meerdere kandidaten', aiReview: 'Goed', score: 8.2 },
  { id: 'o6', datum: '29-03-2026', bedrijf: 'Strukton', email: 'hr@strukton.nl', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geen reactie', samenvatting: '', aiReview: 'Wachtend', score: 7.5 },
  { id: 'o7', datum: '28-03-2026', bedrijf: 'Heerema', email: 'recruitment@heerema.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Opt-out', samenvatting: 'Niet meer benaderen', aiReview: 'Slecht', score: 6.0 },
  { id: 'o8', datum: '28-03-2026', bedrijf: 'Allseas', email: 'hr@allseas.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Graag telefonisch contact', aiReview: 'Goed', score: 8.0 },
  { id: 'o9', datum: '27-03-2026', bedrijf: 'Philips', email: 'careers@philips.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Wil profiel ontvangen', aiReview: 'Goed', score: 8.3 },
  { id: 'o10', datum: '27-03-2026', bedrijf: 'Siemens', email: 'hr@siemens.nl', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geen reactie', samenvatting: '', aiReview: 'Wachtend', score: 7.2 },
  { id: 'o11', datum: '26-03-2026', bedrijf: 'Bosch Rexroth', email: 'jobs@boschrexroth.nl', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Plant interview met kandidaat', aiReview: 'Goed', score: 8.7 },
  { id: 'o12', datum: '26-03-2026', bedrijf: 'Shell', email: 'recruitment@shell.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geen reactie', samenvatting: '', aiReview: 'Wachtend', score: 7.8 },
  { id: 'o13', datum: '25-03-2026', bedrijf: 'Stork', email: 'hr@stork.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Wil meerdere profielen zien', aiReview: 'Goed', score: 8.1 },
  { id: 'o14', datum: '25-03-2026', bedrijf: 'Royal IHC', email: 'werving@royalihc.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Niet geinteresseerd', samenvatting: 'Momenteel geen budget', aiReview: 'Neutraal', score: 6.8 },
  { id: 'o15', datum: '24-03-2026', bedrijf: 'Damen Shipyards', email: 'hr@damen.com', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Wil graag cv en referenties', aiReview: 'Goed', score: 8.4 },
  { id: 'o16', datum: '24-03-2026', bedrijf: 'NTS Group', email: 'recruitment@nts-group.nl', type: 'Eerste bericht', status: 'Verstuurd', reactie: 'Geinteresseerd', samenvatting: 'Plant gesprek volgende week', aiReview: 'Goed', score: 8.6 },
];

export interface OutreachPreview {
  id: string;
  bedrijf: string;
  contactpersoon: string;
  email: string;
  score: number;
  aiReview: string;
  aiProspectReden: string;
  onderwerp: string;
  body: string;
  verbeterpunten: string[];
}

import { BrandConfig, defaultBrandConfig } from '@/lib/brand-config';

function buildOutreachPreviews(brand: BrandConfig): OutreachPreview[] {
  const sig = `Sophie Bakker\nBusiness Developer - ${brand.brandName}\n085 130 2368`;

  return [
    {
      id: 'p1',
      bedrijf: 'VDL Groep',
      contactpersoon: 'Hr. J. Bakker',
      email: 'j.bakker@vdlgroep.nl',
      score: 8.5,
      aiReview: 'Goed',
      aiProspectReden: 'Actieve vacature met hoge urgentie, bedrijf heeft eerder positief gereageerd op outreach',
      onderwerp: 'Ervaren Elektromonteur beschikbaar - direct inzetbaar',
      body: `Geachte heer Bakker,

Via onze database zijn wij op de hoogte van uw openstaande vacature voor een Elektromonteur Industrieel bij VDL Groep in Eindhoven.

Wij hebben een geschikte kandidaat beschikbaar met 8 jaar ervaring in de industriele elektrotechniek, in bezit van VCA en NEN3140 certificeringen, en woonachtig in Eindhoven.

Mocht u interesse hebben, dan stuur ik u graag het volledige profiel toe.

Met vriendelijke groet,
${sig}`,
      verbeterpunten: ['Meer specifieke ervaring benoemen', 'Referentie toevoegen'],
    },
    {
      id: 'p2',
      bedrijf: 'ASML',
      contactpersoon: 'Mw. L. van Dam',
      email: 'l.vandam@asml.com',
      score: 9.0,
      aiReview: 'Goed',
      aiProspectReden: 'Hoge match score met meerdere kandidaten, strategisch account',
      onderwerp: 'Ervaren CNC Draaier/Frezer beschikbaar voor ASML Veldhoven',
      body: `Geachte mevrouw Van Dam,

Naar aanleiding van uw vacature voor een CNC Draaier/Frezer bij ASML in Veldhoven, wil ik u graag attenderen op een kandidaat uit ons bestand.

De kandidaat beschikt over 7 jaar CNC ervaring, is VCA-gecertificeerd en woonachtig in de regio Eindhoven. Hij is per direct beschikbaar voor 40 uur per week.

Ik hoor graag of u interesse heeft in het volledige profiel.

Met vriendelijke groet,
${sig}`,
      verbeterpunten: [],
    },
    {
      id: 'p3',
      bedrijf: 'DAF Trucks',
      contactpersoon: 'Hr. R. Smeets',
      email: 'r.smeets@daftrucks.nl',
      score: 7.5,
      aiReview: 'Matig',
      aiProspectReden: 'Nieuwe vacature, potentieel voor langdurige plaatsing',
      onderwerp: 'Werktuigbouwkundig Monteur voor DAF Trucks Eindhoven',
      body: `Geachte heer Smeets,

Met betrekking tot uw vacature voor een Werktuigbouwkundig Monteur bij DAF Trucks, wil ik u informeren over een beschikbare kandidaat in ons bestand.

De kandidaat heeft een werktuigbouwkundige achtergrond met 5 jaar ervaring en de juiste certificeringen. Hij woont in de regio Breda en is direct beschikbaar.

Graag verneem ik of dit interessant voor u is.

Met vriendelijke groet,
${sig}`,
      verbeterpunten: ['Meer specifieke skills benoemen', 'Tone of voice persoonlijker maken', 'Referentie aan vergelijkbaar project toevoegen'],
    },
    {
      id: 'p4',
      bedrijf: 'Vanderlande',
      contactpersoon: 'Mw. K. de Bruin',
      email: 'k.debruin@vanderlande.com',
      score: 8.8,
      aiReview: 'Goed',
      aiProspectReden: 'Urgente vacature met perfecte kandidaat match',
      onderwerp: 'Storingsmonteur Elektro met PLC ervaring - regio Veghel',
      body: `Geachte mevrouw De Bruin,

Wij hebben gezien dat Vanderlande op zoek is naar een Storingsmonteur Elektro in Veghel. Wij beschikken over een uitstekende kandidaat met specialisatie in storingen, PLC ervaring en woonachtig in Veghel.

De kandidaat heeft 9 jaar ervaring, is VCA-gecertificeerd en per direct beschikbaar voor 40 uur per week.

Ik stuur u graag meer informatie toe.

Met vriendelijke groet,
${sig}`,
      verbeterpunten: ['Beschikbaarheid benadrukken'],
    },
    {
      id: 'p5',
      bedrijf: 'Engie',
      contactpersoon: 'Hr. M. Jansen',
      email: 'm.jansen@engie.nl',
      score: 8.2,
      aiReview: 'Goed',
      aiProspectReden: 'Meerdere openstaande vacatures, groot potentieel',
      onderwerp: 'Servicemonteur Elektro met NEN1010 - regio Amsterdam',
      body: `Geachte heer Jansen,

Naar aanleiding van uw vacature voor een Servicemonteur Elektro bij Engie in Amsterdam, presenteer ik u graag een kandidaat uit ons bestand.

De kandidaat heeft een sterke service-achtergrond, beschikt over NEN1010 certificering en is werkzaam in de regio Randstad. Hij heeft 6 jaar ervaring en is direct beschikbaar.

Met vriendelijke groet,
${sig}`,
      verbeterpunten: ['USP van kandidaat sterker neerzetten'],
    },
  ];
}

export function getOutreachPreviews(brand: BrandConfig = defaultBrandConfig): OutreachPreview[] {
  return buildOutreachPreviews(brand);
}

export const outreachPreviews: OutreachPreview[] = buildOutreachPreviews(defaultBrandConfig);
