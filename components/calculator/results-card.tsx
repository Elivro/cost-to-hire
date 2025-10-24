"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CostChart } from "./cost-chart";
import { CalculationResult } from "@/types/calculator";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Users, Coins } from "lucide-react";

interface ResultsCardProps {
  result: CalculationResult;
}

export function ResultsCard({ result }: ResultsCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Resultat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Totala årskostnader</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(result.totalCosts)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-500/10 p-2">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Antal anställningar/år</p>
                <p className="text-2xl font-bold">{result.numberOfHires}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border bg-accent p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-500/10 p-2">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Cost-per-Hire
                </p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(result.costPerHire)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div>
          <h3 className="mb-4 text-sm font-medium">Kostnadsfördelning</h3>
          <CostChart result={result} />
        </div>

        {/* Breakdown */}
        {result.breakdown.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-medium">Detaljerad fördelning</h3>
            <div className="space-y-2">
              {result.breakdown.map((item) => (
                <div
                  key={item.categoryId}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.categoryTitle}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
