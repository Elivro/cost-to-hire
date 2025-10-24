const XLSX = require('xlsx');

// Create a new workbook
const wb = XLSX.utils.book_new();

// ===== INPUT & CALCULATION SHEET =====
const wsData = [];

// Header
wsData.push(['Cost-per-Hire Kalkylator för Personliga Assistenter']);
wsData.push(['Alla kostnader är årskostnader']);
wsData.push([]);

// Section 1: Rekryterares Tid
wsData.push(['REKRYTERARES TID']);
wsData.push(['Beskrivning', 'Lönekostnader för rekryterare per år']);
wsData.push([]);
wsData.push(['Timmar per vecka på rekrytering:', '', 0]);
wsData.push(['Månadskostnad för rekryterare (inkl. arbetsgivaravgifter):', '', 0, 'kr']);
wsData.push(['Antal rekryterare:', '', 1]);
wsData.push([]);
wsData.push(['Beräkningar:']);
wsData.push(['Månadskostnad:', '', '=D9', 'kr']);
wsData.push(['Timkostnad (172h/mån):', '', '=D9/172', 'kr/h']);
wsData.push(['Veckokostnad:', '', '=D13*D8', 'kr']);
wsData.push(['Total årskostnad rekryterare:', '', '=D14*D10*52', 'kr']);
wsData.push([]);

// Section 2: Rekryteringssystem & Verktyg
wsData.push(['REKRYTERINGSSYSTEM & VERKTYG']);
wsData.push(['Beskrivning', 'IT-system och verktyg för rekrytering (årskostnad)']);
wsData.push([]);
wsData.push(['ATS (Applicant Tracking System)', 'Årskostnad för rekryteringssystem', 0, 'kr']);
wsData.push(['Summa Rekryteringssystem:', '', '=C21', 'kr']);
wsData.push([]);

// Section 3: Introduktion & Utbildning
wsData.push(['INTRODUKTION & UTBILDNING']);
wsData.push(['Beskrivning', 'Kostnader för att introducera och utbilda nya medarbetare (årskostnad)']);
wsData.push([]);
wsData.push(['Introduktionsutbildning', 'Årskostnad för strukturerad introduktion', 0, 'kr']);
wsData.push(['Obligatoriska kurser', 'HLR, lyftteknik, hygienrutiner etc.', 0, 'kr']);
wsData.push(['Bredvidgång/Handledning', 'Handledare och bredvidgångstid', 0, 'kr']);
wsData.push(['Utbildningsmaterial', 'Material, lokaler och övriga utbildningskostnader', 0, 'kr']);
wsData.push(['Summa Introduktion & Utbildning:', '', '=SUM(C27:C30)', 'kr']);
wsData.push([]);

// Section 4: Övrigt
wsData.push(['ÖVRIGT']);
wsData.push(['Beskrivning', 'Övriga rekryteringskostnader (årskostnad)']);
wsData.push([]);
wsData.push(['Resekostnader', 'Resor för intervjuer eller rekryteringsevent', 0, 'kr']);
wsData.push(['Annonsproduktion', 'Grafisk design, copywriting för annonser', 0, 'kr']);
wsData.push(['Mässor/Event', 'Rekryteringsmässor och event', 0, 'kr']);
wsData.push(['Diverse', 'Andra kostnader', 0, 'kr']);
wsData.push(['Summa Övrigt:', '', '=SUM(C36:C39)', 'kr']);
wsData.push([]);

// Section 5: Number of Hires
wsData.push(['ANTAL ANSTÄLLNINGAR']);
wsData.push(['Antal anställningar per år:', 'Hur många personliga assistenter anställs per år?', 1]);
wsData.push([]);

// Section 6: Results
wsData.push(['RESULTAT']);
wsData.push([]);
wsData.push(['Totala årskostnader:', '', '=D15+D22+D31+D40', 'kr']);
wsData.push(['Antal anställningar:', '', '=C43']);
wsData.push(['Cost-per-Hire:', '', '=IF(D48>0,D47/D48,0)', 'kr']);
wsData.push([]);

// Section 7: Breakdown
wsData.push(['KOSTNADSFÖRDELNING']);
wsData.push([]);
wsData.push(['Kategori', 'Belopp (kr)', 'Andel (%)']);
wsData.push(['Rekryterares Tid', '=D15', '=IF(D47>0,D54/D47*100,0)']);
wsData.push(['Rekryteringssystem & Verktyg', '=D22', '=IF(D47>0,D55/D47*100,0)']);
wsData.push(['Introduktion & Utbildning', '=D31', '=IF(D47>0,D56/D47*100,0)']);
wsData.push(['Övrigt', '=D40', '=IF(D47>0,D57/D47*100,0)']);
wsData.push([]);

