# Cost-per-Hire Kalkylator

En modern webbapplikation för att beräkna rekryteringskostnader per anställning, specifikt utformad för personliga assistenter inom vård & omsorg.

**VIKTIGT:** Alla kostnader i kalkylatorn är **årskostnader**.

## Funktioner

- **Realtidsberäkning**: Resultat uppdateras direkt när du matar in data
- **Årskostnader**: Alla kostnader beräknas per år för korrekt jämförelse
- **Avancerad rekryterarkalyl**: Beräkna rekryterarkostnader baserat på timmar/vecka och månadslön
- **Visualisering**: Diagram som visar kostnadsfördelning
- **Dark Mode**: Fullt stöd för mörkt och ljust läge
- **Responsiv Design**: Fungerar på desktop, tablet och mobil
- **Lokal Lagring**: Dina beräkningar sparas automatiskt i webbläsaren

## Kostnadskategorier

Applikationen inkluderar följande kostnadskategorier (alla som **årskostnader**):

1. **Rekryterares Tid** - Automatisk beräkning av årskostnad baserat på:
   - Timmar per vecka på rekrytering
   - Månadskostnad (inkl. arbetsgivaravgifter)
   - Antal rekryterare
   - Beräkning: (Månadskostnad / 172h) × timmar/vecka × 52 veckor × antal rekryterare
2. **Rekryteringssystem & Verktyg** - Årskostnad för ATS (Applicant Tracking System)
3. **Introduktion & Utbildning** - Årskostnad för introduktion, obligatoriska kurser (HLR, lyftteknik), bredvidgång, material
4. **Övrigt** - Årskostnad för resor, annonsproduktion, mässor, diverse

## Teknisk Stack

- **Next.js 15** - React framework med App Router
- **React 19** - UI-bibliotek
- **TypeScript** - Typsäkerhet
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI-komponenter
- **Recharts** - Diagram och visualisering
- **next-themes** - Dark mode-hantering

## Kom igång

### Krav

- Node.js 18.x eller senare
- npm eller yarn

### Installation

1. Klona projektet:
```bash
git clone [repository-url]
cd cost-per-hire
```

2. Installera beroenden:
```bash
npm install
```

3. Starta utvecklingsservern:
```bash
npm run dev
```

4. Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare

## Kommandon

```bash
# Utveckling
npm run dev

# Bygga för produktion
npm run build

# Starta produktionsserver
npm start

# Linting
npm run lint
```

## Användning

1. **Ange antal anställningar per år**: Börja med att ange hur många personer som anställs per år
2. **Rekryterares tid**: Fyll i:
   - Timmar per vecka på rekrytering
   - Månadskostnad för rekryterare (inkl. arbetsgivaravgifter)
   - Antal rekryterare
   - Årskostnaden beräknas automatiskt
3. **Expandera kategorier**: Klicka på varje kostnadskategori för att se detaljerade kostnadstyper
4. **Mata in årskostnader**: Ange årskostnader i svenska kronor för relevanta kostnadsposter (alla fält har enheten "kr/år")
5. **Se resultat**: Resultatet uppdateras automatiskt med:
   - Totala årskostnader
   - Antal anställningar per år
   - Cost-per-Hire
   - Kostnadsfördelning (diagram)

## Formel

```
Cost-per-Hire = Totala årskostnader / Antal anställningar per år
```

**Rekryterarkostnad beräknas som:**
```
Årskostnad = (Månadskostnad / 172h) × timmar/vecka × 52 veckor × antal rekryterare
```
där månadskostnad inkluderar arbetsgivaravgifter

## Dataskydd

All data sparas lokalt i din webbläsare (localStorage). Inga uppgifter skickas till någon server.

## Licens

MIT

## Support

För frågor eller feedback, vänligen kontakta projektägaren.
