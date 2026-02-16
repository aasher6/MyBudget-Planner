
import React from 'react';

interface SummaryCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'savings' | 'balance';
  subtitle?: string;
  onClick?: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, type, subtitle, onClick }) => {
  const isActionable = !!onClick;
  
  const colorMap = {
    income: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-200',
    expense: 'bg-rose-50 text-rose-700 border-rose-100 hover:border-rose-200',
    savings: 'bg-sky-50 text-sky-700 border-sky-100 hover:border-sky-200',
    balance: 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:border-indigo-200',
  };

  const iconMap = {
    income: 'M12 4.5v15m7.5-7.5h-15',
    expense: 'M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
    savings: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z',
    balance: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
  };

  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-2xl border transition-all duration-200 ${colorMap[type]} ${isActionable ? 'cursor-pointer hover:shadow-lg active:scale-95 group' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80 flex items-center gap-2">
            {title}
            {isActionable && (
              <span className="text-[10px] bg-white/50 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Manage
              </span>
            )}
          </p>
          <p className="text-3xl font-bold mt-1">
            ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {subtitle && <p className="text-xs font-medium mt-1 opacity-70 italic">{subtitle}</p>}
        </div>
        <div className="p-3 bg-white/40 rounded-xl group-hover:bg-white/60 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconMap[type]} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
