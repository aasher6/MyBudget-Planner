
import React, { useState } from 'react';
import { SavingsGoal } from '../types';

interface SavingsSectionProps {
  savings: SavingsGoal[];
  onAdd: (goal: SavingsGoal) => void;
  onRemove: (id: string) => void;
}

const SavingsSection: React.FC<SavingsSectionProps> = ({ savings, onAdd, onRemove }) => {
  const [formData, setFormData] = useState({ name: '', amount: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      allocationAmount: parseFloat(formData.amount)
    });
    setFormData({ name: '', amount: '' });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Create New Goal</h4>
          <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-sky-50 rounded-2xl border border-sky-100">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Fund Name</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500"
                placeholder="e.g. Emergency Fund"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Allocation per Pay Period</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input 
                  required
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                  className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-sky-600 text-white font-bold rounded-xl shadow-lg hover:bg-sky-700 transition-all active:scale-95">
              Save Goal
            </button>
          </form>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Active Goals</h4>
          <div className="space-y-3">
            {savings.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 italic">
                No savings goals active yet.
              </div>
            ) : (
              savings.map(goal => (
                <div key={goal.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{goal.name}</p>
                      <p className="text-xs text-sky-600 font-medium">${goal.allocationAmount.toFixed(2)} per period</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemove(goal.id)}
                    className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsSection;
