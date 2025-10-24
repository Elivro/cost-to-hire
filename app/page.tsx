"use client";

import * as React from "react";
import { Calculator } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CostCategory } from "@/components/calculator/cost-category";
import { RecruiterCostCalculator } from "@/components/calculator/recruiter-cost-calculator";
import { ResultsCard } from "@/components/calculator/results-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultCategories } from "@/lib/default-data";
import { calculateCostPerHire } from "@/lib/calculations";
import { CalculatorData, RecruiterCostInputs } from "@/types/calculator";

const STORAGE_KEY = "cost-per-hire-data-v2";

export default function Home() {
  const [data, setData] = React.useState<CalculatorData>({
    categories: defaultCategories,
    numberOfHires: 1,
    recruiterInputs: {
      hoursPerWeek: 0,
      monthlySalary: 0,
      numberOfRecruiters: 0,
    },
  });

  // Load data from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure recruiterInputs exists (backwards compatibility)
        setData({
          ...parsed,
          recruiterInputs: parsed.recruiterInputs || {
            hoursPerWeek: 0,
            monthlySalary: 0,
            numberOfRecruiters: 0,
          },
        });
      } catch (error) {
        console.error("Failed to parse stored data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleItemChange = (
    categoryId: string,
    itemId: string,
    value: number
  ) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, value } : item
              ),
            }
          : cat
      ),
    }));
  };

  const handleNumberOfHiresChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setData((prev) => ({
      ...prev,
      numberOfHires: value ? parseInt(value, 10) : 0,
    }));
  };

  const handleRecruiterInputsChange = (inputs: RecruiterCostInputs) => {
    setData((prev) => ({
      ...prev,
      recruiterInputs: inputs,
    }));
  };

  const result = React.useMemo(() => calculateCostPerHire(data), [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Cost-per-Hire Kalkylator</h1>
              <p className="text-xs text-muted-foreground">
                För assistansanordnare
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Kostnadskategorier</h2>
          <p className="text-sm text-muted-foreground">
            Klicka på varje kategori för att ange kostnader
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
          {/* Left Column - Inputs */}
          <div className="space-y-6 lg:col-span-2">
            {/* Cost Categories */}
            <div className="space-y-4">
              {data.categories.map((category, index) => {
                // Visa speciell komponent för rekryterares tid
                if (category.id === "internal-time") {
                  return (
                    <RecruiterCostCalculator
                      key={category.id}
                      inputs={data.recruiterInputs}
                      onChange={handleRecruiterInputsChange}
                    />
                  );
                }

                return (
                  <CostCategory
                    key={category.id}
                    category={category}
                    onItemChange={handleItemChange}
                    defaultExpanded={index === 0}
                  />
                );
              })}
            </div>

            {/* Number of Hires - Moved to last */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Label htmlFor="numberOfHires" className="text-base font-semibold">
                Antal anställningar per år
              </Label>
              <p className="mb-4 mt-1 text-sm text-muted-foreground">
                Hur många personliga assistenter anställs per år?
              </p>
              <Input
                id="numberOfHires"
                type="text"
                inputMode="numeric"
                value={data.numberOfHires || ""}
                onChange={handleNumberOfHiresChange}
                placeholder="1"
                className="text-lg"
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-1 lg:sticky lg:top-20 lg:self-start">
            <ResultsCard result={result} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 rounded-lg border bg-muted/50 p-6">
          <h3 className="mb-2 font-semibold">Om Cost-per-Hire</h3>
          <p className="text-sm text-muted-foreground">
            Cost-per-Hire representerar den genomsnittliga kostnaden för att anställa
            en ny medarbetare. Alla kostnader i denna kalkylator är <strong>årskostnader</strong>.
            Detta inkluderar alla direkta och indirekta kostnader såsom
            systemkostnader, rekryterares tid samt introduktion
            och utbildning.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <strong>Formel:</strong> Cost-per-Hire = Totala årskostnader / Antal
            anställningar per år
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Cost-per-Hire Kalkylator för personliga assistenter</p>
          <p className="mt-1">Data sparas lokalt i din webbläsare</p>
        </div>
      </footer>
    </div>
  );
}
