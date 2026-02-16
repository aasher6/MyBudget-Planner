
export enum PayFrequency {
  WEEKLY = 'Weekly',
  BI_WEEKLY = 'Bi-Weekly',
  MONTHLY = 'Monthly'
}

export enum ExpenseDuration {
  ONE_TIME = 'One-time',
  SIX_MONTHS = '6 Months',
  ONGOING = 'Ongoing'
}

export interface Income {
  amount: number;
  frequency: PayFrequency;
  lastUpdated: string;
}

export interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  isRecurring: boolean;
  duration: ExpenseDuration;
}

export interface SavingsGoal {
  id: string;
  name: string;
  allocationAmount: number;
}

export interface BudgetData {
  income: Income;
  expenses: Expense[];
  savings: SavingsGoal[];
}
