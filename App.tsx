
import React, { useState, useEffect, useMemo } from 'react';
import { PayFrequency, ExpenseDuration, Income, Expense, SavingsGoal, BudgetData } from './types';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import IncomeForm from './components/IncomeForm';
import ExpenseSection from './components/ExpenseSection';
import SavingsSection from './components/SavingsSection';
import Analytics from './components/Analytics';
import AIInsights from './components/AIInsights';
import Modal from './components/Modal';

const App: React.FC = () => {
  // Persistence Key
  const STORAGE_KEY = 'zenbudget_data_v1';

  // State
  const [activeModal, setActiveModal] = useState<'income' | 'expenses' | 'savings' | null>(null);
  const [budgetData, setBudgetData] = useState<BudgetData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      income: { amount: 3000, frequency: PayFrequency.BI_WEEKLY, lastUpdated: new Date().toISOString() },
      expenses: [],
      savings: []
    };
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgetData));
  }, [budgetData]);

  // Calculations
  const totals = useMemo(() => {
    const totalExpenses = budgetData.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalSavings = budgetData.savings.reduce((acc, curr) => acc + curr.allocationAmount, 0);
    const balance = budgetData.income.amount - totalExpenses - totalSavings;
    return {
      income: budgetData.income.amount,
      expenses: totalExpenses,
      savings: totalSavings,
      balance: balance
    };
  }, [budgetData]);

  // Handlers
  const handleUpdateIncome = (income: Income) => {
    setBudgetData(prev => ({ ...prev, income }));
    setActiveModal(null); // Close modal on update
  };

  const handleAddExpense = (expense: Expense) => {
    setBudgetData(prev => ({ ...prev, expenses: [expense, ...prev.expenses] }));
  };

  const handleRemoveExpense = (id: string) => {
    setBudgetData(prev => ({ ...prev, expenses: prev.expenses.filter(e => e.id !== id) }));
  };

  const handleAddSavings = (savings: SavingsGoal) => {
    setBudgetData(prev => ({ ...prev, savings: [savings, ...prev.savings] }));
  };

  const handleRemoveSavings = (id: string) => {
    setBudgetData(prev => ({ ...prev, savings: prev.savings.filter(s => s.id !== id) }));
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Top Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard 
            title="Income" 
            amount={totals.income} 
            type="income" 
            subtitle={budgetData.income.frequency} 
            onClick={() => setActiveModal('income')}
          />
          <SummaryCard 
            title="Expenses" 
            amount={totals.expenses} 
            type="expense" 
            onClick={() => setActiveModal('expenses')}
          />
          <SummaryCard 
            title="Savings" 
            amount={totals.savings} 
            type="savings" 
            onClick={() => setActiveModal('savings')}
          />
          <SummaryCard title="Remaining Balance" amount={totals.balance} type="balance" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <Analytics budgetData={budgetData} totals={totals} />
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center justify-between">
                <span>Current Obligations Overview</span>
                <span className="text-xs font-normal text-gray-400">Manage by clicking cards above</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
                  <span className="text-rose-700 font-medium">Expenses Total</span>
                  <span className="font-bold text-rose-700">-${totals.expenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-3 bg-sky-50/50 border border-sky-100 rounded-xl">
                  <span className="text-sky-700 font-medium">Savings Allocations</span>
                  <span className="font-bold text-sky-700">-${totals.savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl font-bold">
                  <span className="text-indigo-700 font-bold">Remaining Balance</span>
                  <span className="text-indigo-700">${totals.balance.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <AIInsights budgetData={budgetData} totals={totals} />
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="text-sm font-bold text-indigo-900 mb-2">Pro Tip</h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Try setting up different savings goals for seasonal expenses like holiday gifts or annual car maintenance to avoid budget shocks.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'income'} 
        onClose={() => setActiveModal(null)}
        title="Manage Income Settings"
      >
        <IncomeForm 
          currentIncome={budgetData.income} 
          onUpdate={handleUpdateIncome} 
        />
      </Modal>

      <Modal 
        isOpen={activeModal === 'expenses'} 
        onClose={() => setActiveModal(null)}
        title="Manage Recurring Expenses"
      >
        <ExpenseSection 
          expenses={budgetData.expenses} 
          onAdd={handleAddExpense} 
          onRemove={handleRemoveExpense} 
        />
      </Modal>

      <Modal 
        isOpen={activeModal === 'savings'} 
        onClose={() => setActiveModal(null)}
        title="Manage Savings Goals"
      >
        <SavingsSection 
          savings={budgetData.savings} 
          onAdd={handleAddSavings} 
          onRemove={handleRemoveSavings} 
        />
      </Modal>
    </div>
  );
};

export default App;
