export interface CostItem {
  id: string;
  label: string;
  value: number;
  tooltip?: string;
}

export interface RecruiterCostInputs {
  hoursPerWeek: number;
  monthlySalary: number;
  numberOfRecruiters: number;
}

export interface CostCategory {
  id: string;
  title: string;
  description: string;
  items: CostItem[];
}

export interface CalculatorData {
  categories: CostCategory[];
  numberOfHires: number;
  recruiterInputs: RecruiterCostInputs;
}

export interface CalculationResult {
  totalCosts: number;
  numberOfHires: number;
  costPerHire: number;
  breakdown: {
    categoryId: string;
    categoryTitle: string;
    amount: number;
    percentage: number;
  }[];
}
