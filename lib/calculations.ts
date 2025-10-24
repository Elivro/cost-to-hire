import { CalculatorData, CalculationResult } from "@/types/calculator";

export function calculateRecruiterCost(
  hoursPerWeek: number,
  monthlySalary: number,
  numberOfRecruiters: number
): number {
  // Månadskostnad (inkl. arbetsgivaravgifter)
  const monthlyCost = monthlySalary;
  // Timkostnad baserat på 172 timmar per månad
  const hourlyRate = monthlyCost / 172;
  // Veckokostnad
  const weeklyCost = hourlyRate * hoursPerWeek;
  // Total årskostnad (52 veckor per år)
  const totalYearlyCost = weeklyCost * numberOfRecruiters * 52;
  return totalYearlyCost;
}

export function calculateCostPerHire(data: CalculatorData): CalculationResult {
  // Beräkna rekryterarkostnad (hantera fall där recruiterInputs är undefined)
  const recruiterCost = data.recruiterInputs
    ? calculateRecruiterCost(
        data.recruiterInputs.hoursPerWeek,
        data.recruiterInputs.monthlySalary,
        data.recruiterInputs.numberOfRecruiters
      )
    : 0;

  // Beräkna total kostnad per kategori
  const breakdown = data.categories.map((category) => {
    let categoryTotal = category.items.reduce(
      (sum, item) => sum + item.value,
      0
    );

    // Lägg till rekryterarkostnad för kategorin "internal-time"
    if (category.id === "internal-time") {
      categoryTotal += recruiterCost;
    }

    return {
      categoryId: category.id,
      categoryTitle: category.title,
      amount: categoryTotal,
      percentage: 0, // Beräknas efter vi vet totalsumman
    };
  });

  // Beräkna totalkostnad
  const totalCosts = breakdown.reduce((sum, cat) => sum + cat.amount, 0);

  // Uppdatera procentandelar
  breakdown.forEach((cat) => {
    cat.percentage = totalCosts > 0 ? (cat.amount / totalCosts) * 100 : 0;
  });

  // Beräkna cost-per-hire
  const costPerHire =
    data.numberOfHires > 0 ? totalCosts / data.numberOfHires : 0;

  return {
    totalCosts,
    numberOfHires: data.numberOfHires,
    costPerHire,
    breakdown: breakdown.filter((b) => b.amount > 0), // Visa bara kategorier med kostnader
  };
}
