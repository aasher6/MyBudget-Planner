
import React, { useState } from 'react';
import { Expense, ExpenseDuration } from '../types';

interface ExpenseSectionProps {
  expenses: Expense[];
  onAdd: (expense: Expense) => void;
  onRemove: (id: string) => void;
}

const ExpenseSection: React.FC<ExpenseSectionProps> = ({ expenses, onAdd, onRemove }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    amount: '',
    isRecurring: true,
    duration: ExpenseDuration.ONGOING
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;

    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      category: formData.category || 'General',
      amount: parseFloat(formData.amount),
      isRecurring: formData.isRecurring,
      duration: formData.duration
    });

    setFormData({
      name: '',
      category: '',
      amount: '',
      isRecurring: true,
      duration: ExpenseDuration.ONGOING
    });
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500 max-w-md">
          Define your recurring payments and bills. These will be automatically deducted from your period income.
        </p>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
            isAdding ? 'bg-gray-100 text-gray-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isAdding ? 'Cancel' : (
            <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> Add Entry</>
          )}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in slide-in-from-top-4 duration-200">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Expense Name</label>
            <input 
              required
              autoFocus
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Rent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
            <input 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Housing"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Amount</label>
            <input 
              required
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox"
              id="recurring"
              checked={formData.isRecurring}
              onChange={e => setFormData({...formData, isRecurring: e.target.checked})}
              className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <label htmlFor="recurring" className="text-sm font-medium text-gray-700 cursor-pointer">Recurring</label>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Duration</label>
            <select 
              value={formData.duration}
              onChange={e => setFormData({...formData, duration: e.target.value as ExpenseDuration})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {Object.values(ExpenseDuration).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors">
              Add Expense
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">Expense</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium italic">
                  No expenses added yet.
                </td>
              </tr>
            ) : (
              expenses.map(expense => (
                <tr key={expense.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">{expense.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase border border-gray-200">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-rose-600">-${expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${expense.isRecurring ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                      {expense.isRecurring ? 'Recurring' : 'One-time'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onRemove(expense.id)}
                      className="text-gray-300 hover:text-rose-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseSection;
