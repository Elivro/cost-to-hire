import { CostCategory } from "@/types/calculator";

export const defaultCategories: CostCategory[] = [
  {
    id: "internal-time",
    title: "Rekryterares Tid",
    description: "Lönekostnader för rekryterare per år",
    items: [],
  },
  {
    id: "systems",
    title: "Rekryteringssystem & Verktyg",
    description: "IT-system och verktyg för rekrytering (årskostnad)",
    items: [
      {
        id: "ats",
        label: "ATS (Applicant Tracking System)",
        value: 0,
        tooltip: "Årskostnad för rekryteringssystem (licensavgift × 12 månader)",
      },
    ],
  },
  {
    id: "onboarding",
    title: "Introduktion & Utbildning",
    description: "Kostnader för att introducera och utbilda nya medarbetare (årskostnad)",
    items: [
      {
        id: "introduction",
        label: "Introduktionsutbildning",
        value: 0,
        tooltip: "Årskostnad för strukturerad introduktion för nya assistenter",
      },
      {
        id: "mandatory-training",
        label: "Obligatoriska kurser",
        value: 0,
        tooltip: "Årskostnad för HLR, lyftteknik, hygienrutiner etc.",
      },
      {
        id: "shadowing",
        label: "Bredvidgång/Handledning",
        value: 0,
        tooltip: "Årskostnad för handledare och bredvidgångstid",
      },
      {
        id: "training-materials",
        label: "Utbildningsmaterial",
        value: 0,
        tooltip: "Årskostnad för material, lokaler och övriga utbildningskostnader",
      },
    ],
  },
  {
    id: "other",
    title: "Övrigt",
    description: "Övriga rekryteringskostnader (årskostnad)",
    items: [
      {
        id: "travel",
        label: "Resekostnader",
        value: 0,
        tooltip: "Årskostnad för resor för intervjuer eller rekryteringsevent",
      },
      {
        id: "ad-production",
        label: "Annonsproduktion",
        value: 0,
        tooltip: "Årskostnad för grafisk design, copywriting för annonser",
      },
      {
        id: "events",
        label: "Mässor/Event",
        value: 0,
        tooltip: "Årskostnad för rekryteringsmässor och event",
      },
      {
        id: "misc",
        label: "Diverse",
        value: 0,
        tooltip: "Andra årskostnader som inte passar in i ovanstående kategorier",
      },
    ],
  },
];
