"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecruiterCostInputs } from "@/types/calculator";
import { formatCurrency } from "@/lib/utils";
import { Calculator } from "lucide-react";

interface RecruiterCostCalculatorProps {
  inputs: RecruiterCostInputs;
  onChange: (inputs: RecruiterCostInputs) => void;
}

export function RecruiterCostCalculator({
  inputs,
  onChange,
}: RecruiterCostCalculatorProps) {
  const handleChange = (field: keyof RecruiterCostInputs, value: string) => {
    const numValue = value.replace(/[^\d]/g, "");
    onChange({
      ...inputs,
      [field]: numValue ? parseInt(numValue, 10) : 0,
    });
  };

  // Beräkning:
  // Månadskostnad (inkl. arbetsgivaravgifter)
  // Timkostnad = månadskostnad / 172 timmar
  // Veckokostnad = timkostnad × timmar per vecka
  // Total årskostnad = veckokostnad × antal rekryterare × 52 veckor per år
  const monthlyCost = inputs.monthlySalary;
  const hourlyRate = monthlyCost / 172;
  const weeklyCost = hourlyRate * inputs.hoursPerWeek;
  const totalYearlyCost = weeklyCost * inputs.numberOfRecruiters * 52;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Calculator className="h-5 w-5 text-primary" />
          <div>
            <CardTitle className="text-lg">Rekryterares Tid</CardTitle>
            <CardDescription className="mt-1">
              Beräkna lönekostnader för rekryterare baserat på tid och antal
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timmar per vecka */}
        <div className="space-y-2">
          <Label htmlFor="hoursPerWeek" className="text-sm">
            Timmar per vecka på rekrytering
          </Label>
          <div className="relative">
            <Input
              id="hoursPerWeek"
              type="text"
              inputMode="numeric"
              value={inputs.hoursPerWeek || ""}
              onChange={(e) => handleChange("hoursPerWeek", e.target.value)}
              placeholder="0"
              className="pr-16"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              timmar
            </span>
          </div>
        </div>

        {/* Månadskostnad */}
        <div className="space-y-2">
          <Label htmlFor="monthlySalary" className="text-sm">
            Månadskostnad för rekryterare (inkl. arbetsgivaravgifter)
          </Label>
          <div className="relative">
            <Input
              id="monthlySalary"
              type="text"
              inputMode="numeric"
              value={inputs.monthlySalary || ""}
              onChange={(e) => handleChange("monthlySalary", e.target.value)}
              placeholder="0"
              className="pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              kr
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Ange total månadskostnad inklusive arbetsgivaravgifter
          </p>
        </div>

        {/* Antal rekryterare */}
        <div className="space-y-2">
          <Label htmlFor="numberOfRecruiters" className="text-sm">
            Antal rekryterare
          </Label>
          <Input
            id="numberOfRecruiters"
            type="text"
            inputMode="numeric"
            value={inputs.numberOfRecruiters || ""}
            onChange={(e) => handleChange("numberOfRecruiters", e.target.value)}
            placeholder="1"
          />
        </div>

        {/* Beräkningsresultat */}
        {inputs.monthlySalary > 0 && inputs.hoursPerWeek > 0 && (
          <div className="mt-6 space-y-3 rounded-lg border bg-muted/50 p-4">
            <h4 className="text-sm font-semibold">Beräkning:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Månadskostnad:</span>
                <span className="font-medium">{formatCurrency(monthlyCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timkostnad (172h/mån):</span>
                <span className="font-medium">{formatCurrency(hourlyRate)}/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Veckokostnad:</span>
                <span className="font-medium">{formatCurrency(weeklyCost)}</span>
              </div>
              {inputs.numberOfRecruiters > 0 && (
                <>
                  <div className="border-t pt-2" />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total årskostnad:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(totalYearlyCost)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