// Create worksheet
const ws = XLSX.utils.aoa_to_sheet(wsData);

// Set column widths
ws['!cols'] = [
  { wch: 45 }, // Column A - Labels
  { wch: 50 }, // Column B - Descriptions
  { wch: 15 }, // Column C - Values
  { wch: 10 }, // Column D - Unit/Formulas
];

// Merge cells for headers
const merges = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Title
  { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } }, // Subtitle
  { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } }, // Rekryterares Tid header
  { s: { r: 4, c: 1 }, e: { r: 4, c: 3 } }, // Description
  { s: { r: 17, c: 0 }, e: { r: 17, c: 3 } }, // Rekryteringssystem header
  { s: { r: 18, c: 1 }, e: { r: 18, c: 3 } }, // Description
  { s: { r: 24, c: 0 }, e: { r: 24, c: 3 } }, // Introduktion header
  { s: { r: 25, c: 1 }, e: { r: 25, c: 3 } }, // Description
  { s: { r: 33, c: 0 }, e: { r: 33, c: 3 } }, // Övrigt header
  { s: { r: 34, c: 1 }, e: { r: 34, c: 3 } }, // Description
  { s: { r: 42, c: 0 }, e: { r: 42, c: 3 } }, // Antal anställningar header
  { s: { r: 45, c: 0 }, e: { r: 45, c: 3 } }, // Resultat header
  { s: { r: 51, c: 0 }, e: { r: 51, c: 3 } }, // Breakdown header
];

ws['!merges'] = merges;

// Add the worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, 'Kalkylator');

// ===== INSTRUCTIONS SHEET =====
const instructionsData = [
  ['Instruktioner för Cost-per-Hire Kalkylator'],
  [],
  ['Välkommen till Cost-per-Hire kalkylatorn för assistansanordnare!'],
  [],
  ['Hur man använder kalkylatorn:'],
  [],
  ['1. REKRYTERARES TID'],
  ['   - Ange antal timmar per vecka som läggs på rekrytering'],
  ['   - Ange månadskostnad för rekryterare inklusive arbetsgivaravgifter'],
  ['   - Ange antal rekryterare'],
  ['   - Årskostnaden beräknas automatiskt'],
  [],
  ['2. REKRYTERINGSSYSTEM & VERKTYG'],
  ['   - Ange årskostnad för ATS (Applicant Tracking System)'],
  ['   - Inkludera andra IT-system och verktyg'],
  [],
  ['3. INTRODUKTION & UTBILDNING'],
  ['   - Introduktionsutbildning: Kostnad för strukturerad introduktion'],
  ['   - Obligatoriska kurser: HLR, lyftteknik, hygienrutiner etc.'],
  ['   - Bredvidgång/Handledning: Kostnad för handledare'],
  ['   - Utbildningsmaterial: Material, lokaler, övriga kostnader'],
  [],
  ['4. ÖVRIGT'],
  ['   - Resekostnader: Resor för intervjuer eller event'],
  ['   - Annonsproduktion: Grafisk design, copywriting'],
  ['   - Mässor/Event: Rekryteringsmässor och event'],
  ['   - Diverse: Andra kostnader'],
  [],
  ['5. ANTAL ANSTÄLLNINGAR'],
  ['   - Ange hur många personliga assistenter som anställs per år'],
  [],
  ['RESULTAT'],
  ['Kalkylatorn visar automatiskt:'],
  ['- Totala årskostnader för all rekrytering'],
  ['- Cost-per-Hire (kostnad per anställning)'],
  ['- Kostnadsfördelning per kategori med procentandelar'],
  [],
  ['VIKTIGT:'],
  ['- Alla kostnader ska anges som ÅRSKOSTNADER'],
  ['- Formler är skyddade, men du kan ändra alla värden markerade i vitt'],
  ['- Spara filen för att behålla dina inmatningar'],
  [],
  ['Formel:'],
  ['Cost-per-Hire = Totala årskostnader / Antal anställningar per år'],
  [],
  ['För frågor eller support, kontakta din administratör.'],
];

const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
wsInstructions['!cols'] = [{ wch: 80 }];
XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instruktioner');

// Generate Excel file
const fileName = 'Cost-per-Hire-Kalkylator.xlsx';
XLSX.writeFile(wb, fileName);

console.log(`✓ Excel-filen "${fileName}" har skapats!`);
console.log('Filen innehåller:');
console.log('  - Kalkylator-blad med alla beräkningar');
console.log('  - Instruktioner för användning');
console.log('  - Automatiska formler för Cost-per-Hire beräkning');
