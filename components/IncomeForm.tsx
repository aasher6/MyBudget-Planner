
import React, { useState } from 'react';
import { Income, PayFrequency } from '../types';

interface IncomeFormProps {
  currentIncome: Income;
  onUpdate: (income: Income) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ currentIncome, onUpdate }) => {
  const [amount, setAmount] = useState(currentIncome.amount.toString());
  const [frequency, setFrequency] = useState<PayFrequency>(currentIncome.frequency);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      amount: parseFloat(amount) || 0,
      frequency,
      lastUpdated: new Date().toISOString()
    });
  };

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto py-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Adjust Your Income</h3>
        <p className="text-gray-500 mt-2">
          Update your expected earnings per pay period. This helps us calculate exactly what's left for your goals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Net Pay (Take-home)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
              <input 
                type="number"
                step="0.01"
                required
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-lg font-semibold"
                placeholder="0.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Pay Frequency</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(PayFrequency).map(freq => (
                <button
                  key={freq}
                  type="button"
                  onClick={() => setFrequency(freq)}
                  className={`py-3 px-2 rounded-xl border-2 text-sm font-bold transition-all ${
                    frequency === freq 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                      : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            Apply Changes
          </button>
        </div>
      </form>
      
      <p className="text-center text-xs text-gray-400 px-8">
        Your budget is calculated based on a single pay period. If you have multiple income sources, enter the total combined amount.
      </p>
    </div>
  );
};

export default IncomeForm;
